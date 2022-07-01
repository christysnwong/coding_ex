import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CoinContainer from "./CoinContainer";

// this test is written for 4 coins flip

beforeEach(function () {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.75)
    .mockReturnValue(0.25);
});

afterEach(function () {
  Math.random.mockRestore();
});

it("renders without crashing", function () {
  render(<CoinContainer />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<CoinContainer />);
  expect(asFragment()).toMatchSnapshot();
});

it("doesn't show a coin on page load", function() {
    const { queryByAltText } = render(<CoinContainer />);

    expect(queryByAltText("head")).not.toBeInTheDocument();
    expect(queryByAltText("tail")).not.toBeInTheDocument();

});


it("counts heads properly", function () {
  const { getByText, queryAllByAltText } = render(<CoinContainer />);

  const button = getByText("Flip!");
  fireEvent.click(button);

  expect(queryAllByAltText("head")).toHaveLength(4);
  expect(queryAllByAltText("tail")).toHaveLength(0);
  expect(getByText("Out of 1 flip(s), there are 4 heads and 0 tails.")).toBeInTheDocument();
});

it("counts tails properly", function () {
  const { getByText, queryAllByAltText } = render(<CoinContainer />);

  const button = getByText("Flip!");
  fireEvent.click(button);
  fireEvent.click(button);

  screen.logTestingPlaygroundURL();

  expect(queryAllByAltText("head")).toHaveLength(3);
  expect(queryAllByAltText("tail")).toHaveLength(1);
  expect(
    getByText("Out of 2 flip(s), there are 7 heads and 1 tails.")
  ).toBeInTheDocument();
});