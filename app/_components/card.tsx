import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import ButtonModal from "./button-modal";

export default function CardModal(){

    return(
        <div>
                        <Card className="bg-black border-none text-white shadow-md">
                            <CardHeader>
                                <CardTitle>Bora pra Itália</CardTitle>
                                <CardDescription>
                                    Itália é um ótimo lugar para visitar!
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <div className="flex gap-4 text-center">
                                    <div className="flex gap-1 justify-center items-center">
                                        <Heart className="h-5 w-5 fill-red-500 text-red-500"></Heart>
                                        <p>10</p>
                                    </div>
                                    <div className="flex justifycenter items-center">
                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500"></Star>
                                    </div>
                                </div>
                                <ButtonModal></ButtonModal>
                            </CardFooter>
                        </Card>

        </div>
    )
}