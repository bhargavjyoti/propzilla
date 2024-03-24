import Image from "next/image"
import loading from "@/assets/loading-spinner.svg"

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image src={loading} alt="Loading..." width={200} height={200} />
    </div>
  )
}

export default LoadingPage