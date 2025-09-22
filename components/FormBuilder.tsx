import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormbtn from "./SaveFormbtn";
import PublishFormbtn from "./PublishFormbtn";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex jb border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>{" "}
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormbtn />
                <PublishFormbtn />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-auto h-[200px] bg-accent">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
      
    </DndContext>
  );
};

export default FormBuilder;
