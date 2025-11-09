import { DateFieldFormElement } from "./fields/DateField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
export type submitfunction = (key: string, value: string) => void;
export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: React.ComponentType<{ className?: string }>; // FIXED
    lable: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitvalue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultvalue: string;
  }>;

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentvalue: string) => boolean;
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
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField:DateFieldFormElement
};
