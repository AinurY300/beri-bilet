"use client"

import { Command as CommandPrimitive, CommandInput } from "cmdk"
import { CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { useState, useRef, useCallback, type KeyboardEvent, type ReactElement } from "react"
import { nanoid } from "nanoid"

type AutoCompleteProps<T extends Record<string, any>> = {
  items: T[]
  itemTitle: Extract<keyof T, string>
  emptyMessage: string
  value?: T
  onValueChange?: (value: T) => void
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
  emptyMessage,
  itemText,
  value,
  onValueChange,
  onInputChange,
  disabled,
  shouldFilter = false,
  isLoading = false
}: AutoCompleteProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof items)[number]>(value as T)
  const [inputValue, setInputValue] = useState<string>(value?.[itemTitle] || "")

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (!input) {
        return
      }

      // Сохраняйте параметры, отображаемые, когда пользователь печатает
      if (!isOpen) {
        setOpen(true)
      }

      // Это не поведение поля <input /> по умолчанию.
      if (event.key === "Enter" && input.value !== "") {
        const itemToSelect = items.find(item => item[itemTitle] === input.value)
        if (itemToSelect) {
          setSelected(itemToSelect)
          onValueChange?.(itemToSelect)
        }
      }

      if (event.key === "Escape") {
        input.blur()
      }
    },
    [isOpen, items, onValueChange, itemTitle]
  )

  const handleBlur = useCallback(() => {
    setOpen(false)
    setInputValue(selected?.[itemTitle])
  }, [selected, itemTitle])

  const handleSelectOption = useCallback(
    (selectedItem: (typeof items)[number]) => {
      setInputValue(selectedItem[itemTitle])
      setSelected(selectedItem)
      onValueChange?.(selectedItem)
      setOpen(false)
    },
    [onValueChange, itemTitle]
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
            onFocus={() => setOpen(true)}
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
              {!isLoading ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  )
}

// import { nanoid } from "nanoid"
// import { useState, useRef, useEffect } from "react"
// import { useElementSize, useFocus } from "@reactuses/core"
// import { ArrowUpCircle, CheckCircle2, Circle, HelpCircle, LucideIcon, XCircle } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList
// } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Skeleton } from "@/components/ui/skeleton"

// export default function AutoComplete<T extends object, K extends keyof T>({
//   items,
//   itemTitle,
//   itemValue
// }: {
//   items?: T[]
//   itemTitle?: K
//   itemValue?: K
// }) {
//   const inputRef = useRef<HTMLInputElement>(null)
//   const commandRef = useRef<HTMLDivElement>(null)
//   const [inputFocus, setInputFocus] = useFocus(inputRef)
//   const [mounted, setMounted] = useState(true)
//   const [inputWidth] = useElementSize(commandRef, { box: "border-box" })
//   const [open, setOpen] = useState(false)
//   const [inputValue, setInputValue] = useState("")
//   const [selected, setSelected] = useState<T>()

//   // useEffect(() => setMounted(true), [])

//   //   if (!inputValue.length) setOpen(false)
//   // }, [inputValue, inputFocus, setInputFocus])

//   return (
//     <Popover open={open}>
//       <Command ref={commandRef}>
//         <PopoverTrigger>
//           {(mounted && (
//             <Input
//               ref={inputRef}
//               placeholder={`${String(open)}, ${String(inputFocus)}`}
//               value={inputValue}
//               onChange={e => {
//                 setInputValue(e.target.value)
//                 setOpen(e.target.value ? true : false)
//                 setTimeout(() => setInputFocus(true), 1)
//               }}
//               onFocus={() => {
//                 setOpen(true)
//                 setTimeout(() => setInputFocus(true), 1)
//               }}
//               onBlur={() => {
//                 setTimeout(() => setOpen(false), 0)
//               }}
//             />
//           )) || <Skeleton className="h-9" />}
//         </PopoverTrigger>
//         <PopoverContent className="p-0" style={{ width: inputWidth }} align="start">
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup>
//               {items?.map(item => (
//                 <CommandItem
//                   key={nanoid()}
//                   value={item[itemValue]}
//                   onSelect={value => {
//                     setSelected(value)
//                     console.log(value)
//                     setOpen(false)
//                   }}
//                 >
//                   <span>{item[itemTitle as K]}</span>
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </PopoverContent>
//       </Command>
//       {String(open)}
//     </Popover>
//   )
// }
