import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// PATCH -> add favorite
export async function PATCH(req:Request){
    try{
        const data = await req.formData()
        const userId = data.get("userId") as string
        const postId = data.get("postId") as string

        if(!userId || !postId){
            return NextResponse.json({ error: "Missing userId or postId" }, { status: 400 })
        }

        const post = await prisma.post.findUnique({ where: { id: postId }, select: { userFavorites: true } })
        if(!post){
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        if(post.userFavorites && post.userFavorites.includes(userId)){
            return NextResponse.json({ post, changed: false })
        }

        const updated = await prisma.post.update({
            where: { id: postId },
            data: { userFavorites: { set: [...(post.userFavorites ?? []), userId] } }
        })

        return NextResponse.json({ post: updated, changed: true })
    }catch(e){
        console.error("Error favoriting post:", e)
        return NextResponse.json({ error: "Failed to favorite post" }, { status: 500 })
    }
}

// PUT -> remove favorite
export async function PUT(req:Request){
    try{
        const data = await req.formData()
        const userId = data.get("userId") as string
        const postId = data.get("postId") as string

        if(!userId || !postId){
            return NextResponse.json({ error: "Missing userId or postId" }, { status: 400 })
        }

        const post = await prisma.post.findUnique({ where: { id: postId }, select: { userFavorites: true } })
        if(!post){
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        if(!post.userFavorites || !post.userFavorites.includes(userId)){
            return NextResponse.json({ post, changed: false })
        }

        const newFavorites = post.userFavorites.filter(id => id !== userId)

        const updated = await prisma.post.update({
            where: { id: postId },
            data: { userFavorites: { set: newFavorites } }
        })

        return NextResponse.json({ post: updated, changed: true })
    }catch(e){
        console.error("Error unfavoriting post:", e)
        return NextResponse.json({ error: "Failed to unfavorite post" }, { status: 500 })
    }
}