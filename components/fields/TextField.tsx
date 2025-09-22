"use client"
import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      lable: "text field",
      helperText: "Helper text",
      required: false,
      placeHolder: "Value here ...",
    },
  }),
  designerBtnElement:{
    icon: MdTextFields,
    lable: "Text Field",
  },
  designerComponent: () => <div>TextField Designer</div>,
  formComponent: () => <div>Form Components</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};