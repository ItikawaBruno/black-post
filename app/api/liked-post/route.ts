"use server"

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH -> add like
export async function PATCH(req: Request) {
    try {
        const data = await req.formData();
        const userId = data.get("userId") as string;
        const postId = data.get("postId") as string;

        if (!userId || !postId) {
            return NextResponse.json({ error: "Missing userId or postId" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { likes: true, userLikes: true },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // If user already liked -> no-op
        if (post.userLikes && post.userLikes.includes(userId)) {
            return NextResponse.json({ post, changed: false });
        }

        const updated = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: { set: (post.likes ?? 0) + 1 },
                userLikes: { set: [...(post.userLikes ?? []), userId] },
            },
        });

        return NextResponse.json({ post: updated, changed: true });
    } catch (error) {
        console.error("Error liking post:", error);
        return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
    }
}

// PUT -> remove like
export async function PUT(req: Request) {
    try {
        const data = await req.formData();
        const userId = data.get("userId") as string;
        const postId = data.get("postId") as string;

        if (!userId || !postId) {
            return NextResponse.json({ error: "Missing userId or postId" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { likes: true, userLikes: true },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // If user hasn't liked -> no-op
        if (!post.userLikes || !post.userLikes.includes(userId)) {
            return NextResponse.json({ post, changed: false });
        }

        const newUserLikes = post.userLikes.filter((id) => id !== userId);
        const newLikes = Math.max((post.likes ?? 0) - 1, 0);

        const updated = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: { set: newLikes },
                userLikes: { set: newUserLikes },
            },
        });

        return NextResponse.json({ post: updated, changed: true });
    } catch (error) {
        console.error("Error unliking post:", error);
        return NextResponse.json({ error: "Failed to unlike post" }, { status: 500 });
    }
}
