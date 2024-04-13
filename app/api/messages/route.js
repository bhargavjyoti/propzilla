import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"

export const dynamic = "force-dynamic"

// GET /api/messages
export const GET = async () => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser()

        if(!sessionUser || !sessionUser.userId) {
            return new Response("You must be logged in to send a message", { status: 401 })
        }

        const { userId } = sessionUser

        const messages = await Message.find({ recipient: userId }).populate("sender", "name").populate("property", "title")

        return new Response(JSON.stringify(messages), { status: 200 })
        
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}



// POST /api/messages
export const POST = async (request) => {
    try {
        await connectDB()
        const { name, email, phone, message, property, recipient } = await request.json()
        const sessionUser = await getSessionUser()

        if(!sessionUser || !sessionUser.userId) {
            return new Response("You must be logged in to send a message", { status: 401 })
        }

        const { user } = sessionUser

        // Cannot send message to yourself
        if(user.id === recipient) {
            return new Response("You cannot send message to yourself", { status: 400 })
        }

        // Create new message
        const newMessage = new Message({
            sender: user.id,
            recipient,
            email,
            name,
            phone,
            body: message, 
            property
        })

        await newMessage.save()

        return new Response(JSON.stringify({ message: "Message sent successfully" }), { status: 200 })
    } catch (error) {
        console.log(error)

        return new Response("Something went wrong", { status: 500 })
    }
}

