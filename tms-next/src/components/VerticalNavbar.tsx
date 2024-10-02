'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/components/lib/utils";
import { ModeToggle } from "@/components/ModeToggle"
import {
  BarChart3,
  Truck,
  Users,
  Package,
  Wrench,
  FileText,
  Settings,
  ChevronDown,
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import ProfileNavbar from "./ProfileNavbar"

interface VerticalNavbarProps {
  onCollapsedChange: (collapsed: boolean) => void;
}

export default function VerticalNavbar({ onCollapsedChange }: VerticalNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const router = useRouter()

  const toggleNavbar = () => setIsOpen(!isOpen)
  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState)
    onCollapsedChange(newCollapsedState)
  }
  const expandSidebar = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
      onCollapsedChange(false)
    }
  }
  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const handleItemClick = (item: any) => {
    if (isCollapsed && item.subItems) {
      setIsCollapsed(false)
      onCollapsedChange(false)
      toggleSection(item.name)
    } else if (item.subItems) {
      toggleSection(item.name)
    } else {
      router.push(item.href)
    }
  }

  const navItems = [
    {
      name: "Dashboard",
      icon: BarChart3,
      href: "/loadboard",
    },
    {
      name: "Fleet",
      icon: Truck,
      href: "/fleet",
      subItems: [
        { name: "Vehicles", href: "/fleet/vehicles" },
        { name: "Maintenance", href: "/fleet/maintenance" },
      ],
    },
    {
      name: "Personnel",
      icon: Users,
      href: "/personnel",
      subItems: [
        { name: "Drivers", href: "/personnel/drivers" },
        { name: "Staff", href: "/personnel/staff" },
      ],
    },
    {
      name: "Operations",
      icon: Package,
      href: "/operations",
      subItems: [
        { name: "Shipments", href: "/operations/shipments" },
        { name: "Routes", href: "/operations/routes" },
      ],
    },
    { name: "Maintenance", icon: Wrench, href: "/maintenance" },
    { name: "Reports", icon: FileText, href: "/reports" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <>
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleNavbar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-background border-r border-border shadow-lg transition-all duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn("flex items-center justify-between p-4 border-b border-border", isCollapsed && "flex-col")}>
          {!isCollapsed && <span className="text-lg font-semibold">MorPro TMS</span>}
          <div className={cn("flex items-center", isCollapsed && "flex-col space-y-4")}>
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)] py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground",
                    isCollapsed && "justify-center px-2"
                  )}
                  onClick={() => handleItemClick(item)}
                >
                  <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                  {!isCollapsed && (
                    <>
                      <span>{item.name}</span>
                      {item.subItems && (
                        <ChevronDown
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform",
                            expandedSections.includes(item.name) && "rotate-180"
                          )}
                        />
                      )}
                    </>
                  )}
                </Button>
                {!isCollapsed && item.subItems && expandedSections.includes(item.name) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
        <div className={cn(
          "absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4",
          isCollapsed && "flex justify-center"
        )}>
          <ProfileNavbar isCollapsed={isCollapsed} onExpandSidebar={expandSidebar} />
        </div>
      </div>
    </>
  )
}