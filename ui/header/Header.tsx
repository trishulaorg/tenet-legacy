import React from 'react'
import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Title } from './Title'

export type HeaderProps = {}

const useStyles = makeStyles({
    root: {
        backgroundColor: "#0f0f0f"
    },
    emptySpace: {
        flexGrow: 1
    }
})

export const Header: React.FC<HeaderProps> = (props) => {
  const styles = useStyles()
  return <AppBar position="static" className={styles.root}>
      <Toolbar>
          <Title />
          <div className={styles.emptySpace} />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
      </Toolbar>
  </AppBar>
}
