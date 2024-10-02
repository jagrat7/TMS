import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JSX, SVGProps } from "react";

export default function LoadView() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="bg-background p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">2h ago</div>
            <div className="text-sm text-muted-foreground">300 mi </div>
            <div className="text-sm text-muted-foreground">CA - TX</div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Load Link
            </Button>
            <Button size="sm" variant="outline">
              Report a Problem
            </Button>
            <Button size="sm" variant="outline">
              Add to My Loads
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Pickup</div>
            <div className="font-medium">2023-06-01 10:00 AM</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Delivery</div>
            <div className="font-medium">2023-06-02 3:00 PM</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Truck</div>
            <div className="font-medium">53 Dry Van</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Weight</div>
            <div className="font-medium">44,000 lbs</div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="font-medium">
              <Button size="sm" variant="outline">
                Show Price
              </Button>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Estimated Fuel</div>
            <div className="font-medium">
              <Button size="sm" variant="outline">
                Show Fuel
              </Button>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Broker</div>
            <div className="font-medium">Ardent Logistics</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Rating</div>
            <div className="font-medium">
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Ardent Contact</div>
            <div className="font-medium">
              <div>John Doe</div>
              <div>+1 (555) 555-5555</div>
              <div>john@ardent.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background p-6 rounded-lg shadow">
        <div className="relative h-[400px]">
          <div className="absolute inset-0 rounded-lg" />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12683.698103162737!2d-121.89041299999998!3d37.3679627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcb8ceadca63f%3A0x26bb55412799486a!2sReyonolds%20Circle%20Business%20Park!5e0!3m2!1sen!2sus!4v1723782718788!5m2!1sen!2sus" width="600" height="450"   loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Button size="sm" variant="outline">
              <LayersIcon className="w-4 h-4" />
              <span className="sr-only">Layers</span>
            </Button>
            <Button size="sm" variant="outline">
              <ZoomInIcon className="w-4 h-4" />
              <span className="sr-only">Zoom in</span>
            </Button>
            <Button size="sm" variant="outline">
              <ZoomOutIcon className="w-4 h-4" />
              <span className="sr-only">Zoom out</span>
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 bg-background/70 rounded-lg px-3 py-1 text-sm">
            300 mi | 5h 30m
          </div>
          <Button
            size="sm"
            variant="outline"
            className="absolute bottom-4 right-4"
          >
            Show Deadhead on Map
          </Button>
        </div>
      </div>
    </div>
  );
}

function LayersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ZoomInIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}

function ZoomOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  );
}
