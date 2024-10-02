import { afterLoginUrl } from "@/app-config";
import { authService } from "@/services/authentication/auth";
import { redirect } from "next/navigation";




export default async function Home() {
  // const user = await authService.getCurrentUser();
  // if (user) {
  //   redirect(afterLoginUrl)
  // }else{
  //   redirect("/signin")
  // }
  return (
    <div className="flex h-screen">
      <p>homepage</p>
    </div>
  );
}
