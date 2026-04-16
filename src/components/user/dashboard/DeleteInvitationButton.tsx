"use client"

import * as React from "react"
import { toast } from "sonner"
import { Trash, Loader2, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteInvitation } from "@/lib/actions/invitation"

interface DeleteInvitationButtonProps {
  id: string
  title: string
}

export function DeleteInvitationButton({ id, title }: DeleteInvitationButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteInvitation(id)
      if (result.success) {
        toast.success("Undangan berhasil dihapus")
        setIsOpen(false)
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal menghapus undangan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex-1 rounded-xl h-10 text-xs gap-2"
        >
          <Trash className="size-3.5" /> Hapus
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] rounded-3xl border-[#E5E0D8] bg-white p-8">
        <DialogHeader className="space-y-4 text-center items-center">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertTriangle className="size-8 text-[#B95C5C]" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-xl font-bold text-[#2C2C2C]">
              Hapus Undangan?
            </DialogTitle>
            <DialogDescription className="text-[#6B6B6B]">
              Anda akan menghapus undangan <span className="font-bold text-[#2C2C2C]">"{title}"</span>. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-col gap-3 mt-6">
          <Button
            variant="destructive"
            className="w-full h-12 font-bold text-sm"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin mr-2" />
            ) : (
              "Ya, Hapus Sekarang"
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full h-12 text-[#6B6B6B] hover:bg-[#F8F5F0]"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Batalkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
