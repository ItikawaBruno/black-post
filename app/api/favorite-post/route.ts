import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function PATCH(req:Request){
    const data = await req.formData()
    const userId = data.get("userId") as string
    const postId = data.get("postId") as string
    const updatedPost = await prisma.post.update({
        where:{
            id:postId
        },
        data:{
            userFavorites:{
                push: userId
            }
        }
    })
    return NextResponse.json(updatedPost)
}

export async function PUT(req:Request){
    const data = await req.formData()
    const userId = data.get("userId") as string
    const postId = data.get("postId") as string

    const postFavorites = await prisma.post.findUnique({
        where:{
            id: postId
        },
        select:{
            userFavorites: true
        }
    })

    const novaLista = postFavorites?.userFavorites.filter((id) => id !== userId ).concat([])

    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            userFavorites: {
               set:  ([] as string[]) // gostaria o userId que curtiu
                        .concat(
                            (await prisma.post.findUnique({
                                where: { id: postId },
                                select: { userFavorites: true }
                            }))?.userFavorites.filter((id: string) => id !== userId) || []
                        )
                        .filter((id, index, self) => self.indexOf(id) === index)
            }
        }
    })
    return NextResponse.json(post)
}