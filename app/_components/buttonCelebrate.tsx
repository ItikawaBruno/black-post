'use client'
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"


export default function ButtonCelebrate(){
    
        const handleClick = () => {
        const end = Date.now() + 3 * 1000 // 3 seconds
        const colors = ["#fff"]
        const frame = () => {
          if (Date.now() > end) return
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          })
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          })
          requestAnimationFrame(frame)
        }
        frame()
      }

    return(
        <Button onClick={handleClick} className="text-white font-bold py-2 px-4 rounded-full z-50">
            Celebrate
        </Button>
    )
}