"use client";
import { Form } from "@prisma/client";
import React, { useEffect } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormbtn from "./SaveFormbtn";
import PublishFormbtn from "./PublishFormbtn";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";
import { FaBullseye } from "react-icons/fa";
const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = React.useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 300, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements,setSelectedElement]);
  if (!isReady) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }
  const shareUrl = `${window.location.origin}/submit/${form.share}`;

  if (form.published) {
    return (
      <>
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎉 Form Published 🎉
            </h1>
            <h2 className="text-2xl">Share this form:</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Link Copied",
                    description:
                      "The form link has been copied to your clipboard",
                  });
                }}
              >
                Copy Link
              </Button>
            </div>
            <div>
              <Button variant={"link"} asChild>
                <Link href={"/"}>
                  <BsArrowLeft />
                  Back to Home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  <BsArrowRight />
                  Form Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={[mouseSensor, touchSensor]}>
      <main className="flex flex-col w-full">
        <nav className="flex jb border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>{" "}
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormbtn id={form.id} />
                <PublishFormbtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full h-fit flex-grow items-center justify-center relative overflow-auto bg-accent bg-cover bg-[radial-gradient(ellipse_at_top,#f8fafc,#e2e8f0_60%)] dark:bg-[radial-gradient(ellipse_at_top,#1a1f2b,#0e1117_60%)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
