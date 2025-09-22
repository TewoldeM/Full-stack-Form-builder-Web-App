import React from 'react'
import { Button } from './ui/button';
import { HiSave } from 'react-icons/hi';
const SaveFormbtn = () => {
  return (
    <Button className="gap-2" variant={"outline"}>
      <HiSave className="h-4 w-4" />
      Save
    </Button>
  );
}

export default SaveFormbtn