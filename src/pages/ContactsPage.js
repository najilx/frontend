// src/pages/ContactsPage.js

import { useState } from 'react';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';

export default function ContactsPage() {
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="contacts-page">
      <div className="glass-card">
        <ContactForm
          contact={editing}
          onSaved={() => {
            setEditing(null);
            setRefreshKey(k => k + 1);
          }}
          key={editing?.id || 'new'}
        />
      </div>

      <div className="glass-card">
        <ContactList key={refreshKey} onEdit={c => setEditing(c)} />
      </div>
    </div>
  );
}
