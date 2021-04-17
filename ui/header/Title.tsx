import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

export type TitleProps = {
  value?: string
}

const useStyles = makeStyles({
  root: {
    fontSize: '1.7em'
  }
})

export const Title: React.FC<TitleProps> = (props) => {
  const styles = useStyles()
  return <>
    <Typography variant="h1" className={styles.root}>{props.value ?? 'Tenet'}</Typography>
  </>
}
