import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function ButtonModal({description, title}: {description?: string, title?: string})   {
    return(
        <div className="ml-auto">
            <Dialog>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">Abrir</Button>
                    </DialogTrigger>
                <DialogContent className="bg-black text-white border-none shadow-md">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}