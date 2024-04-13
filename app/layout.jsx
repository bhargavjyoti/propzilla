import "@/assets/styles/globals.css"
import AuthProvider from "@/components/AuthProvider"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from "@/context/GlobalContext";

export const metadata = {
    title: "PropZilla",
    description: "A Real Estate Website Built with Next.js",
    keywords: "Real Estate, Property, Web Development, Next.js",
}

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <ToastContainer />
            </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MainLayout