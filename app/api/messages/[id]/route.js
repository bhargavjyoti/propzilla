import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic"

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB()

        const { id } = params

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response("UserId is required", { status: 401 })
        }

        const { userId } = sessionUser

        const message = await Message.findById(id)

        if(!message) {
            return new Response("Message not found", { status: 404 })
        }

        // Verify the owner of the message
        if(message.recipient.toString() !== userId) {
            return new Response("Unauthorized", { status: 401 })
        }

        // Update the message
        message.read = !message.read

        await message.save()

        return new Response(JSON.stringify(message), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}

// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
    try {
        // Connect to the database
        await connectDB()

        // Get the message id from the params
        const { id } = params

        // Get the session user
        const sessionUser = await getSessionUser()

        // Check if the session user is null or not
        if (!sessionUser || !sessionUser.userId) {
            return new Response("UserId is required", { status: 401 })
        }

        // Get the userId from the session user
        const { userId } = sessionUser

        // Find message in the database
        const message = await Message.findById(id)

        // Check if the message exists
        if (!message) {
            return new Response("Message not found", { status: 404 })
        }
        // Verify the owner of the message
        if (message.recipient.toString() !== userId) {
            return new Response("Unauthorized", { status: 401 })
        }
        // Delete the message
        await message.deleteOne()

        // Return a success response
        return new Response("Message deleted", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}