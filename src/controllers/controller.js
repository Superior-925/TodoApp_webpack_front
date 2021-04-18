const ALL_TASK = 0;
const NOT_COMPLETED_TASK = 1;
const COMPLETED_TASK = 2;

import TodoList from '../models/todoList';
import Todo from '../models/todo';
import {getRandomIntInclusive} from '../utils/utils';
import {hideButtons} from "../utils/utils";
import {showHideButtons} from "../utils/utils";

class Controller {
    constructor(todoList) {
        this.todoList = todoList;
    };

    onNewTodo() {
        //adding new todo
        let addToDoButton = document.getElementById("todo-button");
        addToDoButton.addEventListener('click', () => {
            let inputValue = document.getElementById("new-todo-input").value;
            if (!inputValue || inputValue.trim().length === 0) {
                alert("Enter the tasks text!");
                return;
            }
            let id = new Date().getTime() + getRandomIntInclusive(1, 10000);

            let newTodo = new Todo(inputValue, id, false);

            this.todoList.addTodo(newTodo).then(() => {
                this.renderList();
            }).then(()=>{showHideButtons()});
        });
    };


    deleteAll() {

        // deleting all records in todos array
        let deleteAllButton = document.getElementById('delete-all-button');

        deleteAllButton.addEventListener('click', () => {
            this.todoList.deleteAllTodos().then(
                this.renderList()).then(hideButtons());
        });
    }

    deleteCompleted() {
        // deleting completed records in todos array
        let deleteCompletedButton = document.getElementById('delete-completed-button');
        deleteCompletedButton.addEventListener('click', () => {
            this.todoList.deleteCompletedTodos().then(
                this.renderList()).then(hideButtons());
        });
    }

    showAll() {
        //filtering displayed tasks
        let showAllTodosButton = document.getElementById('show-all-todos-button');
        showAllTodosButton.addEventListener('click', () => {
            this.renderList();
        });
    }

    showCompleted() {
        //filtering displayed tasks
        let showCompletedTodosButton = document.getElementById('show-completed-todos-button');
        showCompletedTodosButton.addEventListener('click', () => {
            this.renderList(COMPLETED_TASK);
        });
    }

    showNotCompleted() {
        //filtering displayed tasks
        let showNotCompletedTodosButton = document.getElementById('show-not-completed-todos-button');
        showNotCompletedTodosButton.addEventListener('click', () => {
            this.renderList(NOT_COMPLETED_TASK);
        });
    }

    doneButton() {
        //changing "done/undone" status
        document.getElementById("todo-block").addEventListener("click", function (evt)
        {

            evt.stopPropagation();

            let id = evt.target.getAttribute('data-id'); // get id of clicked element

            let newStatus = newTodoList.findInstanceById(id);

            newStatus.changeIsDone(id).then(()=>{
                controller.renderList(ALL_TASK)
            })
        });
    }

    buttonsListeners() {
        this.onNewTodo();
        this.deleteAll();
        this.deleteCompleted();
        this.showAll();
        this.showCompleted();
        this.showNotCompleted();
        this.doneButton();
    }

    renderList(view = ALL_TASK) {
        // remove all appended todos
        let todosElements = document.getElementsByClassName('todo-message');
        while (todosElements.length > 0) todosElements[0].remove();

        this.todoList.todos.forEach(function (current) {
            // add container for new to-do
            let textElement;
            let doneButtonElement;
            switch (view) {

                case ALL_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }

                    // append a new to-do into container
                    document.getElementById('todo-block').appendChild(textElement);

                    // add button for change isDone property
                    doneButtonElement = document.createElement('button');
                    doneButtonElement.setAttribute('data-id', current.id);
                    doneButtonElement.classList.add('done-button');
                    doneButtonElement.type = 'button';

                    // add to-do text
                    textElement.innerText = current.taskText;

                    // append button into to-do block
                    textElement.appendChild(doneButtonElement);

                    break;

                case NOT_COMPLETED_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }
                    if(!current.isDone) {
                        // append a new to-do into container
                        document.getElementById('todo-block').appendChild(textElement);

                        // add button for change isDone property
                        doneButtonElement = document.createElement('button');
                        doneButtonElement.setAttribute('data-id', current.id);
                        doneButtonElement.classList.add('done-button');
                        doneButtonElement.type = 'button';

                        // add to-do text
                        textElement.innerText = current.taskText;

                        // append button into to-do block
                        textElement.appendChild(doneButtonElement);
                    }
                    break;

                case COMPLETED_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }
                    if(current.isDone) {
                        // append a new to-do into container
                        document.getElementById('todo-block').appendChild(textElement);

                        // add button for change isDone property
                        doneButtonElement = document.createElement('button');
                        doneButtonElement.setAttribute('data-id', current.id);
                        doneButtonElement.classList.add('done-button');
                        doneButtonElement.type = 'button';

                        // add to-do text
                        textElement.innerText = current.taskText;

                        // append button into to-do block
                        textElement.appendChild(doneButtonElement);
                    }
                    break;
            }
        });

    };

}

let newTodoList = new TodoList();
let controller = new Controller(newTodoList);

controller.buttonsListeners();

document.addEventListener('DOMContentLoaded', function (){
    //adding todos on display after browser starting
    controller.todoList.refreshPage().then(() => {
        controller.renderList(ALL_TASK);
    }).then(()=>{showHideButtons()})
});

export default controller;
