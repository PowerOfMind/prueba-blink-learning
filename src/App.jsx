import { useState, useEffect } from "react";
import Test from "./components/test";

const App = () => {
  const [test, setTest] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setAnswers(data.preguntas.map((question) => question.respuesta));
      })
      .catch(console.error);
  }, []);

  const handleClick = () => setTest(true);
  const handleTestFinish = (answers) => {
    setTest(false);
    setIsTestFinished(true);
    setUserAnswers(answers);
  };

  const handleViewResults = () => {
    console.log(userAnswers); // Aquí está el console.log
    setTest(true);
  };


  return (
    <div className="container">
      {test ? (
        <Test
          questions={questions}
          onTestFinish={handleTestFinish}
          isTestFinished={isTestFinished}
          userAnswersResults={userAnswers}
          answers={answers}
        />
      ) : (
        <div className="center">
          <button
            className="button"
            onClick={handleClick}
            disabled={isTestFinished}
          >
            Realizar prueba
          </button>
          <button
            className="button"
            onClick={handleViewResults}
            disabled={!isTestFinished}
          >
            Ver resultado
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
