import React, { useEffect, useState } from 'react';

const Lae: React.FC = () => {
  const [categories, setCategories] = useState<{ [key: string]: any[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [completedCategories, setCompletedCategories] = useState<Set<string>>(new Set());

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
    if (isCorrect) setCorrectAnswers(prev => prev + 1);
    
    if (selectedCategory && selectedQuestionIndex < categories[selectedCategory].length - 1) {
      setSelectedQuestionIndex(prev => prev + 1);
    } else {
      setShowResult(true);
      setCompletedCategories(new Set(completedCategories).add(selectedCategory!));

      fetch('/api/lae', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error updating balance:', error));
    }
  };

  if (!selectedCategory) {
    const availableCategories = Object.keys(categories).filter(category => !completedCategories.has(category));

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans">
        <h1 className="text-2xl font-bold mb-6">Select a Quiz</h1>
        {availableCategories.map(category => (
          <button
            key={category}
            className="px-4 py-2 m-2 text-lg font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition-colors capitalize gap-4"
            onClick={() => handleCategorySelection(category)}
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
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans">
        <h1 className="text-2xl font-bold mb-4">Quiz Completed</h1>
        <p className="text-lg font-semibold">You answered {correctAnswers} questions correctly!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans">
      <h1 className="text-2xl font-bold mb-4 capitalize">{selectedCategory} Quiz</h1>
      <p className="text-lg text-center mb-6">{question.question}</p>
      <div className="space-y-4">
        {question.answers.map((answer: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
          <button
            key={index}
            className="px-4 py-2 text-lg font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors mx-4"
            onClick={() => handleAnswerSelection(answer === question.correct)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lae;
