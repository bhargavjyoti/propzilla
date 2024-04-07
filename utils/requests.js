// Get the API domain from the environment variable or use the default value
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null 

// Fetch All Properties
async function fetchProperties() {
    try {
        // Handle the case when the API domain is not set
        if (!apiDomain) {
            return []
        }

        // Fetch data from the API
        const res = await fetch(`${apiDomain}/properties`, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }

        return res.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

// Fetch Single Property
async function fetchProperty(id) {
    try {

        if(!apiDomain) {
            return null
        }

        const res = await fetch(`${apiDomain}/properties/${id}`)

        if(!res.ok) {
            throw new Error("Failed to fetch data")
        }

        return res.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export { fetchProperties, fetchProperty }