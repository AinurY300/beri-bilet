"use client"

import { PassengersDropdownButton } from "./PassengersDropdownButton"
import { RotateCcwIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CityAutocomplete, type CityAutocompleteListItem } from "./CityAutocomplete"
import { DatePicker } from "./DatePicker"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { format } from "date-fns"

export type FlightSearchParams = {
  origin?: CityAutocompleteListItem["code"]
  destination?: CityAutocompleteListItem["code"]
  departureDate?: string
  returnDate?: string
  adults: number
  children: number
  infants: number
}

export function TicketSearchForm() {
  const [origin, setOrigin] = useState<CityAutocompleteListItem>()
  const [destination, setDestination] = useState<CityAutocompleteListItem>()
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [adults, setAdults] = useState<FlightSearchParams["adults"]>(1)
  const [children, setChildren] = useState<FlightSearchParams["children"]>(0)
  const [infants, setInfants] = useState<FlightSearchParams["infants"]>(0)

  const pathname = usePathname()
  const router = useRouter()

  function submit() {
    const params: FlightSearchParams = {
      origin: origin?.code,
      destination: destination?.code,
      departureDate: departureDate && format(departureDate, "yyyy-MM-dd"),
      returnDate: returnDate && format(returnDate, "yyyy-MM-dd"),
      adults: adults,
      children: children,
      infants: infants
    }

    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join("&")

    router.push(`${pathname}?${queryString}`)
  }

  function reset() {
    setOrigin(undefined)
    setDestination(undefined)
    setDepartureDate(undefined)
    setReturnDate(undefined)
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Поиск дешевых авиабилетов</CardTitle>
        <CardDescription>Помогаем вам экономить</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-start gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Откуда?</Label>
            <CityAutocomplete
              value={origin}
              placeholder="Томск"
              onSelect={e => setOrigin(e || undefined)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Куда?</Label>
            <CityAutocomplete
              value={destination}
              placeholder="Без разницы"
              onSelect={e => setDestination(e || undefined)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Когда?</Label>
            <DatePicker
              placeholder="Когда угодно"
              selected={departureDate}
              onSelected={date => {
                if (returnDate && date >= returnDate) setReturnDate(undefined)
                setDepartureDate(date)
              }}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Когда обратно?</Label>
            <DatePicker
              placeholder="Никогда"
              minDate={departureDate}
              selected={returnDate}
              onSelected={setReturnDate}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4 max-sm:grid max-sm:grid-cols-2">
        <PassengersDropdownButton
          onChange={passengers => {
            setAdults(passengers.adults || 1)
            setChildren(passengers.children || 0)
            setInfants(passengers.infant || 0)
          }}
        />
        <Button
          size="icon"
          variant="outline"
          className="ml-auto"
          type="reset"
          onClick={reset}
          disabled={!origin && !destination && !departureDate && !returnDate}
        >
          <RotateCcwIcon className="h-4 w-4" />
        </Button>
        <Button
          className="col-span-full transition-all max-sm:col-span-full"
          disabled={!origin && !destination}
          type="submit"
          onClick={submit}
        >
          Найти билеты
        </Button>
      </CardFooter>
    </Card>
  )
}
