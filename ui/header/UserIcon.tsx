import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'block',
    margin: 'auto',
    minWidth: '20px',
    minHeight: '20px',
    border: '1px solid #dfdfdf',
  },
})

export const UserIcon: React.FC = () => {
  const styles = useStyles()
  return <div className={styles.root}></div>
}
