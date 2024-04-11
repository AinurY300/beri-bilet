import { TicketSearchForm } from "@/components/forms/TicketSearchForm"
import { FlightSearchParams } from "@/components/forms/TicketSearchForm"
import { fetchPricesForDates } from "@/lib/travelpayouts"
import { FlightCard } from "@/components/flightCard"
import { nanoid } from "nanoid"
import { TicketSearchFilter } from "@/components/forms/TicketSearchFilter"
import { TicketSearchPagination } from "@/components/forms/TicketSearchPagination"
import { FilterSearchParams } from "@/components/forms/TicketSearchFilter"

export default async function Home({
  searchParams
}: {
  searchParams: FlightSearchParams & FilterSearchParams
}) {
  const flights = await fetchPricesForDates(searchParams)
  return (
    <div className="container grid gap-4 pb-4">
      <TicketSearchForm />
      <TicketSearchFilter />
      <div className="grid gap-2 lg:grid-cols-2">
        {flights.map(flight => (
          <FlightCard key={nanoid()} flightData={flight} />
        ))}
      </div>
    </div>
  )
}
