import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { lable, icon: Icon } = formElement.designerBtnElement;

  const dragable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={dragable.setNodeRef}
      variant={"outline"}
      {...dragable.attributes}
      {...dragable.listeners}
      className={cn(
        "flex flex-col gap-2 cursor-grab h-[120px] w-[120px]",
        dragable.isDragging && "ring-2 ring-primary"
      )}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{lable}</p>
    </Button>
  );
};

export default SidebarBtnElement;

 export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { lable, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button
      variant={"outline"}
      className={cn("flex flex-col gap-2 cursor-grab h-[120px] w-[120px]")}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{lable}</p>
    </Button>
  );
}
