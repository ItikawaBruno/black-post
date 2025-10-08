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
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import CreateToast from "./create-toast"


export default function Modal() {
  const params = useParams()
  const userId = params.id as string

  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [dataPost, setDataPost] = useState({
    title: "",
    description: "",
    userId
  })

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])


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

      const responseData = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit error - set cooldown timer
          const retryAfter = responseData.retryAfter || 600 // 10 minutes default
          setCooldown(retryAfter)
          toast.dismiss()
          toast.error(responseData.error || "Too many posts! Please wait before creating another.")
        } else {
          toast.dismiss()
          toast.error(responseData.error || "Error creating post!")
        }
        console.error("Server error:", response.statusText)
        return
      }

      // ✅ Limpa os campos e fecha o modal
      setDataPost({ title: "", description: "", userId })
      setOpen(false)
      toast.dismiss()
      toast.success("Post created successfully!")
      router.refresh() // ✅ Atualiza a página para mostrar o novo post
    } catch (error) {
      toast.dismiss()
      toast.error("Network error! Please try again.")
      console.error("Network error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <CreateToast></CreateToast>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          <Plus className="text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black text-white border-none shadow-md">
        <DialogHeader>
          <DialogTitle>
            Create your <span className="font-extrabold text-[#5e5589]">Black Post</span>
          </DialogTitle>
          {cooldown > 0 && (
            <p className="text-sm text-red-400 mt-2">
              Rate limit active. You can create another post in {Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, '0')}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Limit: 3 posts per 10 minutes
          </p>
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
              disabled={loading || !dataPost.title.trim() || !dataPost.description.trim() || cooldown > 0}
              >
              {loading 
                ? "Creating..." 
                : cooldown > 0 
                  ? `Wait ${Math.floor(cooldown / 60)}:${(cooldown % 60).toString().padStart(2, '0')}`
                  : "Create"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
              </>
  )
}
