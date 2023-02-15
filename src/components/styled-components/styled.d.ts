// import original module declarations
import 'styled-components'

import { StyleClosetTheme } from './Theme'

// and extend them!
declare module 'styled-components' {
  //   export interface DefaultTheme {
  //     borderRadius: string

  //     colors: {
  //       main: string
  //       secondary: string
  //     }
  //   }
  export interface DefaultTheme extends StyleClosetTheme {}
}
