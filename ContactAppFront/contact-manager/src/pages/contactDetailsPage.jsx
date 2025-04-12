import ContactDetails from "../components/contactDetails";
import { Link } from "react-router-dom";
import DeleteButton from "../components/deleteButton"

export default function ContactDetailsPage() {
  return (
    <div>
      <h1>Szczegóły kontaktu</h1>
      <ContactDetails />
      <div className="btnWrapper"><Link to="edit"><div className="standardBtn">Edytuj kontakt</div></Link></div>
      <DeleteButton />
      <div className="btnWrapper"><Link to= {`/contacts`}><div className="standardBtn">Cofnij</div></Link></div>
    </div>
  );
}