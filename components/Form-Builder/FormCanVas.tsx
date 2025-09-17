
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FormElementComponent } from "./FormElementComponent";
import { FormElement } from "@/app/FormBuilder/page";

interface FormCanvasProps {
  elements: FormElement[];
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void;
  onDeleteElement: (id: string) => void;
}

export const FormCanvas = ({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
}: FormCanvasProps) => {
  return (
    <div className="flex-1 flex">
      {/* Canvas Area */}
      <div className="flex-1 bg-canvas p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-canvas-foreground mb-2">
              Form Builder Canvas
            </h2>
            <p className="text-muted-foreground">
              Build your form by adding elements from the sidebar
            </p>
          </div>

          <Card className="min-h-96 p-6 bg-card border-border">
            {elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  Start Building Your Form
                </h3>
                <p className="text-muted-foreground">
                  Add form elements from the sidebar to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-1">
                    Form Preview
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on elements to edit their properties
                  </p>
                </div>

                {elements.map((element, index) => (
                  <div
                    key={element.id}
                    className={`group relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedElement === element.id
                        ? "border-component-selected bg-accent/5"
                        : "border-transparent hover:border-component-hover hover:bg-secondary/30"
                    }`}
                    onClick={() => onSelectElement(element.id)}
                  >
                    <FormElementComponent element={element} />

                    {/* Element controls */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteElement(element.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Element index */}
                    <div className="absolute -left-2 top-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElement && (
        <div className="w-80 bg-sidebar-bg border-l border-border p-6 overflow-y-auto">
          <ElementPropertiesPanel
            element={elements.find((el) => el.id === selectedElement)!}
            onUpdate={(updates) => onUpdateElement(selectedElement, updates)}
          />
        </div>
      )}
    </div>
  );
};

interface ElementPropertiesPanelProps {
  element: FormElement;
  onUpdate: (updates: Partial<FormElement>) => void;
}

const ElementPropertiesPanel = ({
  element,
  onUpdate,
}: ElementPropertiesPanelProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Properties</h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`label-${element.id}`}
            className="block text-sm font-medium text-foreground mb-2"
          >
            Label
          </label>
          <input
            id={`label-${element.id}`}
            type="text"
            title={`Label for ${element.type}`}
            placeholder="Enter label"
            value={element.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {(element.type === "text" || element.type === "textarea") && (
          <div>
            <label
              htmlFor={`placeholder-${element.id}`}
              className="block text-sm font-medium text-foreground mb-2"
            >
              Placeholder
            </label>
            <input
              id={`placeholder-${element.id}`}
              type="text"
              title={`Placeholder for ${element.label || element.type}`}
              placeholder="Enter placeholder text"
              value={element.placeholder || ""}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`required-${element.id}`}
            checked={element.required || false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="rounded border-border text-primary focus:ring-primary"
          />
          <label
            htmlFor={`required-${element.id}`}
            className="text-sm font-medium text-foreground"
          >
            Required field
          </label>
        </div>

        {(element.type === "select" || element.type === "radio") && (
          <div>
              <label
                htmlFor={`options-${element.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Options (one per line)
              </label>
              <textarea
                id={`options-${element.id}`}
                title={`Options for ${element.label || element.type}`}
                placeholder="Enter one option per line"
                value={element.options?.join("\n") || ""}
                onChange={(e) =>
                  onUpdate({
                    options: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
        )}
      </div>
    </div>
  );
};
