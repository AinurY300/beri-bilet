type Cases = {
  vi: string
  tv: string
  su: string
  ro: string
  pr: string
  da: string
}

type Coordinates = {
  lon: number
  lat: number
}

type NameTranslations = {
  de?: string
  en?: string
  "zh-CN"?: string
  tr?: string
  ru?: string
  it?: string
  es?: string
  fr?: string
  th?: string
}

export type Cites = {
  code: string
  name: string
  cases: Cases
  coordinates: Coordinates
  time_zone: string
  name_translations: NameTranslations
  country_code: string
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
