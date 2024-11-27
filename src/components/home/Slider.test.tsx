import { render, screen } from "@testing-library/react";
import SimpleSlider from "./Slider";
import store from "../../redux/store";
import { Provider } from "react-redux";
describe("SimpleSlider", () => {
  it("should display loading state initially", async () => {
    render(
      <Provider store={store}>
        <SimpleSlider />
      </Provider>
    );
    const loadingElement = screen.getByTestId("simple-slider");
    expect(loadingElement).toBeInTheDocument();

    const isLoadingElement = screen.queryByTestId("simple-slider");
    expect(isLoadingElement).toBeInTheDocument();
  });

  it("should include three divs when test-id is 'filter-level'", async () => {
    render(
      <Provider store={store}>
        <SimpleSlider />
      </Provider>
    );
    const parentFilter = screen.getByTestId("filter-level");
    expect(parentFilter).toBeInTheDocument();

    const filterLevelDivs = parentFilter.querySelectorAll("div");
    expect(filterLevelDivs.length).toBe(6);
  });
});
