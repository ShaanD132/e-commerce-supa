import { Global } from '@emotion/react'

export function Fonts() {
  return(
    <Global
      styles={`
        /* latin */
        @font-face {
          font-family: 'Geist';
          src: url('fonts/OverusedGrotesk-SemiBold.otf') format("opentype")
        }
        `}
    />
  )

}
