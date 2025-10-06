import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req:Request){

    const data = await req.formData()
    const title = data.get("title") as string
    const description = data.get("description") as string
    const userId = data.get("userId") as string
    const post = await prisma.post.create({
        data:{
            title,
            description,
            userId,
            likes: 0
        }
    })

    return NextResponse.json(post)
}