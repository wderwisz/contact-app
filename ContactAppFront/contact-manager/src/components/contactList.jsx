import { useEffect, useState } from "react";
import { getContacts } from "../api/contacts";
import ContactItem from "./contactItem";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch(console.error);
  }, []);

  return (
    <table id="allContactsTable">
        <tbody>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} />
            ))}
        </tbody>
    </table>
  );
}