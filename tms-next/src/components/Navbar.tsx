import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const navbarItems = [
    { name: "Home", path: "/" },
    { name: "Loadboard", path: "/loadboard" },
  ];
  return (
    <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-background/80 shadow-sm">
      {" "}
      <div className="  flex h-16 items-center  mx-8 ">
        <div className="flex-1">
          <Link href="/" className="flex  items-center gap-2" prefetch={false}>
            <MountainIcon />
            <span className="text-lg font-semibold flex-end">MorPro Inc</span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <nav className="hidden gap-4  md:flex ">
            {navbarItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-sm font-medium hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                {item.name}
              </Link>
            ))}
          </nav>{" "}
        </div>
        <div className="flex-1 flex justify-end">
          <span className="mx-2 border-2 rounded-md"> <ModeToggle /></span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border-4"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5 leading-none">
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    john@example.com
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <span>Sign out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function MountainIcon(props: React.ComponentPropsWithoutRef<"img">) {
  return (
    <img
      {...props}
      src="/images/MPBirdOutline.png"
      alt="Mountain Icon"
      width={50}
      height={50}
      className="h-6 w-auto object-contain"
      {...props}
    />
  );
}
