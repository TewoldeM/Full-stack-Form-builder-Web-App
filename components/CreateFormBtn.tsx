import { Dialog,DialogContent,DialogTrigger,DialogDescription,DialogTitle} from "@radix-ui/react-dialog";
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "./ui/form";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { ImSpinner2 } from "react-icons/im"
import { BsFileEarmarkPlus } from "react-icons/bs"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
 const formSchema = z.object({
      name: z.string().min(3).max(50),
      description: z.string().max(200).optional(),
    });
type formSchemaType = z.infer<typeof formSchema>;
function CreateFormBtn() {
    const form = useForm<formSchemaType>({ resolver: zodResolver(formSchema) })
    function onSubmit(value:formSchemaType) {
    console.log("value:",value)
}    
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button>Create new form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                        Create form
                    </DialogTitle>
                 <DialogDescription>
                    Create a new to start collecting responses
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             
                    </form>
                    
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFormBtn;