import connectDB from "@/config/database"
import Property from "@/models/Property"

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
    try {
        // Connect to the database
        await connectDB()

        // Get the userId from the params
        const userId = params.userId

        // Check if the userId is valid or not
        if(!userId) {
            return new Response("User ID is required", { status: 400 })
        }

        // Get the properties of the user from the database
        const properties = await Property.find({ owner: userId })

        // Return the properties
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}