"use client";
import { RxDropdownMenu } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const type: ElementsType = "SelectField";
const extraAttributes = {
  lable: "Select field",
  helpertext: "Helper text",
  required: false,
  placeHolder: "Value here ...",
  options: [],
};
const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helpertext: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  options: z.array(z.string()).default([]),
});
export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RxDropdownMenu,
    lable: "Select Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: propertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentvalue: string
  ): boolean => {
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
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full border-2 border-yellow-600">
      <label>
        {label}
        {required && "*"}
      </label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
      </Select>{" "}
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
  const [value, setValue] = useState(defaultvalue || "");
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setError(isInvalid === true), [isInvalid];
  });
  const { label, required, placeHolder, helperText,options } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-4 p-4 w-full border-2 border-gray-100 dark:border-gray-800">
      <label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </label>
      <Select defaultValue={value} onValueChange={(value) => {
        setValue(value)
        if (!submitvalue) return
        const valid = SelectFieldFormElement.validate(element, value);
        setError(!valid)
        submitvalue(element.id, value);
      }}>
        <SelectTrigger className={cn("w-full", error && "border-red-500")} >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

function propertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement,setSelectedElement } = useDesigner();
  const form = useForm<propertiesFormScehmaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.lable,
      helpertext: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      options:element.extraAttributes.options
    },
  });
  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormScehmaType) {
    const { label, helpertext, placeHolder, required,options } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helpertext,
        placeHolder,
        required,
        options
      },

    });
    toast({ title: "success" ,
      description: "Properties Saves Successfully"
    })
    setSelectedElement(null)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
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
                The lable of the field. <br /> It will be displayed above the
                fields
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>placeHolder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The placeHolder</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helpertext"
          render={({ field }) => (
            <FormItem>
              <FormLabel>helpertext"</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The helpertext"</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Options"</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("New option"));
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div className="flex ic justify-between gap-1" key={index}>
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.slice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>The helpertext"</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>required"</FormLabel>
                <FormDescription>The helpertext"</FormDescription>
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
        <Separator />
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
