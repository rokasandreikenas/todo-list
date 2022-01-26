const addButton = document.querySelector(".input-box button");
const todoList = [];

const pushTodoToHtml = (todo) => {};

const handleAddTodoItem = () => {
  const selectInput = document.querySelector("#categories");
  const textInput = document.querySelector("input[name=text]");

  if (textInput.value.length >= 3) {
    const todo = textInput.value;

    todoList.push(todo);
    pushTodoToHtml(todo);
    textInput.value = "";
  } else {
    alert("Todo should be longer than 3 chars!");
  }
};

addButton.addEventListener("click", handleAddTodoItem);
