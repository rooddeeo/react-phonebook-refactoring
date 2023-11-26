import { useEffect, useState } from 'react';
import ContactList from './ContactList/ContactList.jsx';
import ContactForm from './ContactForm/ContactForm.jsx';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter.jsx';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prev => {
      return [...prev, { ...newContact, id: nanoid() }];
    });
  };

  const deleteContact = id => {
    setContacts(prev => {
      return prev.filter(contact => contact.id !== id);
    });
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const contactsBase = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsBase) || [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const lowerCase = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(lowerCase)
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
    </>
  );
};

export default App;
