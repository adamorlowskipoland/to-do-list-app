var todoList = {
    // array with tasks (todos)
    todos: [],
    
    // pushes in array task
    addTodo: function(todoText) {
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
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        //Case 1: if everything is true, make everything false
        if (completedTodos === totalTodos) {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        }
        // Case 2: make everything true
        else {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
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
    changeTodo: function () {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();
    },
    deleteTodo: function () {
        var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = "";
        view.displayTodos();
    },
    toggleCompleted: function () {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },
    
    // handlers for enter keydown FUTURE: add also for change, delete and toggleCompleted
    addEnter: function () {
        if (event.keyCode === 13) {
            this.addTodo();
        }
    },
};


// object with method displaying info from array to ul>li
// takes value from inputs in html
var view = {
    displayTodos: function () {
        var todosUl = document.querySelector("#List");
        todosUl.innerHTML = "";
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement("li");
            var todo = todoList.todos[i];
            var todoTextWithComplition = "";
            
            if (todo.completed === true) {
                todoTextWithComplition = "(x) " + todo.todoText;
            } else {
                todoTextWithComplition = "( ) " + todo.todoText;
            }
            
            todoLi.id = i;      // gives created li id
            todoLi.textContent = todoTextWithComplition;
            todoLi.appendChild(this.createDeleteBtn());     // creates new btn from CreateDeleteBtn method and append it to li
            todosUl.appendChild(todoLi);    // append li to ul
        }
    },
    createDeleteBtn: function () {
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.className = "deleteBtn";
        return deleteBtn;
    }
};






