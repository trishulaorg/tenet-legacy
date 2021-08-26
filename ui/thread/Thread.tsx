import { Paper, Typography } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

export interface ThreadProps {
  title: string
  content: string
  author: string
}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: 14,
      },
    },
  },
})

export const Thread: React.FC<ThreadProps> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Typography variant="h1" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body1">{props.content}</Typography>
      </Paper>
    </ThemeProvider>
  )
}
