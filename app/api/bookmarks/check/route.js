import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// Force dynamic route for SSR
export const dynamic = "force-dynamic"

export const POST = async (request) => {
    try {
        await connectDB()

        // Get the property id from the request body
        const { propertyId } = await request.json()

        // Get the session user
        const sessionUser = await getSessionUser()

        // Check if the session user is null or not
        if(!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 })
        }

        // Get the userId from the session user
        const { userId } = sessionUser

        // Find user in the database
        const user = await User.findById(userId)

        // check if property is already bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 })

    } catch (error) {
        console.log(error)

        return new Response("Something went wrong", { status: 500 })
    }
}