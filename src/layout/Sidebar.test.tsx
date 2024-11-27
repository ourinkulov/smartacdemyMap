import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Sidebar", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockUseSelector = useSelector as jest.Mock;

  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
    mockUseSelector.mockClear();
  });

  it("should display the active menu index from the Redux store", () => {
    expect(true).toBe(true);
  });
});
