import React from "react";
import useDesignere from "./hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

const DesignerSideBar = () => {
  const {selectedElement,setSelectedElement}=useDesignere();
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSideBar;
