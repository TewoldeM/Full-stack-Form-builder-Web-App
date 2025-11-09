"use client"
import { RiSeparator } from "react-icons/ri";
import { ElementsType, FormElement, FormElementInstance, submitfunction } from '../FormElements';
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: RiSeparator,
    lable: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: propertiesComponent,
  validate: () => true,
};

function FormComponent({
  elementInstance,}: {
  elementInstance: FormElementInstance;
}) {
  return (
 <Separator />
  );
}
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full border-2 border-yellow-600">
      <label className="text-muted-foreground">
       Separator field:
     <Separator/>
      </label>
    </div>
  );
}
function propertiesComponent({elementInstance,}: {
  elementInstance: FormElementInstance;
}) {
  return (
   <p>No properties for this element</p>
  );
}
