class Todo {
    constructor(taskText, id, isDone) {
        this.taskText = taskText;
        this.id = id;
        this.isDone = isDone;
    };

    changeIsDone(id) {
        // changing 'isDone' value
        let currentTodo = controller.todoList.findInstanceById(id);
        currentTodo.isDone = !currentTodo.isDone;

        //request on server
        fetch(`http://${config.development.host}:${config.development.port}/todos/`+id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isDone: !currentTodo.isDone})
        }).then(response => {
            controller.renderList();
        });
    }
}

