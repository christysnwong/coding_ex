import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(list) {
    const input = list.getByLabelText("Task");
    const addBtn = list.getByText("Add");

    fireEvent.change(input, { target: { value: "mop floor" } });
    fireEvent.click(addBtn);
};

it("renders without crashing", function () {
  render(<TodoList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("shows add form correctly", function() {
    const { getByText, getByLabelText } = render(<TodoList />);
    expect(getByText("Add")).toBeInTheDocument();
    expect(getByLabelText("Task")).toBeInTheDocument();
})

it("adds task", function() {
    const list = render(<TodoList />);
    addTodo(list);

    expect(list.getByText("mop floor", {exact: false})).toBeInTheDocument();
    expect(list.getByText("X")).toBeInTheDocument();
    expect(list.getByText("Update")).toBeInTheDocument();
    expect(list.getByText("Mark as completed")).toBeInTheDocument();

});

it("marks task completed", function() {
    const list = render(<TodoList />);
    addTodo(list);

    const spanTask = list.getByText("- mop floor");
    const markBtn = list.getByText("Mark as completed");
    fireEvent.click(markBtn);

    expect(spanTask).toHaveClass("marked");

})


it("removes task", function() {
    const list = render(<TodoList />);
    addTodo(list);

    expect(list.getByText("- mop floor")).toBeInTheDocument();

    const removeBtn = list.getByText("X");
    fireEvent.click(removeBtn);

    expect(list.queryByText("- mop floor")).not.toBeInTheDocument();


})


it("shows edit form and edits correctly", function() {
    const list = render(<TodoList />);
    addTodo(list);

    const updateBtn = list.getByText("Update");
    fireEvent.click(updateBtn);

    const editInput = list.getByLabelText("Change");

    const editBtn = list.getByText("Edit");
    expect(editBtn).toBeInTheDocument();

    fireEvent.change(editInput, { target: { value: "vacuum floor" } });
    fireEvent.click(editBtn);

    expect(list.queryByText("- vacuum floor")).toBeInTheDocument();

})

