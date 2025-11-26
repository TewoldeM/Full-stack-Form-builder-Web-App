"use client";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LuHeading1 } from "react-icons/lu";
const type: ElementsType = "TitleField";
const extraAttributes = {
  title: "text field",
};
const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});
export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading1,
    lable: "Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  PropertiesComponent: PropertiesComponent,
  validate: () => true,
};
type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
type propertiesFormScehmaType = z.infer<typeof propertiesSchema>;

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return <p className="text-xl">{title}</p>;
}
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full border-2 border-yellow-600">
      <label className="text-muted-foreground">
        Title field:
        <p className="text-xl">{title}</p>
      </label>
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
      title: element.extraAttributes.title,
    },
  });
  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormScehmaType) {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title: element.extraAttributes.title,
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault;
        }}
      >
        <FormField
          control={form.control}
          name="title"
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
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
