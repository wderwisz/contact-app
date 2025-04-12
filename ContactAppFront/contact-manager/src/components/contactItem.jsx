import { Link } from "react-router-dom";
export default function ContactItem({ contact }) {
    return (
        <tr>
            <td>{contact.firstName} </td>
            <td>{contact.lastName} </td>
            <td>{contact.email} </td>
            <td>
                <Link to={`/contacts/${contact.id}`}><div className="detailsButton">Szczegóły</div></Link>
            </td>
        </tr>
    );
  }