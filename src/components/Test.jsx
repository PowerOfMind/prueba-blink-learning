import { useState } from "react";
import PropTypes from "prop-types";

const Test = ({
  questions,
  onTestFinish,
  isTestFinished,
  userAnswersResults,
  answers,
}) => {
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.preguntas.length).fill(null)
  );

  const handleFinish = () => {
    // Comprueba si todas las preguntas han sido contestadas
    const allQuestionsAnswered = userAnswers.every((answer) => answer !== null);

    if (allQuestionsAnswered) {
      // Si todas las preguntas han sido contestadas, llama a onTestFinish
      onTestFinish(userAnswers);
    } else {
      // Si no, muestra un mensaje de error
      alert("Por favor, contesta todas las preguntas antes de continuar.");
    }
  }
  const handleChange = (index, value) =>
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });

  console.log("resultados en test", userAnswersResults);

  return (
    <div className="container">
      <h1>{questions.bloque}</h1>
      <h2>{questions.temario}</h2>
      <hr />
      <h4>{questions.enunciado}</h4>
      <br />
      {questions.preguntas.map((question, index) => (
        <div key={index} className="question">
          <p>{question.pregunta}</p>
          {/* he tenido que duplicar el codigo porque no se quedaban guardadas
          mis respuestas al seleccionar las opciones */}
          {isTestFinished ? (
            <div>
              <input
                className="checkbox"
                type="radio"
                id={`${index}-true`}
                name={`question-${index}`}
                disabled={isTestFinished}
                onChange={() => handleChange(index, true)}
                checked={userAnswersResults[index] === true}
              />
              <label htmlFor={`${index}-true`}>Verdadero</label>
              <input
                className="checkbox"
                type="radio"
                id={`${index}-false`}
                name={`question-${index}`}
                disabled={isTestFinished}
                onChange={() => handleChange(index, false)}
                checked={userAnswersResults[index] === false}
              />
              <label htmlFor={`${index}-false`}>Falso</label>
            </div>
          ) : (
            <div>
              <input
                className="checkbox"
                type="radio"
                id={`${index}-true`}
                name={`question-${index}`}
                onChange={() => handleChange(index, true)}
              />
              <label htmlFor={`${index}-true`}>Verdadero</label>
              <input
                className="checkbox"
                type="radio"
                id={`${index}-false`}
                name={`question-${index}`}
                onChange={() => handleChange(index, false)}
              />
              <label htmlFor={`${index}-false`}>Falso</label>
            </div>
          )}
          {isTestFinished && (
            <div className="solucion" key={index}>
              {userAnswersResults[index] == answers[index] ? (
                <>
                  <p>{userAnswersResults[index]}</p>
                  <p>respuesta correcta</p>
                </>
              ) : (
                <p>respuesta incorrecta</p>
              )}
            </div>
          )}
        </div>
      ))}
      {!isTestFinished && (
        <button className="button" onClick={handleFinish}>
          Finalizar
        </button>
      )}
    </div>
  );
};

Test.propTypes = {
  questions: PropTypes.shape({
    bloque: PropTypes.string.isRequired,
    temario: PropTypes.string.isRequired,
    enunciado: PropTypes.string.isRequired,
    preguntas: PropTypes.arrayOf(
      PropTypes.shape({
        pregunta: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onTestFinish: PropTypes.func.isRequired,
  isTestFinished: PropTypes.bool.isRequired,
  userAnswersResults: PropTypes.arrayOf(PropTypes.bool).isRequired,
  answers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default Test;
