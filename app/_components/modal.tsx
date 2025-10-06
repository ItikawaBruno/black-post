'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useParams } from "next/navigation"


export default function Modal() {
  const params = useParams()
  const userId = params.id as string

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataPost, setDataPost] = useState({
    title: "",
    description: "",
    userId
  })


  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append("title", dataPost.title)
      data.append("description", dataPost.description)
      data.append("userId", dataPost.userId)

      const response = await fetch("/api/create-post", {
        method: "POST",
        body: data
      })

      if (!response.ok) {
        console.error("Server error:", response.statusText)
        alert("Error creating post!")
        return
      }

      // ✅ Espera a resposta antes de fechar
      await response.json()

      // ✅ Limpa os campos e fecha o modal
      setDataPost({ title: "", description: "", userId })
      setOpen(false)

    } catch (error) {
      console.error("Network error:", error)
      alert("Network error!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          <Plus className="text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black text-white border-none shadow-md">
        <DialogHeader>
          <DialogTitle>
            Create your <span className="font-bold text-[#403965]">Black Post</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreate}>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title of post..."
                className="text-white border-none bg-[#373346]"
                value={dataPost.title}
                onChange={(e) => setDataPost({ ...dataPost, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description of post..."
                className="text-white border-none bg-[#373346]"
                value={dataPost.description}
                onChange={(e) => setDataPost({ ...dataPost, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={loading || !dataPost.title.trim() || !dataPost.description.trim()}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
