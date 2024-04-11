"use client"

import { ChevronDownIcon, PlusIcon, MinusIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export type PassengersDropdownButtonProps = {
  adults?: number
  children?: number
  infant?: number
  onChange?(passengersCount: {
    adults: PassengersDropdownButtonProps["adults"]
    children: PassengersDropdownButtonProps["children"]
    infant: PassengersDropdownButtonProps["infant"]
  }): void
}

export function PassengersDropdownButton({
  adults = 1,
  children = 0,
  infant = 0,
  onChange
}: PassengersDropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [adultsCount, setAdultsCount] = useState(adults)
  const [childrenCount, setChildrenCount] = useState(children)
  const [infantCount, setInfantCount] = useState(infant)

  useEffect(() => {
    onChange?.({
      adults: adultsCount,
      children: childrenCount,
      infant: infantCount
    })
  }, [adultsCount, childrenCount, infantCount, onChange])

  function declinePassenger(): string {
    const count = infantCount + childrenCount + adultsCount
    if (count % 100 >= 11 && count % 100 <= 14) return `${count} пассажиров`
    if (count % 10 === 1) return `${count} пассажир`
    if (count % 10 >= 2 && count % 10 <= 4) return `${count} пассажира`
    return `${count} пассажиров`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <div>{declinePassenger()}</div>
          <ChevronDownIcon
            className={cn("ml-2 h-4 w-4 transition-transform", isOpen && "rotate-180")}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Количество пассажиров</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid gap-1 p-2">
          <PassengerCounter
            value={adultsCount}
            onChange={setAdultsCount}
            minValue={1}
            maxValue={9 - childrenCount - infantCount}
            title="Взрослые"
            label="от 12 лет и старше"
          />
          <PassengerCounter
            value={childrenCount}
            onChange={setChildrenCount}
            minValue={0}
            maxValue={9 - adultsCount - infantCount}
            title="Дети"
            label="от 2 до 11 лет"
          />
          <PassengerCounter
            value={infantCount}
            onChange={setInfantCount}
            minValue={0}
            maxValue={Math.min(adultsCount, 9 - adultsCount - childrenCount) || adultsCount}
            title="Младенцы"
            label="до 2 лет, без места"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PassengerCounter({
  value = 0,
  title,
  label,
  minValue,
  maxValue,
  onChange
}: {
  title: string
  label: string
  value?: number
  minValue?: number
  maxValue?: number
  onChange?: (count: number) => void
}) {
  const [count, setCount] = useState<number>(value)
  useEffect(() => {
    if (minValue && count < minValue) setCount(minValue)
    if (maxValue && count > maxValue) setCount(maxValue)
    onChange?.(count)
  }, [count, onChange, setCount, minValue, maxValue])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-sm font-medium">{title}</div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="ml-4 flex select-none items-center">
        <Button
          disabled={count === 0 || count === minValue}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCount(count - 1)}
        >
          <MinusIcon className="h-4 w-4 cursor-pointer" />
        </Button>
        <div className="w-8 text-center font-medium">{count}</div>
        <Button
          disabled={count === maxValue}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCount(count + 1)}
        >
          <PlusIcon className="h-4 w-4 cursor-pointer" />
        </Button>
      </div>
    </div>
  )
}
