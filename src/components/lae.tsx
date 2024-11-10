import React, { useEffect, useState } from 'react';

// Add custom styles for centering content
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f7f7f7', // light background color
  flexDirection: 'column',
  fontFamily: 'Arial, sans-serif',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const buttonHoverStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#45a049',
};

const resultStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '20px',
  color: '#333',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const questionStyle: React.CSSProperties = {
  fontSize: '20px',
  marginBottom: '20px',
  textAlign: 'center',
};

const Lae: React.FC = () => {
  const [categories, setCategories] = useState<{ [key: string]: any[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/lae');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    setSelectedQuestionIndex(0);
    setShowResult(false);
    setCorrectAnswers(0);
  };

  const handleAnswerSelection = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (selectedCategory && selectedQuestionIndex < categories[selectedCategory].length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    } else {
      setShowResult(true);

      // Update the user's balance
      fetch('/api/lae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error updating balance:', error));
    }
  };

  if (!selectedCategory) {
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Select a Category</h1>
        {Object.keys(categories).map(category => (
          <button
            key={category}
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
            onClick={() => handleCategorySelection(category)}
            className='capitalize'
          >
            {category}
          </button>
        ))}
      </div>
    );
  }

  const question = categories[selectedCategory][selectedQuestionIndex];

  if (showResult) {
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Quiz Completed</h1>
        <p style={resultStyle}>You answered {correctAnswers} questions correctly!</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle} className="capitalize">{selectedCategory} Quiz</h1>
      <p style={questionStyle}>{question.question}</p>
      {question.answers.map((answer: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
        <button
          key={index}
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          onClick={() => handleAnswerSelection(answer === question.correct)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Lae;
