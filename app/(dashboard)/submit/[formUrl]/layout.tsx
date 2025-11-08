import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
        <main className="flex flex-grow"> {children}</main>
      </div>
    </>
  );
}

export default Layout;
