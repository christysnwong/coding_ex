import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function () {
  render(<BoxList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});


it("should add new boxes", function () {
  const { queryByText, queryAllByText, getByLabelText } = render(<BoxList />);

  const input = getByLabelText("Color");
  const btn = queryByText("Add Box");

  expect(queryByText("1")).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: "red" } });
  fireEvent.click(btn);
  fireEvent.click(btn);

  const divBox1 = queryByText("1");
  const divBox2 = queryByText("2");

  expect(queryByText("1")).toBeInTheDocument();
  expect(queryByText("2")).toBeInTheDocument();

  expect(divBox1).toHaveStyle(`
    width: 150px;
    height: 150px;
    background-color: red;
  `);

  expect(divBox2).toHaveStyle(`
    width: 150px;
    height: 150px;
    background-color: cyan;
  `);

  expect(queryAllByText("Remove")).toHaveLength(2);

});

it("should remove box", function() {
    const { queryByText } = render(<BoxList />);

    expect(queryByText("Remove")).not.toBeInTheDocument();

    const addBtn = queryByText("Add Box");
    fireEvent.click(addBtn);

    expect(queryByText("1")).toBeInTheDocument();
    expect(queryByText("Remove")).toBeInTheDocument();

    const removeBtn = queryByText("Remove");
    fireEvent.click(removeBtn);

    expect(queryByText("1")).not.toBeInTheDocument();
    expect(queryByText("Remove")).not.toBeInTheDocument();


})