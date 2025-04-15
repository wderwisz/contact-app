// This file contains all functions used to send requests to backend service  

const API_URL = "http://localhost:5000/api/contact/";

export async function getContacts() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Błąd podczas pobierania kontaktów");
    return res.json();
}

export async function GetContactDetails(id){
    const res = await fetch(API_URL + id);
    if (!res.ok) throw new Error("Błąd podczas pobierania szczegółów kontatku");
    return res.json();
}

export async function PostContact(payload){
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error("Błąd podczas dodawania nowego kontaktu");
      return res.json();
}

export async function UpdateContact(id, data) {
    const res = await fetch(API_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Nie udało się zaktualizować kontaktu");
}

export async function DeleteContact(id){
    const res = await fetch(API_URL + id, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("Nie udało się usunąć kontaktu");
}