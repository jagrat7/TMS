'use client'
import Container from "@/components/Container";
import VerticalNavbar from "@/components/VerticalNavbar";
import { cn } from "@/components/lib/utils";
import { useState } from "react";

export default function loadboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  return (
    <section>
      <VerticalNavbar onCollapsedChange={setIsNavbarCollapsed} />
      <div
        className={cn(
          "flex-1 overflow-y-auto p-8 transition-all duration-300 ease-in-out",
          isNavbarCollapsed ? "ml-16" : "ml-64"
        )}
      >
    
        {/* <Container> */}
        {children}
      </div>
      {/* </Container> */}
    </section>
  );
}
