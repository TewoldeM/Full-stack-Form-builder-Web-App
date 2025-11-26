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
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "../ui/slider";

const type: ElementsType = "TextAreaField";

const extraAttributes = {
  label: "TextArea field",
  helpertext: "Helper text",
  required: false,
  placeHolder: "Value here ...",
  rows: 3,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helpertext: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export const TextAreaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: BsTextareaResize,
    lable: "TextArea Field",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  PropertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentvalue: string) => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentvalue.length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormScehmaType = z.infer<typeof propertiesSchema>;

/* ---------------------------------------------------
   FORM COMPONENT
---------------------------------------------------- */
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

  const [value, setValue] = useState(defaultvalue || "");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helpertext, rows } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-4 p-4 w-full border-2 border-gray-100 dark:border-gray-800">
      <label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </label>

      <Textarea
        rows={rows}
        placeholder={placeHolder}
        className={cn(
          "shadow-sm border-l border-gray-100 dark:border-gray-700",
          error && "border-red-500"
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitvalue) return;

          const valid = TextAreaFieldFormElement.validate(
            element,
            e.target.value
          );
          setError(!valid);

          if (!valid) return;

          submitvalue(element.id, e.target.value);
        }}
      />

      {helpertext && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helpertext}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------
   DESIGNER COMPONENT
---------------------------------------------------- */
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, helpertext } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full border-2 border-yellow-600">
      <label>
        {label}
        {required && "*"}
      </label>

      <Textarea readOnly placeholder={element.extraAttributes.placeHolder} />

      {helpertext && (
        <p className="text-muted-foreground text-[0.8rem]">{helpertext}</p>
      )}
    </div>
  );
}

/* ---------------------------------------------------
   PROPERTIES COMPONENT
---------------------------------------------------- */
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
      label: element.extraAttributes.label,
      helpertext: element.extraAttributes.helpertext,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      rows: element.extraAttributes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormScehmaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: { ...values },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
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
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                />
              </FormControl>
              <FormDescription>
                The label of the field. It will be displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PLACEHOLDER */}
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                />
              </FormControl>
              <FormDescription>The placeholder text.</FormDescription>
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
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                />
              </FormControl>
              <FormDescription>
                Description shown below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ROWS SLIDER */}
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rows: {form.watch("rows")}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
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
              <div>
                <FormLabel>Required</FormLabel>
                <FormDescription>Is this field required?</FormDescription>
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
