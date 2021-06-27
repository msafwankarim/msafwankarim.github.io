const addNewForm = document.querySelector("#addnew-form");
const todoList = document.querySelector("#todos");
const searchbar = document.querySelector("#searchtext");
const notodos = document.querySelector("#notodos");



function generateTodoTemplate(todo) {

    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    const todoDescriptionP = document.createElement("p");
    todoDescriptionP.className = "todo-description";
    todoDescriptionP.appendChild(
        document.createTextNode(todo)
    );
    listItem.appendChild(todoDescriptionP);

    const deleteBtnIcon = document.createElement("i");
    deleteBtnIcon.classList.add("fa","fa-trash","delete-btn");
    deleteBtnIcon.setAttribute("aria-hidden", "true");

    listItem.appendChild(deleteBtnIcon);
    return listItem;

};

addNewForm.addEventListener("submit", e => {
    e.preventDefault();
    const todo = addNewForm.newtodo.value.trim();
    if (todo.length)
        todoList.appendChild(generateTodoTemplate(todo));
    notodos.classList.add("filtered");
    addNewForm.reset();
});

todoList.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn"))
        e.target.parentElement.remove();
    if (todoList.childElementCount == 0)
        notodos.classList.remove("filtered");
});

function filterTodos(term) {
    Array.from(todoList.children)
        .forEach((item) => {
            if (!item.textContent.toLowerCase().includes(term.toLowerCase()))
                item.classList.add("filtered");
            else
                item.classList.remove("filtered");   
        });

}

searchbar.addEventListener("keyup", e => {
    const searchTerm = searchbar.value.trim();
    filterTodos(searchTerm);
    
});