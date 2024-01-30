import { useState, useEffect } from "react";
import Test from "./components/test";

const App = () => {
  const [test, setTest] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);

  //* en este useEffect consumo el json con el contenido del test
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
    //? este log lo dejo comentado para hacer pruebas
    //? console.log(userAnswers);
    setTest(true);
  };


  return (
    <div className="container">
      {test && questions ? (
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
