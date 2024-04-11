import connectDB from "@/config/database"
import Property from "@/models/Property"

// GET /api/properties/search

export const GET = async (request) => {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const location = searchParams.get("location")
        const propertyType = searchParams.get("propertyType")

        const locationPatern = new RegExp(location, "i")

        // Match location and property type
        let query = {
            $or: [
                { name: locationPatern },
                { description: locationPatern },
                { "location.city": locationPatern },
                { "location.state": locationPatern },
                { "location.street": locationPatern },
                { "location.zipcode": locationPatern }
            ]
        }

        // Only check for property if it's not "All"
        if(propertyType && propertyType !== "All") {
            const typePattern = new RegExp(propertyType, "i")
            query.type = typePattern
        }

        const properties = await Property.find(query)

        return new Response(JSON.stringify(properties), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}