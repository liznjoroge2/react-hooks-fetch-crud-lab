import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleQuestionSubmit = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then((newQuestion) => setQuestions([...questions, newQuestion]));
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: 'DELETE' })
      .then(() => setQuestions(questions.filter((question) => question.id !== id)));
  };

  const handleUpdateQuestion = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex }),
    })
      .then(response => response.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((question) => 
            question.id === id ? updatedQuestion : question
          )
        );
      });
  };

  return (
    <div>
      <QuestionForm onSubmit={handleQuestionSubmit} />
      <QuestionList questions={questions} onDelete={handleDeleteQuestion} onUpdate={handleUpdateQuestion} />
    </div>
  );
}

export default App;
