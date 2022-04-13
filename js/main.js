const jsonData = localStorage.getItem("todos");

let todos = [];

if (jsonData) {
  todos = JSON.parse(jsonData);
  const list = document.getElementById("todo-list");
  if (jsonData) {
    todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.id = todo.id;

      listItem.innerText = todo.text;
      listItem.addEventListener("click", () => {
        removeTodo(todo.id);
      });
      list.appendChild(listItem);
    });
  }
}
const saveList = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};


const removeTodo = (id) => {
  const listItem = document.getElementById(id);
  listItem.remove();
  
  todos = todos.filter((todo) => todo.id !== id);
  saveList();
};

const addTodo = (event) => {
  event.preventDefault();
  const list = document.getElementById("todo-list");

  const input = document.getElementById("text");

  const text = input.value;
  // console.log(text);

  if (text.trim()==="") {
    return alert("Please enter a todo")
  }

  const id = Math.random().toString();
  const listItem = document.createElement("li");
  listItem.id = id;
  listItem.innerText = text;
  listItem.addEventListener("click", () => {
    removeTodo(id);
  });
  list.appendChild(listItem);
  todos.push({
    text,
    id,
  });
  input.value = "";
  saveList();
};

const newTodoForm = document.getElementById("new-todo-form");
newTodoForm.addEventListener("submit", addTodo);

const clearList = () => {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
};
