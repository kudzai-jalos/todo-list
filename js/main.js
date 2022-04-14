const checkCircleElement = document.createElement("span");
checkCircleElement.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
`;
checkCircleElement.classList.add("check-icon");
checkCircleElement.src = "../images/circle-check-solid.svg";

const jsonData = localStorage.getItem("todos");

let todos = [];

const createTodo = (todo) => {
  const list = document.getElementById("todo-list");
  const listItem = document.createElement("li");

  listItem.id = todo.id;

  listItem.innerText = todo.text;
  listItem.appendChild(checkCircleElement.cloneNode(true));
  listItem.addEventListener("click", () => {
    removeTodo(todo.id);
  });
  list.appendChild(listItem);
};

const saveList = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  if (todos.length===0) {
    localStorage.removeItem("todos")
  }
};

const removeTodo = (id) => {
  const listItem = document.getElementById(id);
  listItem.classList.add("completed")
  setTimeout(() => {
    listItem.remove();

    todos = todos.filter((todo) => todo.id !== id);
    saveList();
  }, 500);
};

const addTodo = (event) => {
  event.preventDefault();
  const input = document.getElementById("text");
  const text = input.value;
  if (text.trim() === "") {
    return alert("Please enter a todo");
  }
  const id = Math.random().toString();
  const todo = {
    text,
    id,
  };
  createTodo(todo);
  todos.push(todo);
  input.value = "";
  saveList();
};

const clearList = () => {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos = [];
  saveList();
};

const newTodoForm = document.getElementById("new-todo-form");
newTodoForm.addEventListener("submit", addTodo);

if (jsonData) {
  todos = JSON.parse(jsonData);
} else {
  const todo1 = {
    id: "Todo instuction #1",
    text: "Add a new item by clicking the + button or clicking enter",
  };
  const todo2 = {
    id: "Todo instuction #1",
    text: "Delete an item by clicking on it",
  };
  todos.push(todo1, todo2);
}

const list = document.getElementById("todo-list");
todos.forEach((todo) => {
  createTodo(todo);
});
