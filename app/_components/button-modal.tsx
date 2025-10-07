// ...existing code...
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
// ...existing code...

export default function ButtonModal({description, title}: {description?: string, title?: string})   {
    const [open, setOpen] = useState(false)

    return(
        <div className="ml-auto">
            <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">Abrir</Button>
                    </DialogTrigger>

                {/* overlay opaco quando o modal está aberto */}
                {open && (
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"/>
                )}

                <DialogContent className="bg-black text-white border-none shadow-md z-50">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
// ...existing code...