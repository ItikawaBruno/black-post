'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Heart, Star } from "lucide-react"
import ButtonModal from "./button-modal"
import { useRouter } from 'next/navigation'

type Props = {
    description?: string
    title?: string
    likes?: number
    userId?: string
    postId?: string
    postIdLikes?: string[]
    postIdFavorites?: string[]
}

export default function CardModal({ description, title, likes, userId, postId, postIdLikes, postIdFavorites }: Props) {
    const [isLiked, setIsLiked] = useState(false)
    const [countLikes, setCountLikes] = useState<number>(likes ?? 0)
    const [isStars, setIsStars] = useState(false)
    const [pendingLike, setPendingLike] = useState(false)
    const [pendingStar, setPendingStar] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!userId) {
            setIsLiked(false)
            setIsStars(false)
            return
        }

        // Only show as liked if current user's ID is in the likes array
        setIsLiked(!!postIdLikes && postIdLikes.includes(userId))
        // Only show as starred if current user's ID is in the favorites array  
        setIsStars(!!postIdFavorites && postIdFavorites.includes(userId))
    }, [postIdLikes, postIdFavorites, userId])

    useEffect(() => {
        setCountLikes(likes ?? 0)
    }, [likes])

    async function toggleLike() {
        if (pendingLike) return
        setPendingLike(true)
        const data = new FormData()
        data.append('userId', userId ?? '')
        data.append('postId', postId ?? '')

        try {
            const res = await fetch('/api/liked-post', { method: isLiked ? 'PUT' : 'PATCH', body: data })
            if (!res.ok) {
                console.error('Server error:', res.statusText)
                alert(isLiked ? 'Error unliking post!' : 'Error liking post!')
                setPendingLike(false)
                return
            }
            const json = await res.json()
            const changed = json?.changed ?? false
            if (changed) {
                setIsLiked(!isLiked)
                setCountLikes((prev) => Math.max(0, prev + (isLiked ? -1 : 1)))
            }
            setPendingLike(false)
            router.refresh()
            return json
        } catch (e) {
            console.error('Error toggling like:', e)
            setPendingLike(false)
        }
    }

    async function toggleStar() {
        if (pendingStar) return
        setPendingStar(true)
        const data = new FormData()
        data.append('userId', userId ?? '')
        data.append('postId', postId ?? '')

        try {
            const res = await fetch('/api/favorite-post', { method: isStars ? 'PUT' : 'PATCH', body: data })
            if (!res.ok) {
                console.error('Server error:', res.statusText)
                setPendingStar(false)
                return
            }
            const json = await res.json()
            const changed = json?.changed ?? false
            if (changed) setIsStars(!isStars)
            setPendingStar(false)
            router.refresh()
            return json
        } catch (e) {
            console.error('Error toggling favorite:', e)
            setPendingStar(false)
        }
    }

    return (
        <div>
            <Card className="bg-black border-none text-white shadow-md">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className="flex gap-4 text-center">
                        <div className="flex gap-1 justify-center items-center">
                            <Heart
                                className={`h-5 w-5 cursor-pointer ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                                onClick={toggleLike}
                            />
                            <p>{countLikes}</p>
                        </div>
                        <div className="flex gap-1 justify-center items-center">
                            <Star
                                className={`h-5 w-5 cursor-pointer ${isStars ? 'fill-yellow-500 text-yellow-500' : ''}`}
                                onClick={toggleStar}
                            />
                        </div>
                    </div>
                    <ButtonModal description={description ?? undefined} title={title ?? undefined} />
                </CardFooter>
            </Card>
        </div>
    )
}