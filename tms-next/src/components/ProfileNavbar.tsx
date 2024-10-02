'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useUser } from "./contexts/UserContext";

interface ProfileNavbarProps {
  isCollapsed: boolean;
  onExpandSidebar: () => void;
}

export default function ProfileNavbar({ isCollapsed, onExpandSidebar }: ProfileNavbarProps) {
  const { user, setUser } = useUser()

  const handleClick = () => {
    if (isCollapsed) {
      onExpandSidebar();
    }
  };

  if (isCollapsed) {
    return (
      <Avatar onClick={handleClick} className="cursor-pointer">
        <AvatarFallback>{user ? user.id.substring(0, 2).toUpperCase() : 'GU'}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="flex items-center">
      <Avatar>
        <AvatarFallback>{user ? user.id.substring(0, 2).toUpperCase() : 'GU'}</AvatarFallback>
      </Avatar>
      <div className="ml-3 flex-grow min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {user ? user.id : "Guest"}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {user ? 'Logged In' : 'Not Logged In'}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className=" ml-2 p-2 text-muted-foreground h-full hover:text-foreground"
        asChild
      >
        <Link href={user ? "/api/signout" : "/signin"}>
          <LogOut  />
          {/* <span className="sr-only">{user ? 'Log out' : 'Log in'}</span> */}
        </Link>
      </Button>
    </div>
  );
}