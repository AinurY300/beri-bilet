import { TicketSearchForm } from "@/components/forms/TicketSearchForm"
import { Separator } from "@/components/ui/separator"
import { FlightSearchParams } from "@/components/forms/TicketSearchForm"
import { fetchPricesForDates } from "@/lib/travelpayouts"
import { FlightCard } from "@/components/flightCard"
import { nanoid } from "nanoid"

export default async function Home({ searchParams }: { searchParams: FlightSearchParams }) {
  const flights = await fetchPricesForDates(searchParams)
  

  // console.log(data)

  return (
    <div className="container grid grid-cols-12">
      <div className="col-span-full">
        <TicketSearchForm />
      </div>
      <div className="col-span-4"></div>
      <div className="col-span-8 grid gap-2 py-2">
        {flights.map(flight => (
          <FlightCard key={nanoid()} flightData={flight} />
        ))}
      </div>
    </div>
  )
}
