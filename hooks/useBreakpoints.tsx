import useMediaQuery from './useMediaQuery'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)
const breakpoints = fullConfig.theme.screens

/**
 * Get a set of boolean representing which breakpoint is active
 * and which breakpoints are inactive
 *
 * Inspired by: https://components.guide/react+typescript/goodbye-use-effect
 */
export default function useBreakpoints() {
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm})`)()
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md})`)()
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg})`)()
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl})`)()
  const is2xl = useMediaQuery(`(min-width: ${breakpoints['2xl']})`)()

  return { isSm, isMd, isLg, isXl, is2xl }
}
