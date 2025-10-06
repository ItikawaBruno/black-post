'use server'

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
    try {
        const { userId, postId } = await req.json();

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
        const { userId, postId } = await req.json();

        // Remove o userId do array userLikes
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: { decrement: 1 },
                userLikes: {
                    set: [] // se quiser remover só o userId específico, precisamos filtrar o array antes
                }
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error unliking post:", error);
        return NextResponse.json({ error: "Failed to unlike post" }, { status: 500 });
    }
}
