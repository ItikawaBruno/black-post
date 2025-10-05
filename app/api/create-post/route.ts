import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req:Request){
    const body = await req.json()
    const { title, description, image } = body

    const post = await prisma.post.create({
        data:{
            title,
            description,
            image,
            userId:"",
            likes:0
        }
    })

    return NextResponse.json(post)
}