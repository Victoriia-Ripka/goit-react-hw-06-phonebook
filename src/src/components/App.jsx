import { MyContactForm } from './Form';
import { Section } from './Section';
import { ListOfContacts } from './ListOfContacts';
import { Filter } from './Filter';

export default function App() {
  return (
    <>
      <Section title="Phonebook">
        <MyContactForm />
      </Section>
      <Section title="Contacts">
        <Filter/>
        <ListOfContacts />
      </Section>
    </>
  );
}
