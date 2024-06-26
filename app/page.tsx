import { getServerSession } from "next-auth";
import { authConfig } from "./lib/auth";
import { User } from "@/types/User";
import { getUser } from "@/sanity/sanity-utils";

export default async function Home() {

  const session = await getServerSession(authConfig);
  let loggedInUser : User | null = null

  if(session){
    if(session?.user?.email){
      const users = await getUser(session?.user?.email);
      loggedInUser = users[0];
    }

  }

  return (
    <div className="max-w-5xl mx-auto justify-center py-20">
      <div className="max-w-5xl flex flex-col container justify-center items-center mx-auto py-20 bg-cover" style={{ backgroundImage: `url('https://raw.githubusercontent.com/Josiah-10year/tennis-club-membership/master/app/images/tennis-club.jpg')` }}>
        <h1 className="text-white text-center py-8">St. Augustine Recreational Club</h1>
        {session && loggedInUser && loggedInUser.role === "admin" && (
          <div>
            <a href="/admin/structure">
              <p className="bg-gray-900 p-1 border-white border text-white bg-opacity-50 text-center rounded-lg hover:bg-opacity-100 hover:scale-105">Admin View</p>
            </a>
          </div>
        )}
        {!session && (
          <div>
            <a href="/login">
              <p className="bg-gray-900 p-1 border-white border text-white bg-opacity-50 text-center rounded-lg hover:bg-opacity-100 hover:scale-105">Member Login/Register</p>
            </a>
          </div>
        )}
      </div>
      <div className="max-w-5xl flex flex-col container justify-center items-center mx-auto py-4">
        <p className="text-center">This is a recreational club which naturally beckons with its excellent location and easy access to all. Be it an intense workout on one of the four tennis courts or a relaxing evening at the restaurant.</p>
      </div>
    </div>
  );
}