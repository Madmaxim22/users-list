import './App.css'
import List from './components/List'
import type { User } from './api/users';
import { useState } from 'react'; 
import Details from './components/Details';

function App() {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    setSelectedUser((prev) => (prev?.id === user.id ? prev : user));
  };
  return (
    <>
     <div className="container">
      <section className="section-list">
        <h2 className="section-title">Users List</h2>
        <List onSelectUser={handleSelectUser} selectedUserId={selectedUser?.id ?? null} />
      </section>
      <section className='section-details'>
        <h2 className="section-title">Details</h2>
        <Details info={selectedUser} />
      </section>
    </div>
    </>
  )
}

export default App
