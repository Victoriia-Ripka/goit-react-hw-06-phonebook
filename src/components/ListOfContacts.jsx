import React from 'react';
import {
  ContactsList,
  ContactsItem,
  ContactsInfo,
  DeleteBtn,
} from './styles.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getContacts, getFilter } from '../redux/contactsSlice';

export const ListOfContacts = () => {
  const contacts = useSelector(getContacts);
  const filterContacts = useSelector(getFilter);

  const dispatch = useDispatch();

  const normalFilter = filterContacts.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalFilter)
  );

  return (
    <ContactsList>
      {visibleContacts.map(item => {
        const { name, number, id } = item;
        return (
          <ContactsItem key={id}>
            <ContactsInfo>
              {name}: {number}
            </ContactsInfo>
            <DeleteBtn
              value={id}
              onClick={() => dispatch(deleteContact(id))}
              type="button"
            >
              Delete
            </DeleteBtn>
          </ContactsItem>
        );
      })}
    </ContactsList>
  );
};
