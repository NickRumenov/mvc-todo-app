var app = app || {};

app.taskController = (function () {
    function TaskController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    TaskController.prototype.loadOfficeTasks = function (selector) {
        var _this = this;
        this.model.getAllOfficeTasks()
            .then(function (data) {
                var result = {
                    tasks: []
                };

                data.forEach(function (task) {
                    result.tasks.push({
                        title: task.title,
                        text: task.text,
                        deadline: task.deadline,
                        author: task.author,
                        id: task._id
                    })
                });
                _this.viewBag.showOfficeTasks(selector, result);
            })
    };

    TaskController.prototype.loadMyTasks = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];
        this.model.getTasksByCreatorId(userId)
            .then(function (data) {
                var result = {
                    tasks: []
                };

                data.forEach(function (task) {
                    result.tasks.push({
                        title: task.title,
                        text: task.text,
                        deadline: task.deadline,
                        author: task.author,
                        id: task._id
                    })
                });

                _this.viewBag.showMyTasks(selector, result);
            })
    };

    TaskController.prototype.loadAddTask = function (selector) {
        this.viewBag.showAddTask(selector);
    };

    TaskController.prototype.addTask = function (data) {
        var result = {
            title: data.title,
            text: data.text,
            deadline: data.deadline,
            author: sessionStorage['username']
        };

        this.model.addTask(result);
    };

    TaskController.prototype.loadEditTask = function (selector, data) {
        this.viewBag.showEditTask(selector, data);
    };

    TaskController.prototype.editTask = function (data) {
        data.author = sessionStorage['username'];
        this.model.editTask(data._id, data);
    };

    TaskController.prototype.loadDeleteTask = function (selector, data) {
        this.viewBag.showDeleteTask(selector, data);
    };

    TaskController.prototype.deleteTask = function (taskId) {
        this.model.deleteTask(taskId)
            .then(function (success) {
                window.location.reload();
            });
    };

    return {
        load: function (viewBag, model) {
            return new TaskController(viewBag, model);
        }
    };
}());