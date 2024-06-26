import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// Force dynamic route for SSR
export const dynamic = "force-dynamic"

// GET /api/bookmarks
export const GET = async () => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser()

        if(!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 })
        }

        const { userId } = sessionUser

        // Find user in the database
        const user = await User.findById(userId)

        // Get users bookmarks
        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } })

        return new Response(JSON.stringify(bookmarks), { status: 200 })
    } catch (error) {
        console.log(error)

        return new Response("Something went wrong", { status: 500 })
    }
}
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

        let message

        if(isBookmarked) {
            // remove property from bookmarks
            user.bookmarks.pull(propertyId)

            message = "Property removed from bookmarks"

            isBookmarked = false
        } else {
            // add property to bookmarks
            user.bookmarks.push(propertyId)

            message = "Property added to bookmarks"

            isBookmarked = true
        }
        
        // Update user in the database
        await user.save()

        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })

    } catch (error) {
        console.log(error)

        return new Response("Something went wrong", { status: 500 })
    }
}