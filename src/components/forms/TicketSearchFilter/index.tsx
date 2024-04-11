"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export type FilterSearchParams = {
  direct?: boolean
  sorting?: "price" | "route"
}

export function TicketSearchFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [direct, setDirect] = useState(false)
  const [sorting, setSorting] = useState("price")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Switch
          id="direct-mode"
          checked={direct}
          onCheckedChange={e => {
            setDirect(e)
            router.push(pathname + "?" + createQueryString("direct", String(e)))
          }}
        />
        <Label htmlFor="direct-mode">Без пересадок</Label>
      </div>
      <Tabs
        value={sorting}
        onValueChange={e => {
          setSorting(e)
          router.push(pathname + "?" + createQueryString("sorting", String(e)))
        }}
      >
        <TabsList>
          <TabsTrigger value="price">По цене</TabsTrigger>
          <TabsTrigger value="route">По популярности</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
