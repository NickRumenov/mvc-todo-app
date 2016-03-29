var app = app || {};

app.taskModel = (function () {
    function TaskModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/tasks/';
    }

    TaskModel.prototype.getAllOfficeTasks = function () {
        var requestUrl = this.serviceUrl;
        return this.requester.get(requestUrl, true);
    };

    TaskModel.prototype.getTasksByCreatorId = function (userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return this.requester.get(requestUrl, true);
    };

    TaskModel.prototype.addTask = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    TaskModel.prototype.editTask = function (taskId, data) {
        var requestUrl = this.serviceUrl + taskId;
        return this.requester.put(requestUrl, data, true);
    };

    TaskModel.prototype.deleteTask= function (taskId) {
        var requestUrl = this.serviceUrl + taskId;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new TaskModel(requester);
        }
    }
}());