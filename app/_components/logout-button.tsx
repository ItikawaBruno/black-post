// components/LogoutButton.tsx
'use client'
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

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
    <AlertDialog>
      <AlertDialogTrigger className="bg-[#282525] p-2.5 rounded-md hover:bg-red-700 transition-colors">
      <LogOutIcon className="text-white h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-white border-none shadow-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
          you sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription>Click in continue to logout.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
        <Button variant="default" onClick={logout}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
