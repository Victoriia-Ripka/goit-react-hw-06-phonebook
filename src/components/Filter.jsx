import React from 'react'
import { Input, Label } from './styles.styled'
import { useSelector, useDispatch } from 'react-redux'
import { filterContacts, getFilter } from 'redux/contactsSlice'

export const Filter = () => {
  const dispatch = useDispatch(); 
  const filter = useSelector(getFilter);
  
  return (
    <Label>
      Find contacts by name
      <Input type="text" onChange={() => dispatch(filterContacts(filter))} name="filter" />
    </Label>
  )
}

// правильно передавати в payload значення інпута
