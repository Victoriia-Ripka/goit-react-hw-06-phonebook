import React from 'react';
import {
  ContactsList,
  ContactsItem,
  ContactsInfo,
  DeleteBtn,
} from './styles.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';

export const ListOfContacts = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filterContacts = useSelector(state => state.contacts.filter);

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
