import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { Label, DeleteBtn } from './styles.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/contactsSlice';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(9, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

export const MyContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const initialValues = { name: '', number: '' };

  const handleSubmit = (values, { resetForm }) => {
    const newContact = { id: nanoid(), ...values };
    resetForm();
    const isContactInList = contacts.find(
      item => item.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    );
    if (isContactInList) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {props => (
        <Form>
          <Label>
            Name
            <Field
              type="text"
              value={props.values.name}
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage name="name" />
          </Label>
          <br />
          <Label>
            Number
            <Field
              type="tel"
              value={props.values.number}
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMessage name="number" />
          </Label>
          <br />
          <DeleteBtn type="Submit">Add contact</DeleteBtn>
        </Form>
      )}
    </Formik>
  );
};
