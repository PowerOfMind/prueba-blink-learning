import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import Test from "./components/test";

const App = () => {
  const [isFinish, setIsFinish] = useState(false);
  const [test, setTest] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleClick = () => {
    setTest(true);
  };

  const handleFinish = () => {
    setIsFinish(true);
    setTest(false);
  };

  const handleResult = () => {
    setTest(true);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {test ? (
        <Test
          isFinish={isFinish}
          questions={questions}
          handleFinish={handleFinish}
        />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Button
            variant="primary"
            className="mb-3"
            onClick={handleClick}
            disabled={isFinish}
          >
            Realizar prueba
          </Button>
          <Button
            variant="secondary"
            onClick={handleResult}
            disabled={!isFinish}
          >
            Resultado del test
          </Button>
        </div>
      )}
    </Container>
  );
};

export default App;
