import React, { useState } from "react";
import DesignerSideBar from "./DesignerSideBar";
import {DragEndEvent, useDndMonitor, useDroppable} from "@dnd-kit/core"
import { cn } from "@/lib/utils";
import { ElementsType,FormElements } from "./FormElements";
import useDesignere from "./hooks/useDesignere";
const Designer = () => {
  const {elements,addElement}= useDesignere()
    const dropable = useDroppable({
      id: "designer-drop-area",
      data: {
        isDesignerDropArea: true,
      },
    });
  useDndMonitor({
    onDragEnd: (event:DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement=FormElements[type as ElementsType].construct(idGenerater())
      }
    }
  })
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            dropable.isOver && "ring-2 ring-primary/20"
          )}
          ref={dropable.setNodeRef}
        >
          {!dropable.over && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {dropable.over && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20">

              </div>
            </div>
              
            )}
        </div>
      </div>
      <DesignerSideBar />
    </div>
  );
};

export default Designer;
