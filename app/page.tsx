import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function MarketingPage() {

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-tr from-[#17181e] via-[#27223e] to-[#17181e] flex justify-center items-center">
        <div className="flex flex-col items-center text-center space-y-8 px-6 max-w-2xl">
          {/* Título principal */}
          <div>
            <h1 className="font-extrabold text-5xl text-white tracking-tight">
              Black Post
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Where thoughts speak louder than names.
            </p>
          </div>

          {/* Texto de marketing */}
          <div className="space-y-4">
            <p className="text-white leading-relaxed text-base md:text-lg">
              Create your <span className="font-bold text-[#9b8bff]">Black Post</span> for{" "}
              <span className="font-bold text-[#9b8bff]">ALL</span>.
            </p>
            <p className="text-gray-300 text-sm md:text-base">
              Share your ideas, stories, and opinions — <br />
              <span className="font-semibold text-[#9b8bff]">completely anonymous.</span>
            </p>
            <p className="text-gray-400 text-xs max-w-sm mx-auto">
              Express yourself freely. No profiles. No judgment. Just real thoughts.
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
            <Link href="./sign-up" className="flex items-center justify-center">
              <Button variant="default" className="w-fit cursor-pointer px-6 py-2">
                Create an account
              </Button>
            </Link>
            <Link href="./sign-in">
              <Button
                variant="ghost"
                className="bg-white text-black cursor-pointer hover:bg-gray-200 px-6 py-2"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* Rodapé */}
          <div className="text-gray-500 text-xs pt-10">
            © {new Date().getFullYear()} Black Post — Speak Freely.
          </div>
        </div>
      </div>
    </>
  );
}
