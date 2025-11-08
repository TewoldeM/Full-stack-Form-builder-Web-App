"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
    setMounted(true);
    }, []);
    if (!mounted) {
        return null; // avoiading window not defined error
    }
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button
      className="w-[120px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >Visit</Button>
  );
};

export default VisitBtn;
