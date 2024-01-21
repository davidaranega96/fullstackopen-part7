import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const init = {
    name,
    value,
    onChange
  }

  return {
    init,
    reset
  }
}