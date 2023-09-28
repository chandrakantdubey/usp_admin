import React from 'react'
import {Button} from '@carbon/react'

const CenteredButton = ({text , type = "button"}) => {
  return (
    <Button className="centered-button" type={type}>{text}</Button>
  )
}

export default CenteredButton