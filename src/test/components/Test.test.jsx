import { render, fireEvent } from "@testing-library/react";
import Test from "../../components/test";

describe("Test", () => {
  const mockQuestions = {
    bloque: "Bloque 1",
    temario: "Temario 1",
    enunciado: "Enunciado 1",
    preguntas: [
      { pregunta: "Pregunta 1", respuesta: true },
      { pregunta: "Pregunta 2", respuesta: false },
    ],
  };

  const mockOnTestFinish = jest.fn();
  const mockUserAnswersResults = [null, null];
  const mockAnswers = [true, false];

  it("renders without crashing", () => {
    render(
      <Test
        questions={mockQuestions}
        onTestFinish={mockOnTestFinish}
        isTestFinished={false}
        userAnswersResults={mockUserAnswersResults}
        answers={mockAnswers}
      />
    );
  });


  it("does not call onTestFinish when the finish button is clicked and not all questions are answered", () => {
    const { getByText } = render(
      <Test
        questions={mockQuestions}
        onTestFinish={mockOnTestFinish}
        isTestFinished={false}
        userAnswersResults={mockUserAnswersResults}
        answers={mockAnswers}
      />
    );

    fireEvent.click(getByText("Finalizar"));
    expect(mockOnTestFinish).not.toHaveBeenCalled();
  });
});
