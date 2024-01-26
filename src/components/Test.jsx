import React from "react";
import { Button, Form } from "react-bootstrap";

const Test = ({ isFinish, questions, handleFinish }) => {
  const handleClick = () => {
    handleFinish();
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="mb-3">
          <p>{question.pregunta}</p>
          <Form.Check type="radio" label="Verdadero" />
          <Form.Check type="radio" label="Falso" />
        </div>
      ))}
      <Button variant="primary" className="mb-3" onClick={handleClick}>
        Finalizar
      </Button>
    </div>
  );
};

export default Test;
