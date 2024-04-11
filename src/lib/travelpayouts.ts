import type { FlightSearchParams } from "@/components/forms/TicketSearchForm"
import type { FilterSearchParams } from "@/components/forms/TicketSearchFilter"

export type Flight = {
  flight_number: string
  link: string
  origin_airport: string
  destination_airport: string
  departure_at: string
  return_at?: string
  airline: string
  destination: string
  origin: string
  price: number
  return_transfers: number
  duration: number
  duration_to: number
  duration_back: number
  transfers: number
}

type ApiResponse = {
  data: Flight[]
  currency: string
  success: boolean
}

export async function fetchPricesForDates(searchParams: FlightSearchParams & FilterSearchParams) {
  const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?limit=30`

  const params = {
    origin: searchParams.origin,
    destination: searchParams.destination,
    date_from: searchParams.departureDate,
    return_at: searchParams.returnDate,
    sorting: searchParams.sorting,
    direct: searchParams.direct
  }

  const query = Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&")

  const res = await fetch(`${apiUrl}&${query}`, {
    cache: "no-cache",
    headers: {
      "X-Access-Token": process.env.TRAVELPAYOUTS_API_TOKEN!,
      "Accept-Encoding": "gzip"
    }
  })

  const data: ApiResponse | null = await res.json()
  return data?.data || []
}

// currency — валюта цен на билеты. Значение по умолчанию — rub.
// origin — пункт отправления. IATA-код города или аэропорта. Длина не менее двух и не более трёх символов. Необходимо указать, если нет destination.
// destination — пункт назначения. IATA-код города или аэропорта. Длина не менее двух и не более трёх. Необходимо указать, если нет origin.
// departure_at (необязательно)— дата вылета из пункта отправления (в формате YYYY-MM или YYYY-MM-DD).
// return_at (необязательно) — дата возвращения. Чтобы получить билеты в один конец, оставьте это поле пустым.
// one_way (необязательно) — билет в одну сторону. Принимает значения true или false. По умолчанию true. При значении true возвращает 1 билет. Используйте значение false, чтобы получить больше предложений.
// direct — получить рейсы без пересадок. Принимает значения true или false. По умолчанию false.
// market — задаёт маркет источника данных (по умолчанию ru).
// limit — количество записей в ответе. Значение по умолчанию — 30. Не более 1000.
// page — номер страницы. Используется, чтобы пропустить первые записи. То есть, выдача будет отдавать билеты в диапазоне [(page — 1) * limit; page * limit]. Таким образом, если мы хотим получить билеты с 100 по 150, то мы должны установить page=3, а limit=50.
// sorting — сортировка цен:
// price — по цене (значение по умолчанию).
// route — по популярности маршрута.
// unique — возвращает только уникальные направления, если был указан origin, но не указан destination. Позволяет собрать топ самых дешевых билетов из указанного города. Принимает значения true или false. По умолчанию false.
