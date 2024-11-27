import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { Provider } from "react-redux";
import store from "../../redux/store";

jest.mock("../../utils/Particles", () => () => (
  <div>Mocked Child Component</div>
));
jest.mock("../../components/auth/Login", () => () => (
  <div>Mocked Child Component</div>
));

describe("renders Loginpage", () => {
  it("login test", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const container = screen.getByTestId("login-container");
    expect(container).toBeInTheDocument();
    const innerContainer = screen.getByTestId("login-inner-container");
    expect(innerContainer).toBeInTheDocument();
  });
});
