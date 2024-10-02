
import { LoadTable } from "@/app/loadboard/LoadTable";
import { authService } from "@/services/authentication/auth";
import {logout} from "../actions";
import Link from "next/link";

export default async function Loadboard() {
  
  return (
    <main >
      {/* <div>
        {user ? (
          <div>
            <p>Signed in as {user.id}</p>
              <Link href={"api/signout"}>Sign out</Link>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
            <Link href="">Sign in</Link>
          </div>
        )}
      </div> */}
      <LoadTable/>
    </main>
  );
}
