import { render, fireEvent } from "@testing-library/react";
import App from "../App";


describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it('calls handleViewResults when "Realizar prueba" button is clicked', () => {
    const { getByText } = render(<App />);
    const button = getByText("Realizar prueba");
    fireEvent.click(button);
  });

  it('calls handleViewResults when "Ver resultado" button is clicked', () => {
    const { getByText } = render(<App />);
    const button = getByText("Ver resultado");
    fireEvent.click(button);});
});
