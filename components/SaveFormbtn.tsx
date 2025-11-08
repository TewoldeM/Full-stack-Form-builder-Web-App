import React, { useTransition } from 'react'
import { Button } from './ui/button';
import { HiSave } from 'react-icons/hi';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';
import { UpdateFormContent } from '@/actions/form';
import useDesigner from './hooks/useDesigner';
const SaveFormbtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
 const updateFormContent = async () => {
  try {
    const jsonElements = JSON.stringify(elements);
    await UpdateFormContent(id, jsonElements);
    toast({
      title: "Success",
      description: "Your form has been saved",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  }
}

return (
    <Button className="gap-2" variant={"outline"} disabled={loading} onClick={()=>{startTransition(updateFormContent)}} >
      <HiSave className="h-4 w-4" />
        Save
      {loading && <FaSpinner  className="animate-spin"/>}
    </Button>
)
}

export default SaveFormbtn