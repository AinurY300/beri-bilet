type Cases = {
  vi: string
  tv: string
  su: string
  ro: string
  pr: string
  da: string
}

export type AutocompleteResponse = {
  id: string
  type: "city" | "country" | "airport"
  code: string
  name: string
  country_code: string
  country_name: string
  state_code: string | null
  coordinates: {
    lon: number
    lat: number
  }
  index_strings: string[]
  weight: number
  cases: Cases
  country_cases: Cases
  main_airport_name: string
}
