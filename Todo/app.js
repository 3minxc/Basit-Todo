const todoList = document.getElementById("todo-list")
const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")


addEventListeners()

function addEventListeners(){

    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    todoList.addEventListener("click",deleteTodo)
}




function deleteTodoFromStorage(value){
    let todos = this.getTodosToStorage()

    todos.forEach((todo,index) => {
        if(todo == value){
            todos.splice(index,1)
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos))

}

function deleteTodo(e){
    let selected = e.target
    let sibling = selected.previousElementSibling.textContent
    if(selected.className == "fa-solid fa-xmark"){
        deleteTodoFromStorage(sibling)
        selected.parentElement.remove()
    }

}


function loadAllTodosToUI(){
    todos = getTodosToStorage()

    todos.forEach(todo => {
        addTodoToUi(todo)
    })

}

function getTodosToStorage(){
    let todos ;

    if(localStorage.getItem("todos") == null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}


function addTodoToStorage(value){
    let todos = this.getTodosToStorage()
    todos.push(value)
    localStorage.setItem("todos",JSON.stringify(todos))

}

function addTodoToUi(value){
    todoList.innerHTML += `
    <li class="todo-list-item">
    <h3>${value}</h3>
    <i class="fa-solid fa-xmark"></i>
    </li>
    `
}

function addTodo(e){
    let value = input.value.trim();
    addTodoToUi(value)
    addTodoToStorage(value)
    input.value = ""
    e.preventDefault()
}