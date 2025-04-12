import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetContactDetails } from "../api/contacts";

export default function ContactList() {
    const { id } = useParams();
    const [contactDetails, setContactDetails] = useState([]);

      useEffect(() => {
        GetContactDetails(id)
          .then(setContactDetails)
          .catch(console.error);
      }, [id]);
    

    return (
    <div>
        <div>
            <h2>{contactDetails.firstName} {contactDetails.lastName}</h2>
            <div className="contactDataWrapper">
                <img src={"/contact_icon.png"} alt="contact icon" className="contactIcon"/>
                <div className="detailsContainer">
                    <p><strong>Email:</strong> {contactDetails.email}</p> <p><strong>Telefon:</strong> {contactDetails.phone}</p>
                    <p><strong>Data urodzenia:</strong> {contactDetails.dateOfBirth}</p>
                    <p><strong>Kategoria:</strong> {contactDetails.category}</p>
                    {contactDetails.subCategory !== null &&(
                        <p><strong>Podkategoria:</strong> {contactDetails.subCategory}</p>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
}