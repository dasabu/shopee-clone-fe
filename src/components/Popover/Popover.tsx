import { useState, useRef, useId, ElementType } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset, type Placement } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  className?: string
  popoverOptions: React.ReactNode

  as?: ElementType // chọn thẻ HTML để render: span, div,...
  initialOpen?: boolean
  placement?: Placement // vị trí popoverOptions
}

export default function Popover({
  children,
  popoverOptions,
  className,
  as: Element = 'div',
  initialOpen = false,
  placement = 'bottom-end'
}: PopoverProps) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  // Floating UI: https://www.npmjs.com/package/@floating-ui/react-dom-interactions
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  const id = useId() // tạo class id riêng cho các popover (default là floating-ui-root)
  return (
    <Element
      className={className}
      ref={reference}
      onMouseEnter={() => {
        setOpen(true)
      }}
      // hide popover
      onMouseLeave={() => {
        setOpen(false)
      }}
    >
      {children}
      {/* Popover */}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              // Framer Motion
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.15 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {popoverOptions}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
