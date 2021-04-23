import React, { createContext, useContext } from 'react'
import { observer } from 'mobx-react'
import { makeStyles, Menu, MenuItem } from '@material-ui/core'
import { HeaderStateContext } from './Header'

const useStyles = makeStyles({
    paper: {
        borderRadius: 0
    }
})

export type UserMenuProps = {menuVisibility?: boolean}

export const UserMenu: React.FC<UserMenuProps> = observer((props) => {
    const state = useContext(HeaderStateContext)
    const styles = useStyles()
    return (
      <Menu
        anchorEl={state.menuAnchorElement}
        classes={styles}
        id="ui-menu"
        open={props.menuVisibility ?? state.menuVisibility}
        onClose={() => state.closeMenu()}
      >
        <MenuItem onClick={() => state.closeMenu()}>Sign up</MenuItem>
        <MenuItem onClick={() => state.closeMenu()}>Log in</MenuItem>
      </Menu>
    )
  })