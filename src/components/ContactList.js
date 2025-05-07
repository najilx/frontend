import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import Pager from './Pagination';
import SearchBar from './SearchBar';
import useDebounce from '../hooks/useDebounce';

export default function ContactList({ onEdit }) {
  const [contacts, setContacts] = useState([]);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotal]  = useState(1);
  const [search, setSearch]     = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    apiFetch(`/contacts/?search=${debouncedSearch}&page=${page}`)
      .then(data => {
        setContacts(data.results);
        setTotal(Math.ceil(data.count / 10));
      })
      .catch(console.error);
  }, [debouncedSearch, page]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this contact?')) return;
    await apiFetch(`/contacts/${id}/`, { method: 'DELETE' });
    setContacts(cs => cs.filter(c => c.id !== id));
  };

  return (
    <div>
      <SearchBar
        value={search}
        onChange={q => { setPage(1); setSearch(q); }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.company}</td>
              <td>{c.phone_number}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => onEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pager page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
