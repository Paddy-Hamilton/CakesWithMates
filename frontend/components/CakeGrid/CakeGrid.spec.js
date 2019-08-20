import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { fakeCake } from "../../lib/testUtils";
import { CakeGridStyled } from "./index";
const cakes = [
  fakeCake("ASD123"),
  fakeCake("QWE234"),
  fakeCake("RTY456"),
  fakeCake("DFG567")
];

describe("<CakeGridStyled/>", () => {
  test("renders cake cards when has cakes array", async () => {
    const { container, getAllByTestId } = render(
      <CakeGridStyled cakes={cakes} />
    );
    expect(getAllByTestId("cakes-card")).toHaveLength(4);
  });
  test("renders no cakes info if no cakes in array", () => {
    const { getByText, rerender, queryByText } = render(
      <CakeGridStyled cakes={cakes} />
    );
    //* render with cakes , the no items info isn't shown
    expect(queryByText("No items do display")).not.toBeInTheDocument();
    //*rerender with empty array for cakes
    rerender(<CakeGridStyled cakes={[]} />);
    //* no items info should be shown
    expect(getByText("No items do display")).toBeInTheDocument();
  });
});
