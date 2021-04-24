import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Grid, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { HeaderStateContext } from './Header'
import { UserIcon } from './UserIcon'

const useStyles = makeStyles({
  paper: {
    borderRadius: 0,
    width: '200px',
  },
})

export const UserMenu: React.FC = observer(() => {
  const state = useContext(HeaderStateContext)
  const styles = useStyles()
  return (
    <Menu
      anchorEl={state.menuAnchorElement}
      classes={styles}
      id="ui-menu"
      open={state.menuVisibility}
      onClose={() => state.closeMenu()}
    >
      {!state.userState ? (
        <>
          <MenuItem onClick={() => state.closeMenu()}>Sign up</MenuItem>
          <MenuItem onClick={() => state.closeMenu()}>Sign in</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => state.closeMenu()}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <UserIcon />
              </Grid>
              <Grid item xs="auto">
                {state.userState.name}
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem onClick={() => state.closeMenu()}>Sign out</MenuItem>
        </>
      )}
    </Menu>
  )
})
