// components/LogoutButton.tsx
'use client'
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <Button onClick={logout} className="cursor-pointer">
      <LogOutIcon className="text-white" />
    </Button>
  )
}
