import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [fields, setFields] = useState([
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'feedback', label: 'Your Feedback', type: 'textarea' }
  ]);

  const [form, setForm] = useState({});
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', options: [''] });
  const [previewMode, setPreviewMode] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddField = () => {
    if (!newField.name || !newField.label) return;
    const fieldToAdd = { ...newField };
    if (fieldToAdd.type === 'radio') {
      fieldToAdd.options = fieldToAdd.options.filter((opt) => opt.trim() !== '');
    }
    setFields((prev) => [...prev, fieldToAdd]);
    setNewField({ name: '', label: '', type: 'text', options: [''] });
  };

  const handleCreate = () => {
    setPreviewMode(true);
    const encoded = btoa(JSON.stringify(fields));
    setShareLink(`${window.location.origin}/?form=${encoded}`);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newField.options];
    updatedOptions[index] = value;
    setNewField({ ...newField, options: updatedOptions });
  };

  const addOptionField = () => {
    setNewField({ ...newField, options: [...newField.options, ''] });
  };

  const handleBackToEdit = () => {
    setPreviewMode(false);
  };

  return (
    <div className="feedback-form">
      <h1 className="feedback-heading">Feedback Form</h1>
      <hr />

      {!previewMode ? (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            {fields.map((field, index) => (
              <div key={index} className="feedback-row">
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={form[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="feedback-textarea"
                    rows={4}
                  />
                ) : field.type === 'checkbox' ? (
                  <label className="feedback-checkbox">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={form[field.name] || false}
                      onChange={handleChange}
                    />
                    {field.label}
                  </label>
                ) : field.type === 'radio' ? (
                  <div className="feedback-radio">
                    <label>{field.label}</label>
                    {field.options.map((opt, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          checked={form[field.name] === opt}
                          onChange={handleChange}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="feedback-input"
                  />
                )}
              </div>
            ))}
            <button type="button" className="feedback-button" onClick={handleCreate}>
              Create
            </button>
          </form>

          <hr style={{ marginTop: '24px' }} />
          <h2 className="feedback-heading">Add New Field</h2>
          <div className="feedback-row">
            <input
              type="text"
              placeholder="Field name (e.g., website)"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              className="feedback-input"
            />
            <input
              type="text"
              placeholder="Label (e.g., Website)"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              className="feedback-input"
            />
            <select
              value={newField.type}
              onChange={(e) => {
                const value = e.target.value;
                setNewField({
                  ...newField,
                  type: value,
                  options: value === 'radio' ? [''] : []
                });
              }}
              className="feedback-input"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="number">Number</option>
              <option value="textarea">Textarea</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Bullet (Radio)</option>
            </select>
          </div>
          {newField.type === 'radio' && (
            <div className="feedback-row">
              {newField.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="feedback-input"
                />
              ))}
              <button type="button" className="feedback-button" onClick={addOptionField}>
                Add Option
              </button>
            </div>
          )}
          <div className="feedback-row">
            <button type="button" className="feedback-button" onClick={handleAddField}>
              Add Field
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="feedback-heading">Preview</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {fields.map((field, index) => (
              <div key={index} className="feedback-row">
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.label}
                    className="feedback-textarea"
                    rows={4}
                    disabled
                  />
                ) : field.type === 'checkbox' ? (
                  <label className="feedback-checkbox">
                    <input type="checkbox" name={field.name} disabled />
                    {field.label}
                  </label>
                ) : field.type === 'radio' ? (
                  <div className="feedback-radio">
                    <label>{field.label}</label>
                    {field.options.map((opt, i) => (
                      <label key={i}>
                        <input type="radio" name={field.name} disabled />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
                    className="feedback-input"
                    disabled
                  />
                )}
              </div>
            ))}
          </form>
          <div className="feedback-row">
            <input
              className="feedback-input"
              value={shareLink}
              readOnly
              onClick={(e) => e.target.select()}
            />
          </div>
          <div className="feedback-row">
            <button type="button" className="feedback-button" onClick={handleBackToEdit}>
              Back to Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
