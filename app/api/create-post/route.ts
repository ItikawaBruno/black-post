import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

// Rate limiting: máximo 3 posts por 10 minutos
const POST_LIMIT = 3
const TIME_WINDOW_MINUTES = 10

export async function POST(req:Request){
    try {
        const data = await req.formData()
        const title = data.get("title") as string
        const description = data.get("description") as string
        const userId = data.get("userId") as string

        if (!title?.trim() || !description?.trim() || !userId) {
            return NextResponse.json(
                { error: "Title, description and userId are required" }, 
                { status: 400 }
            )
        }

        // Verificar rate limiting
        const timeLimit = new Date(Date.now() - TIME_WINDOW_MINUTES * 60 * 1000)
        
        const recentPosts = await prisma.post.count({
            where: {
                userId: userId,
                createdAt: {
                    gte: timeLimit
                }
            }
        })

        if (recentPosts >= POST_LIMIT) {
            return NextResponse.json(
                { 
                    error: `Rate limit exceeded. You can only create ${POST_LIMIT} posts every ${TIME_WINDOW_MINUTES} minutes.`,
                    retryAfter: TIME_WINDOW_MINUTES * 60 // seconds
                }, 
                { status: 429 }
            )
        }

        const post = await prisma.post.create({
            data:{
                title: title.trim(),
                description: description.trim(),
                userId,
                likes: 0
            }
        })

        revalidatePath('/main/[id]', 'page')
        return NextResponse.json(post)
        
    } catch (error) {
        console.error("Error creating post:", error)
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        )
    }
}