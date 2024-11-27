import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react"; // Import your reducer

import store from "../../redux/store";
import HomePage from "../HomePage";

describe("HomePage", () => {
  it("should render the SimpleSlider component within the div with correct padding and height", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const divElement = screen.getByTestId("home-page-div");
    expect(divElement).toBeInTheDocument();

    const sliderElement = screen.getByTestId("simple-slider");
    expect(sliderElement).toBeInTheDocument();
  });
});
