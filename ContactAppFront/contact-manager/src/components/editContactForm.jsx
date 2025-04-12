import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetContactDetails, UpdateContact } from "../api/contacts";
import { Link } from "react-router-dom";

export default function EditContactForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        category: '',
        subcategory: ''
    });

    useEffect(() => {
        async function fetchData() {
        try {
            const data = await GetContactDetails(id);
            setFormData(data);
        } catch (err) {
            console.error("Nie udało się pobrać danych", err);
        }
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            await UpdateContact(id, formData);
            alert("Zaktualizowano kontakt!");
            navigate(`/contacts/${id}`);
        } catch (err) {
            console.log(err);
            alert("Błąd podczas aktualizacji");
        }
    };

    return (
        <form onSubmit={handleForm}>
            <table className="contactForm">
                <tbody>
                    <tr>
                        <td><label htmlFor="firstName">Imię: </label></td>
                        <td><input id="firstName" name="firstName" type="text" onChange={handleChange}  value={formData.firstName} required/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lastName">Nazwisko: </label></td>
                        <td><input id="lastName" name="lastName" type="text" onChange={handleChange}  value={formData.lastName} required/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email">Adres e-mail: </label></td>
                        <td><input id="email" name="email" type="email" onChange={handleChange}  value={formData.email} required/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="phone">Numer telefonu: </label></td>
                        <td><input id="phone" name="phone" type="text" onChange={handleChange}  value={formData.phone} required/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="dateOfBirth">Data urodzenia: </label></td>
                        <td><input id="dateOfBirth" name="dateOfBirth" type="date" onChange={handleChange}  value={formData.dateOfBirth} required/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="category">Kategoria: </label></td>
                        <td>
                            <select id="category" name="category" onChange={handleChange}  value={formData.category}>
                                <option value="PRYWATNY">PRYWATNY</option>
                                <option value="SŁUŻBOWY">SŁUŻBOWY</option>
                                <option value="INNY">INNY</option>
                            </select>
                        </td>
                    </tr>
                    
                    {formData.category === 'SŁUŻBOWY' && (
                    <tr>
                    <td><label>Podkategoria:</label></td>
                    <td>
                        <select name="subcategory" onChange={handleChange} value={formData.subcategory} >
                            <option value="SZEF">Szef</option>  
                            <option value="KLIENT">Klient</option>
                            <option value="PRACOWNIK">Pracownik</option>
                        </select>
                    </td>
                    </tr>
                    )}

                    {formData.category === 'INNY' && (
                    <tr>
                        <td><label>Podkategoria:</label></td>
                        <td><input name="subcategory" type="text" onChange={handleChange} value={formData.subcategory} /></td>
                    </tr>
                    )}

                </tbody>
            </table>
            <div className="btnWrapper"><button className="standardBtn" type="submit">Zapisz zmiany</button></div>
            <div className="btnWrapper"><Link to= {`/contacts/${id}`}><div className="standardBtn">Cofnij</div></Link></div>
        </form>
    );
}
