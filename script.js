

var todoList = {
    // array with tasks (todos)
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    
    // pushes in array task
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        localStorage.setItem('todos', JSON.stringify(this.todos));
    },

    // changes elements in array takse parameter - which elem (position) change for what (todoText)
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    
    
    // deletes tasks from array
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
        handlers.setItem();
    },
    
    
    // changes elemets completed prototype
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        handlers.setItem();
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
//        localStorage.setItem('todos', JSON.stringify(this.todos));
        handlers.setItem();
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
    setItem: function () {
        localStorage.setItem('todos', JSON.stringify(todoList.todos));
        view.displayTodos();
    },
    deleteAll: function () {
        todoList.todos = [];
        localStorage.removeItem('todos');
        view.displayTodos();
    }
};


// object with method displaying info from array to ul>li
// takes value from inputs in html
var view = {
    displayTodos: function () {
//        var allTogglebtn = document.getElementsByClassName('toggleBtn');
//        allTogglebtn.forEach(function (p) {
//            p.classList.remove('active');
//        })
//        var all = document.getElementById('all');
//        all.classList.add('active');
        var btnToggleAll = document.getElementById('btnToggleAll');
        var toggleBtns = document.getElementById('toggleBtns');
        if (todoList.todos.length !== 0) {
            toggleBtns.style.display = "block";
            btnToggleAll.style.display = "block";
        } else {
            toggleBtns.style.display = "none";
            btnToggleAll.style.display = "none";
        }
        var todosUl = document.querySelector("#List");
        var sendSection = document.querySelector("#sendSection");
        todosUl.innerHTML = "";
        sendSection.innerHTML = "";
        
        todoList.todos.forEach(function (todo, position) {
            var todoP = document.createElement("p");
            var todoLi = document.createElement("li");
            
            var doneBtn;
            var todoTextWithComplition = "";
            
            if (todo.completed === true) {
                todoTextWithComplition = todo.todoText;
                todoP.style.textDecoration = "line-through";
                todoLi.style.opacity = ".4";
                doneBtn = this.createDoneBtnChecked();
            } else {
                todoTextWithComplition = todo.todoText;
                doneBtn = this.createDoneBtnCheck();
            }
            
            todoLi.id = position;      // gives created li id
            todoP.textContent = todoTextWithComplition;
            todoLi.appendChild(this.createDeleteBtn());     // creates new btn from CreateDeleteBtn method and append it to li
            todoLi.appendChild(doneBtn);
            todoLi.appendChild(todoP);
            todosUl.appendChild(todoLi);    // append li to ul
            

        }, this);
        var lis = document.querySelectorAll("li");
        var lisLength = lis.length;
        // if ul is not empty show section with sendBtn
        if (lisLength > 0) {
            sendSection.appendChild(this.createSendBtn());
        } else {
            sendSection.innerHTML = "";
        }
    },
    displayDoneTodos: function () {
//        var allTogglebtn = document.getElementsByClassName('toggleBtn');
//        allTogglebtn.forEach(function (p) {
//            p.classList.remove('active');
//        })
//        var completed = document.getElementById('completed');
//        completed.classList.add('active');
        var btnToggleAll = document.getElementById('btnToggleAll');
        var toggleBtns = document.getElementById('toggleBtns');
        if (todoList.todos.length !== 0) {
            toggleBtns.style.display = "block";
            btnToggleAll.style.display = "block";
        } else {
            toggleBtns.style.display = "none";
            btnToggleAll.style.display = "none";
        }
        var todosUl = document.querySelector("#List");
        var sendSection = document.querySelector("#sendSection");
        todosUl.innerHTML = "";
        sendSection.innerHTML = "";
        
        todoList.todos.forEach(function (todo, position) {
            var doneBtn;
            var todoTextWithComplition = "";
            if (todo.completed === true) {
                var todoP = document.createElement("p");
                var todoLi = document.createElement("li");
                todoTextWithComplition = todo.todoText;
                todoP.style.textDecoration = "line-through";
                todoLi.style.opacity = ".4";
                doneBtn = this.createDoneBtnChecked();
                todoLi.id = position;      // gives created li id
                todoP.textContent = todoTextWithComplition;
                todoLi.appendChild(this.createDeleteBtn());     // creates new btn from CreateDeleteBtn method and append it to li
                todoLi.appendChild(doneBtn);
                todoLi.appendChild(todoP);
                todosUl.appendChild(todoLi);    // append li to ul
            } 
        }, this);
        var lis = document.querySelectorAll("li");
        var lisLength = lis.length;
        // if ul is not empty show section with sendBtn
        if (lisLength > 0) {
            sendSection.appendChild(this.createSendBtn());
        } else {
            sendSection.innerHTML = "";
        }
    },
    displayInProgressTodos: function () {
//        var allTogglebtn = document.getElementsByClassName('toggleBtn');
//        allTogglebtn.forEach(function (p) {
//            p.classList.remove('active');
//        })
//        var inProgress = document.getElementById('inProgress');
//        inProgress.classList.add('active');
        var btnToggleAll = document.getElementById('btnToggleAll');
        var toggleBtns = document.getElementById('toggleBtns');
        if (todoList.todos.length !== 0) {
            toggleBtns.style.display = "block";
            btnToggleAll.style.display = "block";
        } else {
            toggleBtns.style.display = "none";
            btnToggleAll.style.display = "none";
        }
        var todosUl = document.querySelector("#List");
        var sendSection = document.querySelector("#sendSection");
        todosUl.innerHTML = "";
        sendSection.innerHTML = "";
        
        todoList.todos.forEach(function (todo, position) {
            var doneBtn;
            var todoTextWithComplition = "";
            if (todo.completed !== true) {
                var todoP = document.createElement("p");
                var todoLi = document.createElement("li");
                todoTextWithComplition = todo.todoText;
                doneBtn = this.createDoneBtnCheck();
                todoLi.id = position;      // gives created li id
                todoP.textContent = todoTextWithComplition;
                todoLi.appendChild(this.createDeleteBtn());     // creates new btn from CreateDeleteBtn method and append it to li
                todoLi.appendChild(doneBtn);
                todoLi.appendChild(todoP);
                todosUl.appendChild(todoLi);    // append li to ul
            }
        }, this);
        var lis = document.querySelectorAll("li");
        var lisLength = lis.length;
        // if ul is not empty show section with sendBtn
        if (lisLength > 0) {
            sendSection.appendChild(this.createSendBtn());
        } else {
            sendSection.innerHTML = "";
        }
        
    },    
    createDeleteBtn: function () {
        var deleteBtn = document.createElement("span");
        deleteBtn.textContent = "X";
        deleteBtn.className = "deleteBtn close";
        return deleteBtn;
    },
    createDoneBtnCheck: function () {
        var doneI = document.createElement("i");
        var doneBtn = document.createElement("span");
        doneI.className = "fa fa-circle-thin";
//        doneBtn.textContent = "done:";
        doneBtn.className = "doneBtn";
        doneBtn.appendChild(doneI);
        return doneBtn;
    },
    createDoneBtnChecked: function () {
        var doneI = document.createElement("i");
        var doneBtn = document.createElement("span");
        doneI.className = "fa fa-check";
//        doneBtn.textContent = "done:";
        doneBtn.className = "doneBtn";
        doneBtn.appendChild(doneI);
        return doneBtn;
    },
    createSendBtn: function () {
        var sendSection = document.getElementById("sendSection");
        var sendBtn = document.createElement("p");
        sendBtn.className = "sendBtn";
//        sendBtn.id = "trigger"; //needed to modal plugin 
        sendBtn.textContent = "share list";
        sendBtn.setAttribute("type", "button");
        return sendBtn;
    },
    setUpEventListeners: function () {
        // toggleAll eventListener
        var btnToggleAll = document.getElementById("btnToggleAll");
        btnToggleAll.addEventListener('click', function () {
            handlers.toggleAll();
        }, false);
        // delete eventListener on element that will be created (deleteBtn)
        var todosUl = document.querySelector("#List");
        todosUl.addEventListener('click', function (event) {
            var clickedElement = event.target;
            if (clickedElement.classList.contains("deleteBtn")) {
                handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
            }
        }, false);
        // toggleCompleted eventListener on element that will be created (doneBtn)
        todosUl.addEventListener('click', function (event) {
            // catches parent of clicked element
            var clickedElementParent = event.target.parentNode;
            
            if (clickedElementParent.classList.contains("doneBtn")) {
                handlers.toggleCompleted(parseInt(clickedElementParent.parentNode.id));
            }
        }, false);
    // eventListener for keydown
        var addInput = document.getElementById("addTodoTextInput");
        addInput.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                if (addInput.value) {
                    handlers.addTodo();
                } else {
                    return;
                }
            }
        }, false);
        var showAll = document.getElementById('all');
        showAll.addEventListener('click', function () {
            view.displayTodos();
        }, false);
        var showCompleted = document.getElementById('completed');
        showCompleted.addEventListener('click', function () {
            view.displayDoneTodos();
        });
        var showInProgress = document.getElementById('inProgress');
        showInProgress.addEventListener('click', function () {
            view.displayInProgressTodos();
        });
        var deleteAll = document.getElementById("deleteAll");
        deleteAll.addEventListener('click', function () {
            handlers.deleteAll();
        }, false);
    }
};
view.setUpEventListeners();
(function IIWC() {
    view.displayTodos();
})();