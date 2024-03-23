import "@/assets/styles/globals.css"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export const metadata = {
    title: "PropZilla",
    description: "A Real Estate Website Built with Next.js",
    keywords: "Real Estate, Property, Web Development, Next.js",
}

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </body>
    </html>
  )
}

export default MainLayout