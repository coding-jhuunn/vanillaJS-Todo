const btnAdd = document.querySelector('.add-btn');
const itemList = document.querySelector('.item-list');
const todoInput = document.querySelector('.todo-input');
const filterOption = document.querySelector(".filter-todo");
const errorType = document.querySelector('.errorType');

filterOption.addEventListener("click", filterTodo)
itemList.addEventListener('click',deleteTodo);
btnAdd.addEventListener('click',addTodo);
document.addEventListener("DOMContentLoaded", retrieveLocalTodos);

function addTodo(){
  if(!todoInput.value){
    errorType.innerText="Your input is empty. Please enter a value.";
  }
  else{
    function checkDoubleItem(){
      let todos;
      if(localStorage.getItem("todos")===null){
          todos =[]
      }
      else{
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      for (let i=0; i<todos.length; i++){
        if(todos[i]===todoInput.value){
          return true;
        }
     
      }
      return false;
    }
    if(checkDoubleItem()){
      errorType.innerText="Your input is already exists. Please enter another value.";
    }
    else{
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const el = document.createElement('li');
    el.innerText = todoInput.value;
    todoDiv.appendChild(el);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
    const btnDelete = document.createElement('button');
    btnDelete.innerText = "Delete";
    btnDelete.classList.add('delete-btn');
    todoDiv.appendChild(btnDelete);
    const btnComplete = document.createElement('button');
    btnComplete.innerText = "Complete";
    btnComplete.classList.add('complete-btn');
    todoDiv.appendChild(btnComplete);
    itemList.appendChild(todoDiv);
    errorType.innerText="";
    }
  }
}
function filterTodo(e) {
    const todos = itemList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
}
function deleteTodo(e){
    const item = e.target
    if(item.classList[0]==="delete-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);

          todo.remove();
     

    }
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos =[]
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos =[]
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function retrieveLocalTodos(){
    todoInput.value = "";
    let todos;
    if(localStorage.getItem("todos")===null){
        todos =[]
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(item){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const el = document.createElement('li');
        el.innerText = item;
        todoDiv.appendChild(el);
        const btnDelete = document.createElement('button');
        btnDelete.innerText = "Delete";
        btnDelete.classList.add('delete-btn');
        todoDiv.appendChild(btnDelete);
        const btnComplete = document.createElement('button');
        btnComplete.innerText = "Complete";
        btnComplete.classList.add('complete-btn');
        todoDiv.appendChild(btnComplete);
        itemList.appendChild(todoDiv);
    })
}