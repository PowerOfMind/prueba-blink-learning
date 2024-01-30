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

  it("calls onTestFinish when a radio button is clicked", () => {
    const { getByLabelText } = render(
      <Test
        questions={mockQuestions}
        onTestFinish={mockOnTestFinish}
        isTestFinished={false}
        userAnswersResults={mockUserAnswersResults}
        answers={mockAnswers}
      />
    );

    fireEvent.click(getByLabelText("Verdadero"));
    expect(mockOnTestFinish).toHaveBeenCalled();
  });
});
