export default async function SearchPage() {
  const res = await fetch("https://api.travelpayouts.com/aviasales/v3/prices_for_dates")
  return <div>Hello</div>
}
