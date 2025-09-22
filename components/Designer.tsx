import React from "react";
import DesignerSideBar from "./DesignerSideBar";
import {useDroppable} from "@dnd-kit/core"
import { cn } from "@/lib/utils";
const Designer = () => {
    const dropable = useDroppable({
      id: "designer-drop-area",
      data: {
        isDesignerDropArea: true,
      },
    });
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
