"use client"
import TicketSearchForm from "@/components/forms/ticketSearchForm"
import { useEffect, useState } from "react"

// type AutocompleteResponse = {
//   iata: string
//   name: string
//   country_name: string
//   coordinates: string
// }

export default function Home() {
  // const [isLoading, setLoading] = useState(false)
  // const [isDisabled, setDisbled] = useState(false)
  // const [value, setValue] = useState<AutocompleteResponse>()
  // const [items, setItems] = useState<AutocompleteResponse[]>([])

  // const airportSearch = async function (text: string) {
  //   const res = await fetch(
  //     `https://autocomplete.travelpayouts.com/places2?locale=ru&types[]=airport&types[]=city&term=${text}`
  //   )
  //   const data: AutocompleteResponse[] = await res.json()

  //   setItems(data)
  // }

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-full">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Поиск дешёвых авиабилетов
        </h1>
        <p className="mt-2 leading-7">Помогаем вам экономить</p>
      </div>
      <aside className="col-span-4">
        <TicketSearchForm />
      </aside>
      <div className="col-span-8">фыв</div>
    </div>
  )
}
