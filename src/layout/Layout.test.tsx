import { screen, render } from "@testing-library/react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("./Sidebar", () => () => <div>Mocked Sidebar</div>);
jest.mock("./Topbar", () => () => <div>Mocked Topbar</div>);

describe("Layout Component", () => {
  const mockUseSelector = useSelector as jest.Mock;

  beforeEach(() => {
    mockUseSelector.mockClear();
  });

  it("should render the layout when the user is logged in", () => {
    mockUseSelector.mockReturnValue(true);

    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    const layoutWrapper = screen.getByTestId("layout-wrapper");
    expect(layoutWrapper).toBeInTheDocument();

    const childContent = screen.getByTestId("child-content");
    expect(childContent).toBeInTheDocument();
  });

  it("should not render the layout when the user is not logged in", () => {
    mockUseSelector.mockReturnValue(false);

    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    const layoutWrapper = screen.queryByTestId("layout-wrapper");
    expect(layoutWrapper).not.toBeInTheDocument();

    const childContent = screen.queryByTestId("child-content");
    expect(childContent).not.toBeInTheDocument();
  });
});
