import { NextAuthOptions, User, getServerSession } from "next-auth"
import { redirect } from "next/navigation" //useRouter
import CredentialsProvider from "next-auth/providers/credentials"
import { getUser } from "../../sanity/sanity-utils";

export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Username",
                    type: "string",
                    placeholder: "enter username here",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;

                const dbUsers = await getUser(credentials.email);
                const dbUser = dbUsers[0]

                if (dbUser && dbUser.password == credentials.password) {

                    const name = dbUser.firstName + " " + dbUser.lastName
                    const username = dbUser.username.current
                    const { password, _createdAt, _id, email, phone, image, bio, subscriptions, interests, role, content, firstName, lastName, ...dbUserWithoutPassword } = dbUser
                    const userWithoutPassword: unknown = { ...dbUserWithoutPassword, name: name };
                    const test = { name: name, email: username }
                    return test as User;
                }

                return null
            }
        }),
    ],
}

export async function useloginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return redirect("/login");
}

export async function loginIsRequiredClient() {
    if (typeof window !== "undefined") {
        const session = await getServerSession(authConfig);
        if (!session) return redirect("/login");
    }
}