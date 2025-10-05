'use client'
import { Button } from "@/components/ui/button"
import { LogOutIcon, Plus } from "lucide-react"
import Modal from "../../_components/modal"
import Image from "next/image"
import CardModal from "../../_components/card"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import LogoutButton from "../../_components/logout-button"
import prisma from "@/lib/prisma"
import { useState } from "react"


export default async function MainPage(){

    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
        redirect('/sign-in')
    }

        type dPost = {
        title:string,
        description:string,
        image:string,
    }

    const [listPost, setListPost ] = useState([])
    const [ dataPost, setDataPost ] = useState<dPost>({
        title:"",
        description:"",
        image:"",
    })

    
    async function handleCreate(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        await prisma.post.create({
            data:{
                title:dataPost.title,
                description:dataPost.description,
                image:dataPost.image,
                userId:"",
                likes:0,
            }
        })
    }


    return(
        <div className="bg-[#1c1b25] min-h-full w-full">
            <header className="w-full flex h-fit justify-center px-4 py-4 items-center mb-8  p-2">
                <div className="w-full flex justify-between items-center bg-[#000000] p-3 rounded-md shadow-md">

                <h1 className="text-white text-3xl font-extrabold">Black Post</h1>
                <div className="flex gap-4">
                    <Modal dataPost={dataPost} setDataPost={setDataPost}></Modal>
                    <LogoutButton></LogoutButton>
                </div>
                </div>
            </header>
            <main className="text-white space-y-6">
                <div className="space-y-3">
                    <h2 className="ml-6 text-3xl font-extralight">Most Popular</h2>
                    <section className="grid grid-cols-4 ml-4 gap-2 p-2">
                        {
                            listPost.map(() => (
                                <CardModal />
                            ))
                        }
                    </section>
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-extralight ml-6">Favorites</h2>
                    <section className="grid grid-cols-4 ml-4 gap-2 p-2">
                        <CardModal></CardModal>
                        <CardModal></CardModal>
                        <CardModal></CardModal>
                        <CardModal></CardModal>
                    </section>
                </div>
                <div className="space-y-3">
                    <h2 className="ml-6 font-extralight text-3xl">My Posts</h2>
                    <section className="grid grid-cols-4 ml-4 gap-2 p-2">
                        
                    </section>
                </div>
            </main>
        </div>
    )
} 