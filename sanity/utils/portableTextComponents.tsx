import type { PortableTextComponents } from '@portabletext/react'

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      if (Array.isArray(children) && children[0].trim() === '') {
        return <br />
      }
      return <p>{children}</p>
    },
    h1: ({ children }) => <h1 className="text-6xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-5xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-4xl">{children}</h3>,
    h4: ({ children }) => <h4 className="text-3xl">{children}</h4>,
    h5: ({ children }) => <h5 className="text-2xl">{children}</h5>,
    h6: ({ children }) => <h6 className="text-xl">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="my-2 border-l-4 border-l-primary-500 p-2">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      const rel = target === '_blank' ? 'noindex nofollow' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal">{children}</ol>,
  },
}
