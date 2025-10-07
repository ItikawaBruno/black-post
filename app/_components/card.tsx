'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Star } from "lucide-react";
import ButtonModal from "./button-modal";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CardModal({ description, title, likes, userId, postId, postIdLikes, postIdFavorites }: { description?: string, title?: string, likes?: number, userId?: string, postId?: string, postIdLikes?: string[], postIdFavorites?: string [] }) {

    const [isLiked, setIsLiked] = useState(false);
    const [countLikes, setCountLikes] = useState(likes ?? 0)
    const [isStars, setIsStars] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (postIdLikes?.includes(userId ?? "")) {
            setIsLiked(true);
        }
    }, [postIdLikes, userId]);

    async function toggleLike() {

        const data = new FormData()
        data.append("userId", userId ?? "")
        data.append("postId", postId ?? "")

        if (!isLiked) {
            try {
                const response = await fetch("/api/liked-post", {
                    method: "PATCH",
                    body: data,
                })
                if (!response.ok) {
                    console.error("Server error:", response.statusText)
                    alert("Error liking post!")
                    return
                }
                setCountLikes(countLikes + 1)
                setIsLiked(!isLiked);
                router.refresh()
                return response.json()
            } catch (e) {
                console.log("Error liking post:", e)
            }
        } else {
            try {
                const response = await fetch("/api/liked-post", {
                    method: "PUT",
                    body: data,
                })
                if (!response.ok) {
                    console.log("Server error:", response.statusText)
                    alert("Error unliking post!")
                    return
                }
                setIsLiked(!isLiked)
                setCountLikes(countLikes - 1)
                router.refresh()
                return response.json()
            } catch (e) {
                console.log("Error unliking post:", e)
            }
        }
    }


    useEffect(() => {
        if(postIdFavorites?.includes(userId ?? "")){
            setIsStars(true);
        }
            },[postIdFavorites, userId])
    async function toggleStar() {

        const data = new FormData()
        data.append("userId", userId ?? "")
        data.append("postId", postId ?? "")

        if (!isStars) {
            try{
            const response =  await fetch("/api/favorite-post", {
                method: "PATCH",
                body: data
            })
            if(!response.ok){
                console.log("Server error:", response.statusText)
            }
            setIsStars(!isStars);
            router.refresh()
            }catch(e){
                console.log("Error favoriting post:", e)
            }
            }else{

                try{
                    const response = await fetch("/api/favorite-post", {
                        method: "PUT",
                        body: data
                    })
                    if(!response.ok){
                        console.log("Server error:", response.statusText)
                    }

                    setIsStars(!isStars);
                    router.refresh()
                }catch(e){
                    console.log("Error unfavoriting post:", e)
                }

        }
        }

    


    return (
        <div>
            <Card className="bg-black border-none text-white shadow-md">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className="flex gap-4 text-center">
                        <div className="flex gap-1 justify-center items-center">
                            <Heart className={`h-5 w-5. cursor-pointer ${isLiked ? 'fill-red-500 text-red-500' : ''}`} onClick={toggleLike}></Heart>
                            <p>{countLikes}</p>
                        </div>
                        <div className="flex gap-1 justify-center items-center">
                            <Star className={`h-5 w-5. cursor-pointer ${isStars ? 'fill-yellow-500 text-yellow-500' : ''}`} onClick={toggleStar}></Star>
                        </div>
                    </div>
                    <ButtonModal description={description ?? undefined} title={title ?? undefined} />
                </CardFooter>
            </Card>

        </div>
    )
}