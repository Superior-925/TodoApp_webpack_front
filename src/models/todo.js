import config from '../config'

class Todo {
    constructor(taskText, id, isDone) {
        this.taskText = taskText;
        this.id = id;
        this.isDone = isDone;
    };

    changeIsDone(id) {
        // changing 'isDone' value
        this.isDone = !this.isDone;
        //request on server
        return fetch(`http://${config.development.host}:${config.development.port}/todos/` + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isDone: !this.isDone})
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
}

export default Todo;