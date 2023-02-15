type colors = { [_ in keyof typeof lightColors]: string }
interface StyleClosetTheme {
  breakpoints: { [_ in keyof typeof breakpoints]: string }
  fontSizes: { [_ in keyof typeof fontSizes]: string }
  colors: colors
  secondaryColors: { [_ in keyof typeof secondaryColors]: string }
  fonts: { [_ in keyof typeof fonts]: string }
  paddings: { [_ in keyof typeof paddings]: string }
  margins: { [_ in keyof typeof margins]: string }
}

const lightColors = {
  primary: '#FAFAFA',
  secondary: '#FFC80A',
  tertiary: '#303030',
  background: '#ffffff',
  text: '#000000',
  primaryTextColor: '#594F43',
  secondaryTextColor: '#777777',
  inputPlaceholder: '#C7C7C7',
  darkGrayText: '#303030',
  darkText: '#1A1A1A',
  black: '#000000',
  white: '#ffffff',
  dark: '',
  medium: '',
  light: '',
  danger: '',
  success: '#66A15A',
}
const darkColors = {
  primary: '#FFC80A',
  secondary: '#FAFAFA',
  tertiary: '#303030',
  background: '#000000',
  text: '#000000',
  primaryTextColor: '#594F43',
  secondaryTextColor: '#777777',
  inputPlaceholder: '#C7C7C7',
  darkGrayText: '#303030',
  darkText: '#1A1A1A',
  black: '#000000',
  white: '#ffffff',
  dark: '',
  medium: '',
  light: '',
  danger: '',
  success: '#66A15A',
}

const secondaryColors = {}

const fonts = {
  ranga: `'Ranga', cursive`,
}

const paddings = {
  section: '0px',
  container: '15px',
  pageTop: '30px',
}

const margins = {
  pageTop: '30px',
}

const breakpointsSize = {
  xs: '400px', // for small screen mobile
  sm: '600px', // for mobile screen
  md: '900px', // for tablets
  lg: '1280px', // for laptops
  xl: '1440px', // for desktop / monitors
  xxl: '1920px', // for big screens
}

const breakpoints = {
  xs: `(min-width: ${breakpointsSize.xs})`,
  sm: `(min-width: ${breakpointsSize.sm})`,
  md: `(min-width: ${breakpointsSize.md})`,
  lg: `(min-width: ${breakpointsSize.lg})`,
  xl: `(min-width: ${breakpointsSize.xl})`,
  xxl: `(min-width: ${breakpointsSize.xxl})`,
}

const fontSizes = {
  xs: `1.2rem`,
  sm: `1.4rem`,
  md: `1.6rem`,
  lg: `1.8rem`,
  xl: `2.4rem`,
  xxl: `2.8rem`,
}

const lightTheme: StyleClosetTheme = {
  breakpoints: breakpoints,
  fontSizes: fontSizes,
  colors: lightColors,
  secondaryColors,
  fonts,
  paddings,
  margins,
}
const darkTheme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  colors: darkColors,
  secondaryColors,
  fonts,
  paddings,
  margins,
}
export { lightTheme, darkTheme }
export type { StyleClosetTheme }
