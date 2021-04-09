import React from 'react'
import { Typography } from '@material-ui/core'

export type TitleProps = {
  value?: string
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => (
  <>
    <Typography variant="h1">{props.value ?? 'Tenet'}</Typography>
  </>
)
