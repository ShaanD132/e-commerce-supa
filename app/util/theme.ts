import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import {mode} from "@chakra-ui/theme-tools"


const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: "#FFFAFA",
      bg: "#090909"
    }
  })
}

const components = {
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "underline",
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: "#525252",
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      }
    }
  },
  Link: {
    baseStyle: (props: StyleFunctionProps) => ({
      textUnderlineOffset: 3,
    })
  }
}

const fonts = {
  heading: "'Outfit Bold'",
}

const colors = {
  black: "#353535",
  myBlack: {
    100:"#353535",
    200:"#353535",
    300:"#353535",
    400:"#353535",
    500: "#353535",
    600: "#353535",
    700: "#353535",
    800: "#353535",
    900: "#353535",
  },
  myPink: {
    100: "#B81365",
    200: "#B81365",
    300: "#B81365",
    400: "#B81365",
    500: "#B81365",
    600: "#B81365",
    700: "#B81365",
    800: "#B81365",
    900: "#B81365",
  },
  badgeDeepGreen: {
    100: "#0B3C49",
    200: "#0B3C49",
    300: "#0B3C49",
    400: "#0B3C49",
    500: "#0B3C49",
    600: "#0B3C49",
    700: "#0B3C49",
    800: "#0B3C49",
    900: "#0B3C49",
  },
  badgeBlue: {
    50: "#EDF5FB",
    100: "#DBEBF8",
    200: "#C9E1F5",
    300: "#B7D7F2",
    400: "#A6CEEF",
    500: "#94C4EC",
    600: "#82BAE9",
    700: "#70B0E6",
    800: "#5EA6E3",
    900: "#4D9DE0",
  },
  badgePurple: {
    100: "#D0AECA",
    200: "#D0AECA",
    300: "#D0AECA",
    400: "#B279A7",
    500: "#B279A7",
    600: "#B279A7",
    700: "#B279A7",
    800: "#B279A7",
    900: "#B279A7",
  }
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
}

export const theme = extendTheme({
  config, styles, components, colors, fonts
})
