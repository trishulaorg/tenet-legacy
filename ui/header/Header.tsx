import React, { createContext, useContext } from 'react'
import { observer } from 'mobx-react'
import { AppBar, IconButton, makeStyles, Toolbar, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Title } from './Title'
import { HeaderState } from '../../states/HeaderState'

export type HeaderProps = Record<string, unknown>

const HeaderStateContext = createContext<HeaderState>(new HeaderState())

const useStyles = makeStyles({
  root: {
    backgroundColor: '#0f0f0f',
  },
  emptySpace: {
    flexGrow: 1,
  },
})

const LoggedOutMenu: React.FC = observer(() => {
  const state = useContext(HeaderStateContext)
  return (
    <Menu
      anchorEl={state.menuAnchorElement}
      id="ui-menu"
      open={state.menuVisibility}
      onClose={() => state.closeMenu()}
    >
      <MenuItem onClick={() => state.closeMenu()}>Sign up</MenuItem>
      <MenuItem onClick={() => state.closeMenu()}>Log in</MenuItem>
    </Menu>
  )
})

export const HeaderImpl = observer((props: React.PropsWithChildren<HeaderProps>) => {
  props // wip
  const styles = useStyles()
  const state = useContext(HeaderStateContext)
  return (
    <>
      <AppBar position="static" className={styles.root}>
        <Toolbar>
          <Title />
          <div className={styles.emptySpace} />
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              aria-controls="ui-menu"
              onClick={(ev) => state.toggleMenu(ev.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <LoggedOutMenu />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
})

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HeaderStateContext.Provider value={new HeaderState()}>
      <HeaderImpl {...props} />
    </HeaderStateContext.Provider>
  )
}
