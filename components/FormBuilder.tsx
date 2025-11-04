"use client"
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
        <div className="flex w-full h-fit flex-grow items-center justify-center relative overflow-auto bg-accent bg-cover bg-[radial-gradient(ellipse_at_top,#f8fafc,#e2e8f0_60%)] dark:bg-[radial-gradient(ellipse_at_top,#1a1f2b,#0e1117_60%)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
