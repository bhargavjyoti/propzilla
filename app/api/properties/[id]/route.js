import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"

// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB()
        const property = await Property.findById(params.id)

        if (!property) {
            return new Response("Property not found", { status: 404 })
        }

        return new Response(JSON.stringify(property), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {
        const propertyId = params.id
        // Get the session user
        const sessionUser = await getSessionUser()

        // Check if the session user is null or not
        if(!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 })
        }

        // Get the userId from the session user
        const { userId } = sessionUser

        await connectDB()
        const property = await Property.findById(propertyId)

        if (!property) {
            return new Response("Property not found", { status: 404 })
        }

        // Verify the owner of the property
        if (property.owner.toString() !== userId) {
            return new Response("Unauthorized", { status: 401 })
        }

        // Delete the property
        await property.deleteOne()

        return new Response("Property deleted", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}