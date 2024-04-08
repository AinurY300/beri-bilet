import { PlaneIcon } from "lucide-react"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="rounded-md bg-current p-1">
        <PlaneIcon className="text-card" />
      </div>
      <p className="text-lg font-medium">берибилеты.рф</p>
    </Link>
  )
}
