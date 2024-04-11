import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export function DatePicker({
  placeholder,
  minDate = new Date(),
  maxDate,
  selected,
  onSelected
}: {
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  selected?: Date
  onSelected?: (date: Date) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-medium",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 md:hidden lg:block" />
          {selected ? (
            format(selected, "PPP", { locale: ru })
          ) : placeholder ? (
            placeholder
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={ru}
          mode="single"
          selected={selected}
          onSelect={v => v && onSelected?.(v)}
          initialFocus
          disabled={date => date <= minDate || (maxDate ? date >= maxDate : false)}
        />
      </PopoverContent>
    </Popover>
  )
}
