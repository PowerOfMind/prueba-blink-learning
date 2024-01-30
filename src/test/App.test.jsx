import { render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it('renders the "Realizar prueba" button', () => {
    const { getByText } = render(<App />);
    const button = getByText("Realizar prueba");
    expect(button).toBeInTheDocument();
  });

  it('renders the "Ver resultado" button', () => {
    const { getByText } = render(<App />);
    const button = getByText("Ver resultado");
    expect(button).toBeInTheDocument();
  });

  it('calls handleClick when "Realizar prueba" button is clicked', () => {
    const { getByText } = render(<App />);
    const button = getByText("Realizar prueba");
    fireEvent.click(button);
    // Aquí deberías verificar que se ha llamado a la función handleClick.
    // Esto puede ser complicado porque handleClick es una función interna de App.
    // Podrías necesitar refactorizar tu código para hacer esto más fácil de probar.
  });

  it('calls handleViewResults when "Ver resultado" button is clicked', () => {
    const { getByText } = render(<App />);
    const button = getByText("Ver resultado");
    fireEvent.click(button);
    // Al igual que con handleClick, probar esto puede ser complicado porque handleViewResults es una función interna de App.
  });
});
