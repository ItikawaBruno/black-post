import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ButtonModal(){
    return(
        <div className="ml-auto">
            <Dialog>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">Abrir</Button>
                    </DialogTrigger>
                <DialogContent className="bg-black text-white border-none shadow-md">
                    <DialogHeader>
                        <DialogTitle>Titulo</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}