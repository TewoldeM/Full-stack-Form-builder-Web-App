"use client"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { FormElement } from '../app/FormBuilder/page';
import { ElementsType, FormElements } from "./FormElements";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";

const DragOverlayWrapper = () => {
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
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
