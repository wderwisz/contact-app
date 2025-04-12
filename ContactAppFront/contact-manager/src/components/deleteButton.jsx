import { DeleteContact } from "../api/contacts";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteButton(){

    const { id } = useParams();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await DeleteContact(id);
            alert("Kontakt usunięty!");
            navigate(`/contacts`);
        } catch (err) {
            console.error("Błąd podczas aktualizacji", err);
        }
    };

    return (
        <div className="btnWrapper">
            <button className="standardBtn" onClick={handleClick}>Usuń</button>
        </div>
    );
}