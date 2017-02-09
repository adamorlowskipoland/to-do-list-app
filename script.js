var todoList = {
    // array with tasks (todos)
    todos: [],
    
    // pushes in array task
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    // changes elements in array takse parameter - which elem (position) change for what (todoText)
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    
    
    // deletes tasks from array
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    
    
    // changes elemets completed prototype
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    
    
    // changes all elements completed prototypies
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        //getting number of completed todos
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        
        this.todos.forEach(function (todo) {
        //Case 1: if everything is true, make everything false
            if (completedTodos === totalTodos) {
                todo.completed = false;
        // Case 2: make everything true
            } else {
                todo.completed = true;
            }
        });
    }
};


// place where all the functions on array are coused
// runs on events in html file
var handlers = {
    displayTodos: function () {
        view.displayTodos();
    },
    addTodo: function () {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    changeTodo: function (position) {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function (position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },
};


// object with method displaying info from array to ul>li
// takes value from inputs in html
var view = {
    displayTodos: function () {
        var todosUl = document.querySelector("#List");
        todosUl.innerHTML = "";
        todoList.todos.forEach(function (todo, position) {
            var todoLi = document.createElement("li");
            var todoTextWithComplition = "";
            
            if (todo.completed === true) {
                todoTextWithComplition = "(x) " + todo.todoText;
                todoLi.style.textDecoration = "line-through";
            } else {
                todoTextWithComplition = "( ) " + todo.todoText;
            }
            
            todoLi.id = position;      // gives created li id
            todoLi.textContent = todoTextWithComplition;
            todoLi.appendChild(this.createDeleteBtn());     // creates new btn from CreateDeleteBtn method and append it to li
            todoLi.appendChild(this.createDoneBtn());
            todosUl.appendChild(todoLi);
            todosUl.appendChild(todoLi);    // append li to ul
        }, this);
    },
    createDeleteBtn: function () {
        var deleteBtn = document.createElement("span");
        deleteBtn.textContent = "X";
        deleteBtn.className = "deleteBtn close";
        return deleteBtn;
    },
    createDoneBtn: function () {
        var doneBtn = document.createElement("span");
        doneBtn.textContent = "D";
        doneBtn.className = "doneBtn";
        return doneBtn;
    },
    setUpEventListeners: function () {
        // toggleAll eventListener
        var btnToggleAll = document.getElementById("btnToggleAll");
        btnToggleAll.addEventListener('click', function () {
            handlers.toggleAll();
        });
        // delete eventListener on element that will be created (deleteBtn)
        var todosUl = document.querySelector("#List");
        todosUl.addEventListener('click', function () {
            var clickedElement = event.target;
            if (clickedElement.classList.contains("deleteBtn")) {
                handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
            }
        });
        todosUl.addEventListener('click', function () {
            var clickedElement = event.target;
            if (clickedElement.classList.contains("doneBtn")) {
                handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
            }
        });
    // eventListener for keydown
        var addInput = document.getElementById("addTodoTextInput");
        addInput.addEventListener('keydown', function () {
            if (event.keyCode === 13) {
                handlers.addTodo();
            }
        });
    }
};
view.setUpEventListeners();





