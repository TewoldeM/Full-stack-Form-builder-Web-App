"use client"
import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { Input } from "../ui/input";
import { Label } from '@/components/ui/label';

const type: ElementsType = "TextField";
const extraAttributes = {
  lable: "text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here ...",
};
export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement:{
    icon: MdTextFields,
    lable: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Components</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes; }
function DesignerComponent({ elementInstance, }:{elementInstance:FormElementInstance}) {
  const element = elementInstance as CustomInstance;
  const {label,required,placeHolder,helperText}= element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <label>
        {label}
        {required && "*"}
      </label>
      <Input readOnly placeholder={element.extraAttributes.placeHolder} />
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{ helperText}</p>} 
    </div>
  );
}