"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { HiCursorClick } from "react-icons/hi";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

function FormSubmitComponent({content,formUrl}: {content: FormElementInstance[];
  formUrl: string;
}) {
  const formvalues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderkey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
     const actualvalue = formvalues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualvalue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
      
    }
    if(Object.keys(formErrors.current).length > 0){
      return false
    }
    return true;
  },[content])
  const submitvalue = useCallback((key: string, value: string) => {
  formvalues.current[key]= value;
  }, [])
  
async function submitForm() {
    formErrors.current = {};
    const validform = validateForm();
    if (!validform) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please chuck the form.",
        variant: "destructive",
      }
      )
      return;
    }
    try {
      const jsonContent = JSON.stringify(formvalues.current)
      await SubmitForm(formUrl, jsonContent)
      setSubmitted(true)
    }
    catch (error) {
        toast({
          title: "Error",
          description: "something goes wrong.",
          variant: "destructive",
        });
    }
  } 
  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">FormSubmitted</h1>
          <p className="text-muted-foreground">
            Thanku for submitting the form, you can close this page now
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderkey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitvalue={submitvalue}
              isInvalid={formErrors.current[element.id]}
              defaultvalue={formvalues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm)
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
