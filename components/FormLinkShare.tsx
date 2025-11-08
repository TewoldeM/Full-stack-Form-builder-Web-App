"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { ImShare } from "react-icons/im";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null; // avoiading window not defined error
  }
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} />
      <Button
        className="w-[120px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link Copied",
            description: "The form link has been copied to your clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        ShareLink
      </Button>
    </div>
  );
};

export default FormLinkShare;
