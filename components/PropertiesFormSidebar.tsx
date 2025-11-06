import React from 'react'
import useDesignere from './hooks/useDesignere';
import { FormElements } from './FormElements';
import { MdAddCircleOutline } from 'react-icons/md';
import { Button } from './ui/button';

const PropertiesFormSidebar = () => {
    const { selectedElement, setSelectedElement } = useDesignere();
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
      <PropertiesForm />
    </div>
  );
}

export default PropertiesFormSidebar