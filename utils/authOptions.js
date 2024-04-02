import connectDB from "@/config/database"
import User from "@/models/User"

// Importing Google Provider from next-auth
import GoogleProvider from "next-auth/providers/google"

// Exporting Google Provider
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        // Invoked on successful sing in
        async signIn({ profile }) {
            // 1. Connect to the database
            await connectDB()
            // 2. Check if user already exists
            const userExist = await User.findOne({ email: profile.email })
            // 3. If not, create a new user
            if(!userExist) {
                // Truncate the username if it is too long
                const username = profile.name.slice(0, 20)

                // Create a new user
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
             // 4. Return true to allow signin
             return true
        },
        // Modifies the session object
        async session({ session }) {
            // 1. Get the user from the database
            const user = await User.findOne({ email: session.user.email})
            // 2. Assign the user ID to the session
            session.user.id = user._id.toString()
            // 3. Return session
            return session
        }
    }
}