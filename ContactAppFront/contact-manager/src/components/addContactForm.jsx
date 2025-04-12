import { useState } from "react";
import { PostContact } from "../api/contacts";
import { Link, useNavigate } from "react-router-dom";

export default function ContactForm(){

    const navigate = new useNavigate();

    // Template for JSON
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        category: '',
        subcategory: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleForm = async (e) => {
        e.preventDefault();
    
        try {
            await PostContact(formData); 
            alert('Kontakt zapisany!');
            navigate(`/contacts`);
        } catch (err) {
            console.error(err);
            alert('Wystąpił błąd podczas zapisu kontaktu');
        }
    };

    return (
        <form onSubmit={handleForm}>
        <table className="contactForm">
            <tbody>
                <tr>
                    <td><label htmlFor="firstName">Imię: </label></td>
                    <td><input id="firstName" name="firstName" type="text" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label htmlFor="lastName">Nazwisko: </label></td>
                    <td><input id="lastName" name="lastName" type="text" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label htmlFor="email">Adres e-mail: </label></td>
                    <td><input id="email" name="email" type="email" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label htmlFor="phone">Numer telefonu: </label></td>
                    <td><input id="phone" name="phone" type="text" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label htmlFor="dateOfBirth">Data urodzenia: </label></td>
                    <td><input id="dateOfBirth" name="dateOfBirth" type="date" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label htmlFor="category">Kategoria: </label></td>
                    <td>
                        <select id="category" name="category" onChange={handleChange} required>
                            <option value="" selected disabled hidden>Wybierz</option>
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
                    <select name="subcategory" onChange={handleChange} required>
                        <option value="" selected disabled hidden>Wybierz</option>
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
                    <td><input name="subcategory" type="text" onChange={handleChange} required /></td>
                </tr>
                )}

            </tbody>
        </table>
        <div className="btnWrapper"><button className="standardBtn" type="submit">Dodaj</button></div>
        <div className="btnWrapper"><Link to="/contacts"><div className="standardBtn">Cofnij</div></Link></div>
        </form>
    );
}