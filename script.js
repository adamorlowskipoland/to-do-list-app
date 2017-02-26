

var todoList = {
    // array with tasks (todos)
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    
    // pushes in array task
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        handlers.setItem();
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
        var completed = document.getElementById('completed');
        var inProgress = document.getElementById('inProgress');
        if (inProgress.classList.contains('active')) {
            view.displayInProgressTodos();
        } else if (completed.classList.contains('active')) {
            view.displayDoneTodos();
        } else {
            view.displayTodos();
        }
    },
    addTodo: function () {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        this.displayTodos();
    },
    changeTodo: function (position) {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        this.displayTodos();
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        this.displayTodos();
    },
    toggleCompleted: function (position) {
        todoList.toggleCompleted(position);
        this.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        this.displayTodos();
    },
    setItem: function () {
        localStorage.setItem('todos', JSON.stringify(todoList.todos));
        this.displayTodos();
    },
    deleteAll: function () {
        todoList.todos = [];
        localStorage.removeItem('todos');
        this.displayTodos();
    },
    sendSubmit: function () {
//        evt.preventDefault();
//        
//        var emailAddress = document.getElementById('email').value;
//        var listToSend = document.getElementById('listToSend').value;
//        var emailMessage = document.getElementById('message').value;
//        var emailContent = emailMessage + "\n" + listToSend;
//        
//        window.location.href = "mailto:" + emailAddress + encodeURIComponent(emailContent); 
        
        var sendList = document.getElementById('sendList');
        var email = document.getElementById('email').value;
        var address = "mailto:" + email;
        sendList.setAttribute("action", address);
        view.closeModal();
    }
};


// object with method displaying info from array to ul>li
// takes value from inputs in html
var view = {
    displayTodos: function () {
        var allDisplayBtns = document.querySelectorAll('.toggleBtn');
        allDisplayBtns.forEach(function (p) {
            p.classList.remove('active');
        })
        var all = document.getElementById('all');
        all.classList.add('active');
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
        var sendBtn = document.getElementById('sendBtn');
        var lis = document.querySelectorAll("li");
        var lisLength = lis.length;
        // if ul is not empty show section with sendBtn
        if (lisLength > 0) {
            sendBtn.style.display = 'inline';
        } else {
            sendBtn.style.display = 'none';
        }
    },
    displayDoneTodos: function () {
        var allDisplayBtns = document.querySelectorAll('.toggleBtn');
        allDisplayBtns.forEach(function (p) {
            p.classList.remove('active');
        })
        var completed = document.getElementById('completed');
        completed.classList.add('active');
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
        
        todoList.todos.forEach(function (todo, position) {
//            var doneBtn;
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
        var sendBtn = document.getElementById('sendBtn');
        var lis = document.querySelectorAll("li");
        var lisLength = lis.length;
        // if ul is not empty show section with sendBtn
        if (lisLength > 0) {
            sendBtn.style.display = 'inline';
        } else {
            sendBtn.style.display = 'none';
        }
    },
    displayInProgressTodos: function () {
        var allDisplayBtns = document.querySelectorAll('.toggleBtn');
        allDisplayBtns.forEach(function (p) {
            p.classList.remove('active');
        })
        var inProgress = document.getElementById('inProgress');
        inProgress.classList.add('active');
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
        
        todoList.todos.forEach(function (todo, position) {
//            var doneBtn;
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
        var sendBtn = document.getElementById('sendBtn');
        var lis = document.querySelectorAll("li");
        var lisLength = lis.length;
        // if ul is not empty show section with sendBtn
        if (lisLength > 0) {
            sendBtn.style.display = 'inline';
        } else {
            sendBtn.style.display = 'none';
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
    openModal: function () {
        var modal = document.getElementById('modal');
        modal.classList.add('modal--active');
        document.getElementById('email').focus();
    },
    closeModal: function () {
        var modal = document.getElementById('modal');
        var email = document.getElementById('email');
        var listToSend = document.getElementById('listToSend');
        var message = document.getElementById('message');
        email.textContent = "";
        listToSend.textContent = "";
        message.textContent = "";
        modal.classList.remove('modal--active');
    },
    putList: function () {
        var listToSend = document.getElementById('listToSend');
        
        var lisToPut = document.querySelectorAll('#List > li');
        lisToPut.forEach(function (li) {
            listToSend.textContent += "- " + li.lastChild.textContent + "\n";
        })
        
        
        
//        var listToSend = document.getElementById('listToSend');
//        
//        var lisToPut = document.querySelectorAll('#List > li');
////        var lisToSend = document.querySelectorAll('.ul > li');
//        var liToPut = [];
////        var liToSend = [];
//        lisToPut.forEach(function (li) {
//            liToPut.push(li.lastChild.textContent);
//        })
//        console.log(liToPut);
//        liToPut.forEach(function (el) {
//            var listToSendLi = document.createElement('li');
//            listToSendLi.textContent = el;
//            listToSend.appendChild(listToSendLi);
//        })
        
        
        
//        lisToSend.forEach(function(li) {            
//            var liToSend = li.lastChild.textContent;
//            console.log(liToSend);
//        })

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
    // eventListener for keydown enter
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
    // eventListener for keydown esc
        window.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                view.closeModal();
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
//        opening modal
        var btnModalOpen = document.getElementById('sendBtn');
        btnModalOpen.addEventListener('click', function () {
            view.openModal();
            view.putList();
        }, false);
//        closing modal
        var btnModalClose = document.getElementById('btn__modal--close');
        btnModalClose.addEventListener('click', function () {
            view.closeModal();
        }, false);
        var submit = document.getElementById('sendList');
        submit.addEventListener('submit', function () {
            handlers.sendSubmit();
        }, false);
    }
};
(function IIWC() {
    view.setUpEventListeners();
    view.displayTodos();
})();