'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Star } from "lucide-react";
import ButtonModal from "./button-modal";
import { useState } from "react";


export default function CardModal({ description, title, likes, userId, postId }: { description?: string, title?: string, likes?: number, userId?: string, postId?: string }) {

    const [isLiked, setIsLiked ] = useState(false);
    const [ countLikes, setCountLikes ] = useState(likes ?? 0)
    const [ isStars, setIsStars ] = useState(false)

    async function toggleLike() {
        setIsLiked(!isLiked);
        if(!isLiked){
            setCountLikes(countLikes + 1)
            const response = await fetch("/api/liked-post", {
                method: "PATCH",
                body:JSON.stringify({
                    userId,
                    postId
                }),
            })
            if(!response.ok){
                console.error("Server error:", response.statusText)
                alert("Error liking post!")
                return
            }
            return response.json()
        }else{
            setCountLikes(countLikes - 1)
        }
    }

    function toggleStar(){
        setIsStars(!isStars);
    }



    return(
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
                                        <Star className={`h-5 w-5. cursor-pointer ${isStars? 'fill-yellow-500 text-yellow-500' : ''}`} onClick={toggleStar}></Star>
                                    </div>
                                </div>
                                <ButtonModal description={description ?? undefined} title={title ?? undefined}/>
                            </CardFooter>
                        </Card>

        </div>
    )
}