"use client"

import { Command as CommandPrimitive, CommandInput } from "cmdk"
import { CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type ReactElement,
  useEffect
} from "react"
import { nanoid } from "nanoid"

type AutoCompleteProps<T extends Record<string, any>> = {
  items: T[]
  itemTitle: Extract<keyof T, string>
  emptyMessage?: string
  value?: T
  onSelect?: (value: T | null) => void
  onInputChange?: (value: string) => void
  itemText?: (item: T) => ReactElement
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  shouldFilter?: boolean
}

export default function AutoComplete<T extends Record<string, any>>({
  items,
  itemTitle,
  placeholder,
  itemText,
  value,
  onSelect,
  onInputChange,
  disabled,
  shouldFilter = true,
  isLoading = false
}: AutoCompleteProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof items)[number] | null>(value || null)
  const [inputValue, setInputValue] = useState<string>(value?.[itemTitle] || "")

  useEffect(() => {
    if (!value) {
      setSelected(null)
      setInputValue("")
    }
  }, [value])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (!input) {
        return
      }

      if (!isOpen) {
        setOpen(true)
      }

      if (event.key === "Enter" && input.value !== "") {
        const itemToSelect = items.find(item => item[itemTitle] === input.value)
        if (itemToSelect) {
          setSelected(itemToSelect)
          onSelect?.(itemToSelect)
        }
      }

      if (event.key === "Escape") {
        input.blur()
      }
    },
    [isOpen, items, onSelect, itemTitle]
  )

  const handleBlur = useCallback(() => {
    setOpen(false)
    if (inputValue.length) setInputValue(selected?.[itemTitle] || "")
    else {
      setSelected(null)
      onSelect?.(null)
    }
  }, [selected, itemTitle, inputValue, onSelect])

  const handleSelectOption = useCallback(
    (selectedItem: (typeof items)[number]) => {
      setInputValue(selectedItem[itemTitle])
      setSelected(selectedItem)
      onSelect?.(selectedItem)
      setOpen(false)
    },
    [onSelect, itemTitle]
  )

  return (
    <CommandPrimitive shouldFilter={shouldFilter} onKeyDown={handleKeyDown}>
      <div>
        <CommandInput asChild>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={e => {
              isLoading ? undefined : setInputValue(e.target.value)
              onInputChange?.(e.target.value)
            }}
            onBlur={handleBlur}
            onFocus={() => inputValue.length && setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </CommandInput>
      </div>
      <div className="relative mt-1">
        {isOpen ? (
          <div className="absolute top-0 z-10 w-full overflow-auto rounded-md border outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="z-50 w-full bg-popover text-popover-foreground shadow-md outline-none">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map(item => {
                    return (
                      <CommandItem
                        key={nanoid()}
                        value={item[itemTitle]}
                        onMouseDown={event => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                        onSelect={() => handleSelectOption(item)}
                      >
                        {itemText ? itemText(item) : item[itemTitle]}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  )
}
