'use server'
import { Button } from "@/components/ui/button"
import { LogOutIcon, Plus } from "lucide-react"
import Modal from "../../_components/modal"
import Image from "next/image"
import CardModal from "../../_components/card"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

import prisma from "@/lib/prisma"
import Header from "@/app/_components/header"
import ButtonCelebrate from "@/app/_components/buttonCelebrate"



export default async function MainPage(){

    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
        redirect('/sign-in')
    }

    const dbDataPosts = await prisma.post.findMany({
        where:{
            userId: session.user.id
        }
    })

    const dbDataFavoritesPost = await prisma.post.findMany({
        where:{
            userFavorites:{
                has:session.user.id
            }
        }
    })


    const dbDataMostPopular = await prisma.post.findMany({
        orderBy:{
            likes: 'desc'
        },
        take: 10
    })



    return(
        <div className="bg-[#1c1b25] min-h-full w-full">
            <Header></Header>
            <main className="text-white space-y-6">
                <div className="space-y-3">
                    <h2 className="ml-6 text-3xl font-extralight">Most Popular</h2>
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ml-4 gap-2 p-2">
                        {
                            dbDataMostPopular.map((post) => (
                                <CardModal
                                postIdLikes={post.userLikes ?? []}
                                key={post.id}
                                title={post.title ?? ""}
                                description={post.description ?? ""}
                                likes={post.likes ?? 0}
                                userId={session.user.id}
                                postId={post.id ?? ""}
                                postIdFavorites={post.userFavorites ?? []}
                                />
                            ))}
                    </section>
                </div>
                <div className="space-y-3">
                    <h2 className="ml-6 font-extralight text-3xl">Favorites</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ml-4 gap-2 p-2">
                        {
                            dbDataFavoritesPost.map((post) => (
                                <CardModal
                                postIdLikes={post.userLikes ?? []}
                                key={post.id}
                                title={post.title ?? ""}
                                description={post.description ?? ""}
                                likes={post.likes ?? 0}
                                userId={session.user.id}
                                postId={post.id ?? ""}
                                postIdFavorites={post.userFavorites ?? []}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-3">
                    <h2 className="ml-6 font-extralight text-3xl">My Posts</h2>
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ml-4 gap-2 p-2">
                        {
                            dbDataPosts.map((post) => (
                                <CardModal
                                postIdLikes={post.userLikes ?? []}
                                key={post.id}
                                title={post.title ?? ""}
                                description={post.description ?? ""}
                                likes={post.likes ?? 0}
                                userId={session.user.id}
                                postId={post.id ?? ""}
                                postIdFavorites={post.userFavorites ?? []}
                                />
                            ))
                        }
                    </section>
                </div>
            </main>
        </div>
    )
} 