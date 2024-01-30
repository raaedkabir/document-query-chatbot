import { useSyncExternalStore } from 'react'

/**
 * Custom hook that tells you whether a given media query is active
 *
 * Inspired by https://usehooks.com/useMedia/
 * https://gist.github.com/gragland/ed8cac563f5df71d78f4a1fefa8c5633
 */
export default function useMediaQuery(mediaQuery: string) {
  function subscribe(onStoreChange: EventListener) {
    // https://css-tricks.com/working-with-javascript-media-queries
    const aborter = new AbortController()
    window
      .matchMedia(mediaQuery)
      .addEventListener('change', onStoreChange, { signal: aborter.signal })

    return () => {
      aborter.abort()
    }
  }

  return function useCustomMediaQuery() {
    return useSyncExternalStore(
      subscribe,
      () => window.matchMedia(mediaQuery).matches,
      () => false
    )
  }
}
