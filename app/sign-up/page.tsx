'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Meteors } from "@/components/ui/meteors";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SingUpPage() {

  type formData = {
    name:string,
    email:string,
    password:string,
  }

  const router = useRouter();

  const [dataUser, setDataUser] = useState<formData>({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data, error } = await authClient.signUp.email({
    name: dataUser.name, // required
    email: dataUser.email, // required
    password: dataUser.password, // required
    callbackURL: "/sign-in",
});
  
  router.push('/sign-in')

if (error) {
      console.error("Erro ao cadastrar:", error);
    } else {
      console.log("Usuário criado:", data);
    }
  }

  return (
    <div className="h-screen w-full bg-[#0e0f16] flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c14] via-[#12131b] to-[#1c1d27]"></div>
      <Meteors/>
      <div className="absolute w-[400px] h-[400px] bg-[#1a1b26] rounded-full blur-[120px] opacity-50 top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#20212e] rounded-full blur-[150px] opacity-40 bottom-[-150px] right-[-150px]"></div>
      <div className="absolute w-[250px] h-[250px] bg-[#10121b] rounded-full blur-[80px] opacity-60 bottom-[100px] left-[200px]"></div>

      <div className="relative z-10 flex flex-col bg-[#000000]/80 shadow-2xl p-8 rounded-xl text-white w-[400px] space-y-5 border border-gray-800 backdrop-blur-md">
        <h1 className="text-white font-light text-3xl text-center">Sign-Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3 mb-5">
            <Label className="font-light">Name</Label>
            <Input placeholder="Informe seu nome" value={dataUser.name} onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })} className="bg-[#1a1b26] border-gray-700 text-white" />
          </div>
          <div className="flex flex-col space-y-3 mb-5">
            <Label className="font-light">E-mail</Label>
            <Input placeholder="Informe seu e-mail" value={dataUser.email} onChange={(e) => setDataUser({...dataUser, email:e.target.value})} className="bg-[#1a1b26] border-gray-700 text-white" />
          </div>
          <div className="flex flex-col space-y-3 mb-5">
            <Label className="font-light">Password</Label>
            <Input type="password" placeholder="Informe sua senha" value={dataUser.password} onChange={(e) => setDataUser({...dataUser, password:e.target.value})} className="bg-[#1a1b26] border-gray-700 text-white" />
          </div>
            <Button variant="ghost" className="text-black font-light text-[18px] w-full bg-white px-6 hover:bg-gray-200 transition-all">
            Create
          </Button>
          <div className="flex mt-3 underline">
            <Link href="/sign-in" className="mx-auto">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
