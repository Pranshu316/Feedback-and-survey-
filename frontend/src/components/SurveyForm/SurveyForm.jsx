import React, { useState } from 'react';
import './SurveyForm.css';

const SurveyForm = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: 'short', title: 'What is your name?' },
    { id: 2, type: 'radio', title: 'What is your gender?', options: ['Male', 'Female', 'Other'] },
    { id: 3, type: 'checkbox', title: 'Which features do you use?', options: ['Chat', 'Reports', 'Notifications'] },
    { id: 4, type: 'paragraph', title: 'Any feedback?' }
  ]);

  const [newQuestion, setNewQuestion] = useState({ title: '', type: 'short', options: [''] });
  const [formCreated, setFormCreated] = useState(false);

  const addQuestion = () => {
    if (!newQuestion.title.trim()) return alert('Title is required');
    setQuestions((prev) => [
      ...prev,
      {
        ...newQuestion,
        id: Date.now(),
        options: newQuestion.type === 'short' || newQuestion.type === 'paragraph' ? [] : newQuestion.options
      }
    ]);
    setNewQuestion({ title: '', type: 'short', options: [''] });
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const addOption = () => {
    setNewQuestion((prev) => ({ ...prev, options: [...prev.options, ''] }));
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? field === 'title'
            ? { ...q, title: value }
            : field === 'type'
            ? { ...q, type: value, options: value === 'short' || value === 'paragraph' ? [] : [''] }
            : q
          : q
      )
    );
  };

  const handleOptionChange = (id, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
          : q
      )
    );
  };

  const addOptionToQuestion = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ''] } : q
      )
    );
  };

  const toggleForm = () => {
    setFormCreated(!formCreated);
  };

  return (
    <div className="survey-form-container">
      <h2 className="survey-heading">Dynamic Survey Builder</h2>

      {/* Button to create/view form */}
      <div style={{ textAlign: 'right' }}>
        <button className="survey-button" onClick={toggleForm}>
          {formCreated ? 'Back to Editor' : 'Create Form'}
        </button>
      </div>

      {/* Preview Mode */}
      {formCreated ? (
        <div className="survey-preview">
          <h3>Survey Preview</h3>
          {questions.map((q, index) => (
            <div key={q.id} className="preview-block">
              <div className="preview-question">{index + 1}. {q.title}</div>
              {q.type === 'short' && <input className="survey-input" placeholder="Short answer..." />}
              {q.type === 'paragraph' && <textarea className="survey-textarea" placeholder="Write here..." />}
              {(q.type === 'radio' || q.type === 'checkbox') &&
                q.options.map((opt, i) => (
                  <label key={i} className="survey-option">
                    <input type={q.type} name={`q${q.id}`} /> {opt}
                  </label>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Add New Question Section */}
          <div className="survey-form">
            <input
              className="survey-input"
              placeholder="Question title"
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            />
            <select
              className="survey-input"
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value, options: [''] })}
            >
              <option value="short">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="radio">Multiple Choice (Single)</option>
              <option value="checkbox">Multiple Choice (Multiple)</option>
            </select>

            {(newQuestion.type === 'radio' || newQuestion.type === 'checkbox') &&
              newQuestion.options.map((opt, i) => (
                <input
                  key={i}
                  className="survey-input"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                />
              ))}

            {(newQuestion.type === 'radio' || newQuestion.type === 'checkbox') && (
              <button className="survey-button" type="button" onClick={addOption}>
                + Add Option
              </button>
            )}

            <button className="survey-button" type="button" onClick={addQuestion}>
              Add Question
            </button>
          </div>

          {/* Question Editor Section */}
          <div style={{ marginTop: 40 }}>
            <h3>Question List</h3>
            {questions.map((q) => (
              <div key={q.id} className="preview-block">
                <input
                  className="survey-input"
                  value={q.title}
                  onChange={(e) => handleQuestionChange(q.id, 'title', e.target.value)}
                />
                <select
                  className="survey-input"
                  value={q.type}
                  onChange={(e) => handleQuestionChange(q.id, 'type', e.target.value)}
                >
                  <option value="short">Short Answer</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="radio">Multiple Choice (Single)</option>
                  <option value="checkbox">Multiple Choice (Multiple)</option>
                </select>

                {(q.type === 'radio' || q.type === 'checkbox') &&
                  q.options.map((opt, i) => (
                    <input
                      key={i}
                      className="survey-input"
                      value={opt}
                      placeholder={`Option ${i + 1}`}
                      onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
                    />
                  ))}

                {(q.type === 'radio' || q.type === 'checkbox') && (
                  <button className="survey-button" type="button" onClick={() => addOptionToQuestion(q.id)}>
                    + Add Option
                  </button>
                )}

                <button
                  className="survey-button"
                  type="button"
                  onClick={() => removeQuestion(q.id)}
                  style={{ backgroundColor: 'var(--danger-color)' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SurveyForm;
