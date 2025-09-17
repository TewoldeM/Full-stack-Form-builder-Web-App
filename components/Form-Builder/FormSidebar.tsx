import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Type,
  AlignLeft,
  ChevronDown,
  CheckSquare,
  Circle,
  MousePointer,
} from "lucide-react";

interface FormSidebarProps {
  onAddElement: (
    type: "text" | "textarea" | "select" | "checkbox" | "radio" | "button"
  ) => void;
}

const formComponents = [
  {
    type: "text" as const,
    icon: Type,
    label: "Text Input",
    description: "Single line text field",
  },
  {
    type: "textarea" as const,
    icon: AlignLeft,
    label: "Textarea",
    description: "Multi-line text field",
  },
  {
    type: "select" as const,
    icon: ChevronDown,
    label: "Select",
    description: "Dropdown selection",
  },
  {
    type: "checkbox" as const,
    icon: CheckSquare,
    label: "Checkbox",
    description: "Multiple choice selection",
  },
  {
    type: "radio" as const,
    icon: Circle,
    label: "Radio Button",
    description: "Single choice selection",
  },
  {
    type: "button" as const,
    icon: MousePointer,
    label: "Button",
    description: "Submit or action button",
  },
];

export const FormSidebar = ({ onAddElement }: FormSidebarProps) => {
  return (
    <div className="w-80 bg-sidebar-bg border-r border-border p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Components
        </h2>
        <p className="text-sm text-muted-foreground">
          Drag and drop or click to add form elements
        </p>
      </div>

      <div className="space-y-3">
        {formComponents.map((component) => {
          const Icon = component.icon;
          return (
            <Card
              key={component.type}
              className="p-4 cursor-pointer hover:bg-secondary/50 transition-all duration-200 border-border bg-card hover:shadow-component group"
              onClick={() => onAddElement(component.type)}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {component.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {component.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gradient-card rounded-lg border border-border">
        <h3 className="font-medium text-card-foreground mb-2">Pro Tip</h3>
        <p className="text-sm text-muted-foreground">
          Click on any form element in the canvas to customize its properties
          and styling.
        </p>
      </div>
    </div>
  );
};
