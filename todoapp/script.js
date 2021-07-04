const addNewForm = document.querySelector("#addnew-form");
const todoList = document.querySelector("#todos");
const searchbar = document.querySelector("#searchtext");
const notodos = document.querySelector("#notodos");
let selectedTodo = null;

//Functions
const generateTodoTemplate = todo => {

    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    const todoDescriptionP = document.createElement("p");
    todoDescriptionP.className = "todo-description";
    todoDescriptionP.appendChild(
        document.createTextNode(todo)
    );
    listItem.appendChild(todoDescriptionP);

    const deleteBtnIcon = document.createElement("i");
    deleteBtnIcon.classList.add("fa", "fa-trash", "delete-btn");
    deleteBtnIcon.setAttribute("aria-hidden", "true");

    listItem.appendChild(deleteBtnIcon);
    if (!notodos.classList.contains("filtered"))
        notodos.classList.add("filtered");

    return listItem;

};

const getTodosFromStorage = () => {
    let todos = localStorage.getItem("todos");
    if (todos !== null) {
        todos = JSON.parse(todos);
    }
    else {
        todos = [];
    }
    return todos;
}

const addTodoToStorage = todo => {
    const todos = getTodosFromStorage();
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));
}

const filterTodos = term => {
    Array.from(todoList.children)
        .forEach((item) => {
            if (!item.textContent.toLowerCase().includes(term.toLowerCase()))
                item.classList.add("filtered");
            else
                item.classList.remove("filtered");
        });

}



const removeTodo = todo => {
    localStorage.setItem("todos", JSON.stringify(getTodosFromStorage().filter(i => i !== todo.textContent)));
    todo.remove();
    if(Array.from(todoList).length === 0)
        notodos.className = "";

}
const hidePopup = () => {
    document.querySelector("#delete-confirm-overlay").className = "filtered";
    document.querySelector("#delete-confirm").style.animation = "";
}

// Event Listeners
////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    getTodosFromStorage().forEach(i => todoList.appendChild(generateTodoTemplate(i)));
});

addNewForm.addEventListener("submit", e => {
    e.preventDefault();
    const todo = addNewForm.newtodo.value.trim();
    if (todo.length) {
        addTodoToStorage(todo);
        todoList.appendChild(generateTodoTemplate(todo));
    }
    addNewForm.reset();
});

document.querySelector("#yes").addEventListener("click", () => {
    if (selectedTodo)
        removeTodo(selectedTodo);
    hidePopup();
});
document.querySelector("#no").addEventListener("click", hidePopup)

todoList.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
        document.querySelector("#delete-confirm-overlay").className = "";
        document.querySelector("#delete-confirm").style.animation = "popup .3s forwards 0s linear";
        selectedTodo = e.target.parentElement;
    }
    if (todoList.childElementCount == 0)
        notodos.classList.remove("filtered");
});

searchbar.addEventListener("keyup", () => {
    const searchTerm = searchbar.value.trim();
    filterTodos(searchTerm);
});