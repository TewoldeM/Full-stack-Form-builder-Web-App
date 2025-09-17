import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FormElement } from "@/app/FormBuilder/page";

interface FormPreviewProps {
  elements: FormElement[];
}

export const FormPreview = ({ elements }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  const updateFormData = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const renderElement = (element: FormElement) => {
    switch (element.type) {
      case "text":
        return (
          <div key={element.id} className="space-y-2">
            <Label htmlFor={element.id} className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={element.id}
              placeholder={element.placeholder}
              required={element.required}
              value={formData[element.id] || ""}
              onChange={(e) => updateFormData(element.id, e.target.value)}
              className="bg-input"
            />
          </div>
        );

      case "textarea":
        return (
          <div key={element.id} className="space-y-2">
            <Label htmlFor={element.id} className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Textarea
              id={element.id}
              placeholder={element.placeholder}
              required={element.required}
              value={formData[element.id] || ""}
              onChange={(e) => updateFormData(element.id, e.target.value)}
              className="bg-input min-h-24"
            />
          </div>
        );

      case "select":
        return (
          <div key={element.id} className="space-y-2">
            <Label className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Select
              value={formData[element.id] || ""}
              onValueChange={(value) => updateFormData(element.id, value)}
            >
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {element.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "checkbox":
        return (
          <div key={element.id} className="flex items-center space-x-2">
            <Checkbox
              id={element.id}
              checked={formData[element.id] || false}
              onCheckedChange={(checked) => updateFormData(element.id, checked)}
            />
            <Label htmlFor={element.id} className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
          </div>
        );

      case "radio":
        return (
          <div key={element.id} className="space-y-3">
            <Label className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <RadioGroup
              value={formData[element.id] || ""}
              onValueChange={(value) => updateFormData(element.id, value)}
            >
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`${element.id}-${index}`}
                  />
                  <Label htmlFor={`${element.id}-${index}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "button":
        return (
          <Button
            key={element.id}
            type="submit"
            className="bg-primary hover:bg-primary/90"
          >
            {element.label}
          </Button>
        );

      default:
        return null;
    }
  };

  if (elements.length === 0) {
    return (
      <div className="flex-1 bg-canvas p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-canvas-foreground mb-4">
            No Form Elements
          </h2>
          <p className="text-muted-foreground">
            Switch to Builder mode to add form elements
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-canvas p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-canvas-foreground mb-2">
            Form Preview
          </h2>
          <p className="text-muted-foreground">
            Test your form as users will see it
          </p>
        </div>

        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Your Form
              </h3>
              <p className="text-sm text-muted-foreground">
                Please fill out all required fields
              </p>
            </div>

            {elements.map(renderElement)}

            {!elements.some((el) => el.type === "button") && (
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Submit Form
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};
