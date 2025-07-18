import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [fields, setFields] = useState([
    { name: 'firstName', label: 'First name', type: 'text' },
    { name: 'lastName', label: 'Last name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'jobTitle', label: 'Job title', type: 'text' },
    { name: 'notes', label: 'Notes', type: 'textarea' }
  ]);

  const [form, setForm] = useState({});
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddField = () => {
    if (!newField.name || !newField.label) return;
    setFields((prev) => [...prev, newField]);
    setNewField({ name: '', label: '', type: 'text' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Contact:', form);
    setForm({});
  };

  return (
    <div className="contact-form">
      <h1 className="contact-heading">New Contact</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="contact-row">
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={form[field.name] || ''}
                onChange={handleChange}
                placeholder={field.label}
                className="contact-textarea"
                rows={4}
              />
            ) : (
              <input
                name={field.name}
                type={field.type}
                value={form[field.name] || ''}
                onChange={handleChange}
                placeholder={field.label}
                className="contact-input"
              />
            )}
          </div>
        ))}

        <button type="submit" className="contact-button">Save</button>
      </form>

      <hr style={{ marginTop: '24px' }} />
      <h2 className="contact-heading">Add New Field</h2>
      <div className="contact-row">
        <input
          type="text"
          placeholder="Field name (e.g., website)"
          value={newField.name}
          onChange={(e) => setNewField({ ...newField, name: e.target.value })}
          className="contact-input"
        />
        <input
          type="text"
          placeholder="Label (e.g., Website)"
          value={newField.label}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          className="contact-input"
        />
        <select
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          className="contact-input"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="tel">Phone</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
        </select>
        <button type="button" className="contact-button" onClick={handleAddField}>
          Add Field
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
