const addButton = document.querySelector(".input-box button");
const todoList = JSON.parse(localStorage.getItem("todo-list")) || [];

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

  if (todo.isDone) {
    divNode.classList.add("done-item");
  }

  const doneButton = divNode.querySelector(".done-button");
  doneButton.addEventListener("click", () =>
    doneButtonClickHandler(divNode, todo)
  );
  const cancelButton = divNode.querySelector(".cancel-button");

  todoListTag.append(divNode);
};

const doneButtonClickHandler = (todoElement, todo) => {
  const index = todoList.findIndex((t) => t.id === todo.id); // surandam indexa

  todo.isDone = !todo.isDone; // pakeiciam duomenis
  todoList[index] = todo; // nustatom nauja todo i seno vieta

  localStorage.setItem("todo-list", JSON.stringify(todoList)); // nustatom nauja todolist i localstorage
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
      isDone: false,
    };

    todoList.push(todo);
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    pushTodoToHtml(todo);
    textInput.value = "";
  } else {
    alert("Todo should be longer than 3 chars!");
  }
};

addButton.addEventListener("click", handleAddTodoItem);
todoList.forEach(pushTodoToHtml);
