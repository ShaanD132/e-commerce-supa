import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import {mode} from "@chakra-ui/theme-tools"


const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: "#F9F4F5",
      color: "#090909"
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
  myGreen: {
    100: "#33673B",
    200: "#33673B",
    300: "#33673B",
    400: "#33673B",
    500: "#33673B",
    600: "#33673B",
    700: "#33673B",
    800: "#33673B",
    900: "#33673B",
  },
  myPink: {
    100: "#007EA7",
    200: "#007EA7",
    300: "#007EA7",
    400: "#007EA7",
    500: "#007EA7",
    600: "#007EA7",
    700: "#007EA7",
    800: "#007EA7",
    900: "#007EA7",
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
    200: "#4D9DE0",
    300: "#4D9DE0",
    400: "#4D9DE0",
    500: "#4D9DE0",
    600: "#4D9DE0",
    700: "#4D9DE0",
    800: "#4D9DE0",
    900: "#4D9DE0",
  },
  badgePurple: {
    100: "#D0AECA",
    200: "#B279A7",
    300: "#B279A7",
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
