'use client'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"



export default function Modal(){

    interface ModalProps{
    dataPost:{
        title:string,
        description:string,
        image:string
    }
    setDataPost: React.Dispatch<React.SetStateAction<{
        title:string,
        description:string,
        image:string
    }>>;
}

    type dPost = {
    title:string,
    description:string,
    image:string,
    }
    
    const [listPost, setListPost ] = useState([])
    const [ dataPost, setDataPost ] = useState<dPost>({
        title:"",
        description:"",
        image:"",
    })
        
        async function handleCreate(e:React.FormEvent<HTMLFormElement>){
            e.preventDefault()
            const response = await fetch('/api/create-post',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(dataPost)
            })
            setDataPost({title:"",description:"",image:""})
        }

    
    return(
        <Dialog>
                        <form onSubmit={handleCreate}>
                            <DialogTrigger asChild>
                                <Button className="cursor-pointer"><Plus className="text-white"></Plus></Button>
                            </DialogTrigger>
                            <DialogContent className="bg-black text-white border-none shadow-md">
                                <DialogHeader>
                                    <DialogTitle>Create your <span className="font-bold text-[#403965]">Black Post</span></DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col">
                                    <div className="flex flex-col space-y-2 mb-4">
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="title" placeholder="Title of post..." className="text-black border-none bg-[#373346]" value={dataPost.title} onChange={(e) => setDataPost({...dataPost, title:e.target.value})}></Input>
                                    </div>
                                    <div className="flex flex-col space-y-2 mb-4">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" placeholder="Description of post..." className="text-white border-none bg-[#373346]" value={dataPost.description} onChange={(e) => setDataPost({...dataPost, description:e.target.value})}></Textarea>
                                    </div>
                                    <div className="flex flex-col space-y-2 mb-4">
                                        <Label htmlFor="picture">Picture</Label>
                                        <Input id="picture" type="file" className="text-white border-none bg-[#373346]" value={dataPost.image} onChange={(e) => setDataPost({...dataPost, image:e.target.value})}></Input>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="destructive">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Create</Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
    )
}