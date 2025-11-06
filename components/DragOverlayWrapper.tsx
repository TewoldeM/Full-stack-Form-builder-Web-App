"use client"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { FormElement } from '../app/FormBuilder/page';
import { ElementsType, FormElements } from "./FormElements";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";
import useDesignere from "./hooks/useDesignere";

const DragOverlayWrapper = () => {
const {elements}=useDesignere()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragEnd: () => setDraggedItem(null),
    onDragCancel: () => setDraggedItem(null),
  });
    
  if (!draggedItem) {
    return null
  }
  let node = <div>No drag overlay</div>
  const IsSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
  if (!IsSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  
  }
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((el) => el.id === elementId)
    if (!element) {
      node = <div>Element not found</div>
    }
    else{
      const DesignerElementComponent = FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80">
          <DesignerElementComponent elementInstance={element} />
          </div>

      )
    }
    return <DragOverlay>{node}</DragOverlay>;
  };
}
export default DragOverlayWrapper;
