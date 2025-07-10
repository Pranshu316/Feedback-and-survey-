import React, { useState } from 'react';
import './BlankForm.css';

const BlankForm = () => {
  const [questions, setQuestions] = useState([]);
  const [mode, setMode] = useState("edit");

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: Date.now(),
        title: '',
        type: 'short',
        options: ['']
      }
    ]);
  };

  const updateQuestion = (id, changes) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...changes } : q))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const shareableLink = `https://yourdomain.com/form#${btoa(JSON.stringify(questions))}`;

  return (
    <div className="container">
      <h2>{mode === "edit" ? "🛠️ Build Your Form" : "👀 Preview Form"}</h2>

      {mode === "edit" && (
        <>
          <button className="add-q" onClick={addQuestion}>+ Add Question</button>
          {questions.map(q => (
            <QuestionEditor
              key={q.id}
              question={q}
              onChange={changes => updateQuestion(q.id, changes)}
              onDelete={() => deleteQuestion(q.id)}
            />
          ))}
          <button className="create-btn" onClick={() => setMode("preview")}>✅ Create Form</button>
        </>
      )}

      {mode === "preview" && (
        <>
          {questions.length === 0 && <p>No questions to show.</p>}
          {questions.map((q, idx) => (
            <div key={q.id} className="preview-question">
              <p><strong>Q{idx + 1}:</strong> {q.title}</p>

              {q.type === "short" && <input type="text" placeholder="Short answer" />}
              {q.type === "paragraph" && <textarea placeholder="Paragraph answer" />}
              {q.type === "file" && <input type="file" />}
              {q.type === "checkbox" && q.options.map((opt, i) => (
                <label key={i}>
                  <input type="checkbox" /> {opt}
                </label>
              ))}
              {q.type === "dropdown" && (
                <select>
                  <option value="">Select an option</option>
                  {q.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {q.type === "button" && (
                <div className="button-group">
                  {q.options.map((opt, i) => (
                    <button key={i} className="preview-button">{opt || `Button ${i + 1}`}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="edit-btn" onClick={() => setMode("edit")}>✏️ Edit Form</button>
          <div className="share-link">
            <p><strong>Sharable Link:</strong></p>
            <code>{shareableLink}</code>
          </div>
        </>
      )}
    </div>
  );
};

const QuestionEditor = ({ question, onChange, onDelete }) => {
  const { title, type, options } = question;

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    onChange({ options: updated });
  };

  const addOption = () => {
    onChange({ options: [...options, ''] });
  };

  const deleteOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    onChange({ options: updated });
  };

  return (
    <div className="question">
      <input
        type="text"
        className="q-title"
        placeholder="Enter your question..."
        value={title}
        onChange={e => onChange({ title: e.target.value })}
      />

      <select
        className="q-type"
        value={type}
        onChange={e => {
          const newType = e.target.value;
          const newOptions = (["checkbox", "dropdown", "button"].includes(newType)) ? [''] : [];
          onChange({ type: newType, options: newOptions });
        }}
      >
        <option value="short">Short Answer</option>
        <option value="paragraph">Paragraph</option>
        <option value="checkbox">Checkboxes</option>
        <option value="file">File Upload</option>
        <option value="dropdown">Dropdown</option>
        <option value="button">Button</option>
      </select>

      {(type === 'checkbox' || type === 'dropdown' || type === 'button') && (
        <div className="options">
          {options.map((opt, idx) => (
            <div key={idx} className="option">
              <input
                type="text"
                value={opt}
                placeholder={`Option ${idx + 1}`}
                onChange={e => handleOptionChange(idx, e.target.value)}
              />
              <button onClick={() => deleteOption(idx)}>✕</button>
            </div>
          ))}
          <button className="add-opt" onClick={addOption}>+ Add Option</button>
        </div>
      )}

      <button className="delete-q" onClick={onDelete}>🗑 Delete Question</button>
    </div>
  );
};

export default BlankForm;
