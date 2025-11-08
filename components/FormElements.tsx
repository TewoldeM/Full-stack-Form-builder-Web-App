import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";
export type submitfunction = (key:string, value:string) => void;
export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: React.ComponentType<{ className?: string }>; // FIXED
    lable: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance,
    submitvalue?: (key:string, value:string) => void
    isInvalid?: boolean
    defaultvalue: string
   }>;
  
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance

  }>;
  validate:(formElement:FormElementInstance,currentvalue:string)=> boolean
};

type FormElemensType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElemensType = {
  TextField: TextFieldFormElement,
};
