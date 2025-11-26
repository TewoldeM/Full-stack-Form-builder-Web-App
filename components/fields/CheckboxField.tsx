"use client";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  submitfunction,
} from "../FormElements";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { IoMdCheckbox } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";

const type: ElementsType = "CheckBoxField";

const extraAttributes = {
  lable: "CheckBox field",
  helpertext: "Helper text",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helpertext: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckBoxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: IoMdCheckbox,
    lable: "CheckBox Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  PropertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentvalue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentvalue === "true";
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormScehmaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <label>
          {label}
          {required && "*"}
        </label>
      </div>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitvalue,
  isInvalid,
  defaultvalue,
}: {
  elementInstance: FormElementInstance;
  submitvalue?: submitfunction;
  isInvalid?: boolean;
  defaultvalue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState<boolean>(
    defaultvalue === "true" ? true : false
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true), [isInvalid];
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="flex items-top space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;

          const stringValue = value ? "true" : "false";
          setValue(value);

          if (!submitvalue) return;

          const valid = CheckBoxFieldFormElement.validate(element, stringValue);
          setError(!valid);

          submitvalue(element.id, stringValue);
        }}
      />

      <div className="grid gap-1.5 leading-none">
        <label htmlFor={id} className={cn(error && "text-red-500")}>
          {label}
          {required && "*"}
        </label>
      </div>

      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormScehmaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.lable,
      helpertext: element.extraAttributes.helpertext,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormScehmaType) {
    const { label, helpertext, required } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helpertext,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* LABEL */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                fields.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HELPER TEXT */}
        <FormField
          control={form.control}
          name="helpertext"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text&nbsp;&quot;</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The helper text&nbsp;&quot;</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* REQUIRED SWITCH */}
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required&nbsp;&quot;</FormLabel>
                <FormDescription>The helper text&nbsp;&quot;</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
