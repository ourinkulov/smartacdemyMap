import { render, screen } from "@testing-library/react";
import SciencePage from "../science/SciencePage";

describe("SciencePage", () => {
  it("should render SciencePage component without crashing", () => {
    const { container } = render(<SciencePage />);
    expect(container).toBeInTheDocument();
  });

  it("should render ScientificPotential component within its container", () => {
    render(<SciencePage />);
    const scientificPotentialComponent = screen.getByTestId(
      "scientific-potential"
    );
    expect(scientificPotentialComponent).toBeInTheDocument();
  });

  it("should render ScientificPotential component within its container", () => {
    render(<SciencePage />);
    const statsPotentialComponent = screen.getByTestId("stats-potential");
    expect(statsPotentialComponent).toBeInTheDocument();
  });
});
