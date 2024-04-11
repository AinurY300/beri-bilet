import type { Flight } from "@/lib/travelpayouts"
import type { Cites } from "@/types/travelpayouts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { format, formatDuration } from "date-fns"
import { ru } from "date-fns/locale"
import Link from "next/link"
// import CitesJson from "../JSON/cites.json"

const dateString: string = "2024-04-23T11:35:00+02:00"
// const date: Date = new Date(dateString)
const dateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  hour: "numeric",
  minute: "numeric"
}

function getFlightDates(flight: Flight): [string, string, string | undefined, string | null] {
  const formatDate = (date: Date) => format(date, "d MMMM 'в' HH:mm", { locale: ru })
  const departureDate = formatDate(new Date(flight.departure_at))
  const returnDate = flight.return_at ? formatDate(new Date(flight.return_at)) : null
  const departureBackDate = formatDate(
    new Date(new Date(flight.departure_at).getTime() + flight.duration * 60000)
  )
  const returnBackDate = flight.return_at
    ? formatDate(new Date(new Date(flight.return_at)!.getTime() + flight.duration_back * 60000))
    : null
  return [departureDate, departureBackDate, returnDate || undefined, returnBackDate]
}

export async function FlightCard({ flightData }: { flightData: Flight }) {
  const cites: Cites[] = require("../JSON/cites.json")
  const origin = cites.find(c => c.code === flightData.origin)!
  const destination = cites.find(c => c.code === flightData.destination)!
  const [depDate, depBackDate, retDate, retBackDate] = getFlightDates(flightData)
  const transfersCount = flightData.transfers + flightData.return_transfers

  const price = flightData.price.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB"
  })

  return (
    <Card>
      <CardHeader className="py-2">
        <div className="flex items-center justify-between">
          <Image
            width={100}
            height={50}
            src={`http://pics.avs.io/100/50/${flightData.airline}.png.`}
            alt={flightData.airline}
            className="block w-auto"
          />
          <div className="font-semibold">{price}</div>
        </div>
      </CardHeader>
      {/* <Separator /> */}
      <CardContent className="grid gap-2 py-2">
        <div className="flex gap-4">
          <div>
            <div className="text-xl font-medium tracking-tight">{origin.name}</div>
            <div className="text-sm font-medium text-muted-foreground">{depDate}</div>
          </div>
          <div className="flex flex-1 items-center">
            <Separator className="w-auto flex-1" />
            <Badge variant="outline">
              {formatDuration(
                {
                  minutes: flightData.duration_to % 60,
                  hours: Math.floor(flightData.duration_to / 60)
                },
                {
                  format: flightData.duration_to < 60 ? ["minutes"] : ["hours", "minutes"],
                  zero: true,
                  locale: ru
                }
              )}
            </Badge>
            <Separator className="w-auto flex-1" />
          </div>
          <div className="text-end">
            <div className="text-xl font-medium tracking-tight">{destination.name}</div>
            <div className="text-sm font-medium text-muted-foreground">{depBackDate}</div>
          </div>
        </div>

        {retDate && (
          <div className="flex gap-4">
            <div>
              <div className="text-xl font-medium tracking-tight">{destination.name}</div>
              <div className="text-sm font-medium text-muted-foreground">{retDate}</div>
            </div>
            <div className="flex flex-1 items-center">
              <Separator className="w-auto flex-1" />
              <Badge variant="outline">
                {formatDuration(
                  {
                    minutes: flightData.duration_back % 60,
                    hours: Math.floor(flightData.duration_back / 60)
                  },
                  {
                    format: flightData.duration_back < 60 ? ["minutes"] : ["hours", "minutes"],
                    zero: true,
                    locale: ru
                  }
                )}
              </Badge>
              <Separator className="w-auto flex-1" />
            </div>
            <div className="text-end">
              <div className="text-xl font-medium tracking-tight">{origin.name}</div>
              <div className="text-sm font-medium text-muted-foreground">{retBackDate}</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2 pt-2">
        <div className="text-sm font-medium">
          {transfersCount > 0 ? `Количество пересадок: ${transfersCount}` : `Без пересадок`}
        </div>
        <Button asChild className="ml-auto">
          <Link target="_blank" href={`https://www.aviasales.ru${flightData.link}`}>
            Купить
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
