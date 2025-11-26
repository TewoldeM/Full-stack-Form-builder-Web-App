import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const PreviewDialogBtn = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="flex justify-center items-center px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>

        <div className="bg-950 flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto shadow-md shadow-green-300 border-2 border-gray-600">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <div key={element.id}>
                  <FormComponent elementInstance={element} defaultvalue="" />
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
