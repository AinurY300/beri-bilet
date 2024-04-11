import ToggleThemeButtons from "@/components/toggleThemeButtons"
import Logo from "@/components/Logo"

export default function Header() {
  return (
    <header className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <ToggleThemeButtons />
      </div>
    </header>
  )
}
