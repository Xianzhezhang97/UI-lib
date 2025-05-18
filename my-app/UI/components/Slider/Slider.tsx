"use client"

import { cn } from "@/utils/cn"
import { motion } from "framer-motion"
import * as React from "react"

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number) => void
  trackColor?: string
  filledTrackColorFrom?: string
  filledTrackColorTo?: string
  thumbColor?: string
  thumbBorderColor?: string
  thumbHoverColor?: string
  focusRingColor?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: propValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onValueChange,
      trackColor = "bg-gray-200",
      filledTrackColorFrom = "primary-400",
      filledTrackColorTo = "primary-600",
      thumbColor = "bg-primary-50",
      thumbBorderColor = "border-primary-500",
      thumbHoverColor = "hover:bg-white",
      focusRingColor = "focus:ring-primary-500",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [isDragging, setIsDragging] = React.useState(false)
    const [isTransition, setIsTransition] = React.useState(true)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isControlled = typeof propValue !== "undefined"
    const value = isControlled ? propValue! : internalValue
    const percentage = ((value - min) / (max - min)) * 100

    const updateValue = (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), max)
      const steppedValue = Math.round(clampedValue / step) * step
      
      if (!isControlled) setInternalValue(steppedValue)
      onValueChange?.(steppedValue)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      updateValueFromEvent(e)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      updateValueFromEvent(e)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsTransition(true)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown": updateValue(value - step); break
        case "ArrowRight":
        case "ArrowUp": updateValue(value + step); break
        case "Home": updateValue(min); break
        case "End": updateValue(max); break
      }
    }

    const updateValueFromEvent = (e: MouseEvent | React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newValue = min + ((e.clientX - rect.left) / rect.width) * (max - min)
      updateValue(newValue)
    }

    React.useEffect(() => {
      if (!isDragging) return
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isDragging])

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full touch-none select-none h-6 flex items-center mx-3",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <div className={`absolute -translate-x-1/2 h-6 w-6 rounded-full bg-${filledTrackColorFrom} `} />
        <div className={`absolute translate-x-1/2 h-6 w-6 rounded-full ${trackColor} right-0 top-0`}/>
        {/* Track */}
        <div className={cn("relative h-6 w-full grow overflow-hidden", trackColor)}>
          <div
            className={cn("absolute h-6", ` bg-gradient-to-r from-${filledTrackColorFrom} to-${filledTrackColorTo} `, isTransition && "transition-all duration-500 ease-[cubic-bezier(0.22, 1, 0.36, 1)]")}
            style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          />
        </div>
        

        {/* Thumb */}
        <motion.div
          onMouseEnter={() => setIsTransition(!isDragging)}
          onMouseLeave={() => setIsTransition(!isDragging)}
          className={cn(
            "absolute -translate-x-1/2 h-6 w-6 rounded-full border-2 bg-background",
            thumbBorderColor,
            thumbColor,
            thumbHoverColor,
            focusRingColor,
            isTransition && "transition-all duration-500 ease-[cubic-bezier(0.22, 1, 0.36, 1)]",
            disabled && "cursor-not-allowed hover:scale-100"
          )}
          style={{
            left: `${Math.max(0, Math.min(100, percentage))}%`,
            transform: `translateX(-50%)`
          }}
        />
      </div>
    )
  }
)

Slider.displayName = "Slider"

export { Slider }
