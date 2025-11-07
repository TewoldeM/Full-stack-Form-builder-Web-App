import React from 'react'
import { FormElements } from './FormElements';
import { MdAddCircleOutline } from 'react-icons/md';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import useDesigner from './hooks/useDesigner';

const PropertiesFormSidebar = () => {
    const { selectedElement, setSelectedElement } = useDesigner();
    if (!selectedElement) return null;
    const PropertiesForm =FormElements[selectedElement?.type].propertiesComponent;
  return (
      <div className='flex flex-col p-2'>
          <div className='flex justify-between items-center '>
          <p className='tex-sm text-foreground/70'>Element properties</p>
          <Button>
              <MdAddCircleOutline />
          </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm elementInstance={selectedElement}/>
    </div>
  );
}

export default PropertiesFormSidebar