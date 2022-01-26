const addButton = document.querySelector(".input-box button");
const todoList = [];

const pushTodoToHtml = (todo) => {
  const todoListTag = document.querySelector(".todo-list");
  const divNode = document.createElement("div");

  divNode.setAttribute("class", "todo");
  divNode.setAttribute("data-key", todo.id); // custom data key

  divNode.innerHTML = `
    <div>
      <div class="category">
        <div>${todo.category}</div>
        <div class="buttons">
          <span class="done-button">V</span>
          <span class="cancel-button">X</span>
        </div>
      </div>
      <p class="text">${todo.text}</p>
    </div>
    <div class="time">${getTodaysDate()}</div>
  `;

  const doneButton = divNode.querySelector(".done-button");
  doneButton.addEventListener("click", () => doneButtonClickHandler(divNode));
  const cancelButton = divNode.querySelector(".cancel-button");

  todoListTag.append(divNode);
};

const doneButtonClickHandler = (todoElement) => {
  todoElement.classList.toggle("done-item");
};

const getTodaysDate = () => {
  const today = new Date();
  const years = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = addZeroBeforeNumber(month);
  day = addZeroBeforeNumber(day);

  return `${years}-${month}-${day}`;
};

const addZeroBeforeNumber = (number) => {
  return number <= 9 ? `0${number}` : number;
};

const handleAddTodoItem = () => {
  const selectInput = document.querySelector("#categories");
  const textInput = document.querySelector("input[name=text]");

  if (textInput.value.length >= 3) {
    const todo = {
      text: textInput.value,
      category: selectInput.value,
      id: new Date().valueOf(),
    };

    todoList.push(todo);
    pushTodoToHtml(todo);
    textInput.value = "";
  } else {
    alert("Todo should be longer than 3 chars!");
  }
};

addButton.addEventListener("click", handleAddTodoItem);
