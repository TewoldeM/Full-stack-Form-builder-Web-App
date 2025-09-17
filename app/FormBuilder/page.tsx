"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Code, Settings } from "lucide-react";
import { FormSidebar } from "@/components/Form-Builder/FormSidebar";
import { FormCanvas } from "@/components/Form-Builder/FormCanVas";
import { FormPreview } from "@/components/Form-Builder/FormPreview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface FormElement {
  id: string;
  type: "text" | "textarea" | "select" | "checkbox" | "radio" | "button";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

const FormBuilder = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [view, setView] = useState<"builder" | "preview">("builder");

  const addElement = (type: FormElement["type"]) => {
    const newElement: FormElement = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder:
        type === "text" || type === "textarea" ? `Enter ${type}...` : undefined,
      required: false,
      options:
        type === "select" || type === "radio"
          ? ["Option 1", "Option 2"]
          : undefined,
    };
    setFormElements([...formElements, newElement]);
  };

  const updateElement = (id: string, updates: Partial<FormElement>) => {
    setFormElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    setFormElements((elements) => elements.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-toolbar border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Form Builder
          </h1>
          <div className="text-sm text-muted-foreground">
            {formElements.length} elements
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={view === "builder" ? "default" : "secondary"}
            size="sm"
            onClick={() => setView("builder")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Builder
          </Button>
          <Button
            variant={view === "preview" ? "default" : "secondary"}
            size="sm"
            onClick={() => setView("preview")}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <DndProvider backend={HTML5Backend}>
          {view === "builder" ? (
            <>
              <FormSidebar onAddElement={addElement} />
              <FormCanvas
                elements={formElements}
                selectedElement={selectedElement}
                onSelectElement={setSelectedElement}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
              />
            </>
          ) : (
            <FormPreview elements={formElements} />
          )}
        </DndProvider>
      </div>
    </div>
  );
};

export default FormBuilder;
