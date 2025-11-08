import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { AlertDescription } from "./ui/alert";
import { FaIcons } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishFormbtn = ({ id }: { id: number }) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  async function publishForm() {
    try { 
      await PublishForm(id);
      toast({ title: "success", description: "form published successfully", })
      router.refresh();
    }
    catch (error) {
      
      toast({title:"error",description:"something went wrong",variant:"destructive"})
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
          variant={"outline"}
        >
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutly sure?
          </AlertDialogTitle>
          <AlertDescription>
            This action canno be undone. After publishing you will not be able to edit the form anymore.<br/>
            <br />
            <span>
              By publishing this form you will make it available to the public and you will be able to collect submission
            </span>

          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault()
            startTransition(publishForm)
          }}>
            procees {loading && <FaIcons className="animate-spin"/>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormbtn;
