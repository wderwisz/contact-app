import ContactList from "../components/contactList";
import { Link } from "react-router-dom";

export default function ContactsPage() {
  return (
    <div>
      <h1>Lista kontaktów</h1>
      <ContactList />
      <div className="btnWrapper"><Link to="add"><div className="standardBtn">Dodaj nowy kontakt</div></Link></div>
    </div>
  );
}