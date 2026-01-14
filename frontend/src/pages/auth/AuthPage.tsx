import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"
import mansuAi from "/mansuAi.png";

export default function AuthPage() {
  const { pathname } = useParams()

  return (
    <main className="mt-35 container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      
      <div className="-z-1 absolute w-full h-full inset-0 pointer-events-none select-none bottom-0 left-0 opacity-15 flex flex-col gap-5 items-center justify-center">
        <img src={mansuAi} alt="Mansu AI Logo" className="w-[70%]" />
        <span className="text-blue-400 text-[100px] font-extrabold">MANSU'S AI</span>
      </div>
      <AuthView pathname={pathname} classNames={{base: 'bg-transparent ring ring-blue-600/50'}} />
    </main>
  )
}