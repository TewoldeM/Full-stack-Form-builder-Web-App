"use client";
import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  submitfunction,
} from "../FormElements";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
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
import { LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";
const type: ElementsType = "SpacerField";
const extraAttributes = {
  height: 20,
};
const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});
export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    lable: "Spacer Field",
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
  const { height } = element.extraAttributes;
  return <div style={{ height, width: "100%" }}></div>;
}
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full border-2 border-yellow-600">
      <label className="text-muted-foreground">Spacer field:{height}px</label>
      <LuSeparatorHorizontal className="h-8 w-8" />
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
      height: element.extraAttributes.height,
    },
  });
  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormScehmaType) {
    const { height } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height: element.extraAttributes.height,
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height(px):{form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
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
