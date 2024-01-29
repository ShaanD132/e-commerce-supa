import { Global } from '@emotion/react'

export function Fonts() {
  return(
    <Global
      styles={`
        /* latin */
        @font-face {
          font-family: 'Overused-Grotesk';
          src: url('/fonts/OverusedGrotesk-SemiBold.otf') format("opentype")
        }
        `}
    />
  )

}
