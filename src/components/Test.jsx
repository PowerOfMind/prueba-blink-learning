import { useState } from "react";
import PropTypes from "prop-types";

const Test = ({
  questions,
  onTestFinish,
  isTestFinished,
  userAnswersResults,
  answers,
}) => {
  //* inicializo este state asignandole el espacio que ocuparan las futuras respuestas del usuario
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
  };
  const handleChange = (index, value) =>
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  //? este log lo dejo comentado para hacer pruebas
  //? console.log("resultados en test", userAnswersResults);

  return (
    <div className="container">
      <div className="encabezado">
        <h4>{questions.bloque}</h4>
        <h5>{questions.temario}</h5>
      </div>

      <hr />
      <h4 className="enunciado">{questions.enunciado}</h4>
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
              <label
                htmlFor={`${index}-true`}
                style={
                  userAnswersResults[index] === true
                    ? {
                        textDecoration: "underline",
                        textDecorationStyle: "wavy",
                        textDecorationColor:
                          answers[index] === true ? "green" : "red",
                      }
                    : {}
                }
              >
                Verdadero
              </label>
              <input
                className="checkbox"
                type="radio"
                id={`${index}-false`}
                name={`question-${index}`}
                disabled={isTestFinished}
                onChange={() => handleChange(index, false)}
                checked={userAnswersResults[index] === false}
              />
              <label
                htmlFor={`${index}-false`}
                style={
                  userAnswersResults[index] === false
                    ? {
                        textDecoration: "underline",
                        textDecorationStyle: "wavy",
                        textDecorationColor:
                          answers[index] === false ? "green" : "red",
                      }
                    : {}
                }
              >
                Falso
              </label>
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
