import "@/assets/styles/globals.css"

export const metadata = {
    title: "PropZilla",
    description: "A Real Estate Website Built with Next.js",
    keywords: "Real Estate, Property, Web Development, Next.js",
}

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout