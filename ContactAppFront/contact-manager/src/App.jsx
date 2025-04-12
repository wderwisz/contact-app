import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactsPage from './pages/contactsPage'
import ContactDetailsPage from './pages/contactDetailsPage';
import "./App.css"
import AddContactPage from './pages/addContactPage';
import EditContactPage from './pages/editContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/contacts/add' element={<AddContactPage />} />
        <Route path="/contacts/:id" element={<ContactDetailsPage />} />
        <Route path="/contacts/:id/edit" element={<EditContactPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
