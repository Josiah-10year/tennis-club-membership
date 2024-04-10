import { getEvents, getUser } from "../../sanity/sanity-utils";
import Link from "next/link";
import { authConfig, loginIsRequiredServer } from "../lib/auth";
import { getServerSession } from "next-auth";
import { User } from "@/types/User";

export default async function MyAccount() {
    await loginIsRequiredServer();

    const session = await getServerSession(authConfig);
    console.log("Session: ", session);

    let username: string | null | undefined = ""

    if(session)
    username = session?.user?.email
    
    if(typeof username == "undefined" || !username)
        username = ""

    const users = await getUser(username);
    const user = users[0]

    

  return (
    <div className="max-w-5xl mx-auto py-20">
      <h1>My Account</h1>
        <div className="text-gray-600 mb-2">
            Name: {user.firstName} {user.lastName} <br></br>
            Username: {user.username.current} <br></br>
            Bio: {user.bio.toString()} <br></br>
        </div>
    </div>
   );
}
