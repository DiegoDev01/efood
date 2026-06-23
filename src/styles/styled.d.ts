import 'styled-components'
import { theme } from './theme'

// Extrai o tipo do nosso objeto theme
type ThemeType = typeof theme

// Estende a interface padrão do styled-components
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType { }
}