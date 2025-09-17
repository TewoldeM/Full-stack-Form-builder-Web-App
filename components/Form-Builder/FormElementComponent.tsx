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
import { FormElement } from "@/app/FormBuilder/page";

interface FormElementComponentProps {
  element: FormElement;
}

export const FormElementComponent = ({
  element,
}: FormElementComponentProps) => {
  const renderElement = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              placeholder={element.placeholder}
              disabled
              className="bg-input"
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Textarea
              placeholder={element.placeholder}
              disabled
              className="bg-input min-h-24"
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Select disabled>
              <SelectTrigger className="bg-input">
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {element.options?.map((option, index) => (
                  <SelectItem key={index} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={element.id} disabled />
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
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {element.label}
              {element.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <RadioGroup disabled>
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.toLowerCase()}
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
          <Button className="bg-primary hover:bg-primary/90" disabled>
            {element.label}
          </Button>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  return <div className="form-element">{renderElement()}</div>;
};
