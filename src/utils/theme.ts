import { createTheme, PaletteOptions } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles/createTheme'
import { common, green, lime, purple, red } from '@mui/material/colors'

interface PaletteOptionsWithoutMode extends Omit<PaletteOptions, 'mode'> {

}
const darkTheme: PaletteOptionsWithoutMode = {
  // divider: 'rgba(60,65,71,0.8)',

  primary: {
    main:common.white
  },
  secondary: green,
  background: {
    default:'rgba(34,34,34,0.99)',
  },
  // text: {
  //    primary: '#ff6a00',
  // },
  action: {
    // disabledBackground: '#56b3de',
    // disabled: '#fff',
  },
}
const lightTheme:PaletteOptionsWithoutMode = {
  primary: {
    main:common.black
  },
  secondary: lime,
  // divider: '#3c4147',
  background: {
    default: '#ffffff',
  },
  // text: {
  //   // default:'#ff0000',
  //   primary: '#ff0000',
  //   secondary:'#ff0000',
  //   // custom:'#ff0000'
  // },
  action: {
    // disabledBackground: '#0082c9',
    // disabled: '#fff',
    // hover:'green'
  },
}

export const themeDesign = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light') ? lightTheme : darkTheme,
  },

  typography: {
    // fontSize:30,
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(60,65,71,0.7)',
          },
          '&.MuiTextField-root .MuiInputBase-root': {
            // backgroundColor: '#1c1f24', // Ghi đè màu nền cho TextField
          },
          '& .MuiFormHelperText-root.Mui-error': { //<--- here
            color: 'rgb(235, 88, 87,1)',
            marginTop:0,
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontSize: 30,
          },
        },
      ],
    },
    MuiOutlinedInput: {
    },
  },
})
