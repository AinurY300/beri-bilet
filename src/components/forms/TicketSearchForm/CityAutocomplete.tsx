"use client"

import { AutocompleteResponse } from "@/types/travelpayouts"
import AutoComplete from "@/components/autocomplete"
import { useState } from "react"

export type CityAutocompleteListItem = {
  id: string
  city: string
  country: string
  code: string
}

type CityAutocompleteProps = {
  value?: CityAutocompleteListItem
  placeholder?: string
  onSelect?: (item: CityAutocompleteListItem | null) => void
}

export function CityAutocomplete({ placeholder, onSelect, value }: CityAutocompleteProps) {
  const [items, setItems] = useState<CityAutocompleteListItem[]>([])

  const fetchCitesList = async function (text: string) {
    const url = `https://autocomplete.travelpayouts.com/places2?locale=ru&types[]=city&term="${text}"`
    const response = await fetch(url)
    if (response.ok) {
      const data: AutocompleteResponse[] = await response.json()
      setItems(
        data.map(item => ({
          id: item.id,
          city: item.name,
          country: item.country_name,
          code: item.code
        }))
        // .slice(0, 5)
      )
    }
  }

  return (
    <AutoComplete
      items={items}
      itemTitle="city"
      value={value}
      placeholder={placeholder}
      onInputChange={fetchCitesList}
      shouldFilter={false}
      onSelect={onSelect}
      itemText={item => (
        <div className="text-xs">
          {item.city}, <span className="text-muted-foreground">{item.country}</span>
        </div>
      )}
    />
  )
}
