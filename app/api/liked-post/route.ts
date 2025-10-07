'use server'

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
    try {
        const data = await req.formData()
        const userId = data.get("userId") as string
        const postId = data.get("postId") as string

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: { increment: 1 },
                userLikes: { push: userId }
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error liking post:", error);
        return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.formData()
        const userId =data.get("userId") as string
        const postId = data.get("postId") as string
        // Remove o userId do array userLikes
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: { decrement: 1 },
                userLikes: {
                    set: ([] as string[]) // gostaria o userId que curtiu
                        .concat(
                            (await prisma.post.findUnique({
                                where: { id: postId },
                                select: { userLikes: true }
                            }))?.userLikes.filter((id: string) => id !== userId) || []
                        )
                        .filter((id, index, self) => self.indexOf(id) === index)
                }
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error unliking post:", error);
        return NextResponse.json({ error: "Failed to unlike post" }, { status: 500 });
    }
}
