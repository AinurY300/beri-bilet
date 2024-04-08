import ToggleThemeButtons from "@/components/toggleThemeButtons"
import Logo from "@/components/Logo"

export default function Header() {
  return (
    <header className="py-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />
          <ToggleThemeButtons />
        </div>
      </div>
    </header>
  )
}
