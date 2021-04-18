import config from '../config'
import Todo from './todo'


class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(newTodo) {

        let dataPost = JSON.stringify(newTodo);

        return fetch(`http://${config.development.host}:${config.development.port}/todos`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: dataPost
        }).then(response => response.json())
            .then(json => {
                this.todos.push(new Todo(json.taskText, json.id, json.isDone));
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    deleteAllTodos() {

        this.todos.length = 0;
        return fetch(`http://${config.development.host}:${config.development.port}/todos`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ''
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    deleteCompletedTodos() {

        function filteringByTrueStatus(arr, isDone) {
            return arr.filter(e => e.isDone == true);
        }

        let completedTodos = filteringByTrueStatus(this.todos, true);
        let completedIds = [];
        completedTodos.forEach(element => completedIds.push(element.id));

        for (let i = 0; i < this.todos.length; i++) {
            let arr = this.todos;

            function removeElementByStatus(arr, isDone) {
                return arr.filter(e => e.isDone !== true);
            }
            arr = removeElementByStatus(arr, true);
            this.todos = arr;
        }

        return fetch(`http://${config.development.host}:${config.development.port}/todos/ids`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completedIds)
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    refreshPage() {
        return fetch(`http://${config.development.host}:${config.development.port}/todos`)
            .then(response => response.json())
            .then(json => {
                for (let i = 0; i<json.length; i++) {
                    let data = json[i];
                    this.todos.push(new Todo(data.taskText, data.id, data.isDone));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    findInstanceById(id) {
        return this.todos.find(todo => todo.id == id);
    };

}

export default TodoList;