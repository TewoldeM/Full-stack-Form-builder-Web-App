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
import z, { string } from "zod";
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
import { BsFillCalculatorFill } from "react-icons/bs";
import { CalendarRangeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, getDate } from "date-fns";
const type: ElementsType = "DateField";
const extraAttributes = {
  lable: "Date field",
  helpertext: "pick a date",
  required: false,
};
const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helpertext: z.string().max(200),
  required: z.boolean().default(false),
});
export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsFillCalculatorFill,
    lable: "Date Field",
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
  const { label, required, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full border-2 border-yellow-600">
      <label>
        {label}
        {required && "*"}
      </label>
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal"
      >
        <CalendarRangeIcon className="mr-2 h-4 w-4" />
        <span>Pick a date</span>
      </Button>

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
  const [date, setDate] = useState<Date | undefined>(
    defaultvalue ? new Date(defaultvalue) : undefined
  );

  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setError(isInvalid === true), [isInvalid];
  });
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-4 p-4 w-full border-2 border-gray-100 dark:border-gray-800">
      <label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-normal text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarRangeIcon className="mr-2 h-4 w-4" />
            {date ? format(date,"PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
             if(date) getDate(date);
              if (!submitvalue) string;
              const valid = DateFieldFormElement.validate(element, value);
              setError(!valid);
              submitvalue?(element.id, value);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormScehmaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.lable,
      helpertext: element.extraAttributes.helperText,
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
          e.preventDefault;
        }}
      >
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
      </form>
    </Form>
  );
}
