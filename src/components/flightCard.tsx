import type { Flight } from "@/lib/travelpayouts"
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

export function FlightCard({ flightData }: { flightData: Flight }) {
  const price = flightData.price.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB"
  })

  return (
    <Card>
      <CardHeader></CardHeader>
      <Separator />
      <CardContent>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam optio, adipisci cupiditate
        veniam sunt molestias temporibus accusamus provident nesciunt culpa excepturi harum
        voluptate officia explicabo eveniet velit nihil itaque fugit.
      </CardContent>
      <Separator />
      <CardFooter className="justify-between py-2">
        <div className="font-medium">{price}</div>
        <Button>Подробнее</Button>
      </CardFooter>
      <Separator />
      <CardFooter className="grid overflow-x-auto py-2">
        <code>airline: {flightData.airline}</code>
        <code>departure_at: {flightData.departure_at}</code>
        <code>destination: {flightData.destination}</code>
        <code>destination_airport: {flightData.destination_airport}</code>
        <code>duration: {flightData.duration}</code>
        <code>duration_back: {flightData.duration_back}</code>
        <code>duration_to: {flightData.duration_to}</code>
        <code>flight_number: {flightData.flight_number}</code>
        <code>link: {flightData.link}</code>
        <code>origin: {flightData.origin}</code>
        <code>origin_airport: {flightData.origin_airport}</code>
        <code>price: {flightData.price}</code>
        <code>return_transfers: {flightData.return_transfers}</code>
        <code>transfers: {flightData.transfers}</code>
      </CardFooter>
    </Card>
  )
}
