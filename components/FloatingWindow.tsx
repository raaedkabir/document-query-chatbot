import { useState } from 'react'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'

export default function FloatingWindow({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode
}) {
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement>()
  let [popperElement, setPopperElement] = useState<HTMLDivElement>()
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  return (
    <Popover className="relative ml-auto flex items-center justify-center">
      {/* @ts-expect-error */}
      <Popover.Button ref={setReferenceElement} className="hover:text-primary">
        {title}
      </Popover.Button>

      <Popover.Panel
        // @ts-expect-error
        ref={setPopperElement}
        className="fixed z-10 rounded-lg bg-gray-dark/90 p-2 text-sm text-white"
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
      </Popover.Panel>
    </Popover>
  )
}
