import { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export default function ContactForm({ contact, onSaved }) {
  const isEdit = !!contact;
  const [form, setForm] = useState({
    first_name: '', last_name: '', address: '', company: '', phone_number: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) setForm(contact);
  }, [contact]);

  const validate = () => {
    const errs = {};
    if (!form.first_name) errs.first_name = 'First name required';
    if (!form.last_name)  errs.last_name = 'Last name required';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/contacts/${contact.id}/` : '/contacts/';
    await apiFetch(url, {
      method,
      body: JSON.stringify(form)
    });
    setErrors({});
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      {['first_name','last_name','address','company','phone_number'].map(field => (
        <div className="form-group mb-3" key={field}>
          <label htmlFor={field}>
            {field.replace('_',' ').toUpperCase()}
          </label>
          <input
            id={field}
            type="text"
            className="form-control"
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
          />
          {errors[field] && (
            <small className="text-danger">{errors[field]}</small>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
