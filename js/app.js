var app = app || {};


(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var requester = app.requester.load('kid_ZkNf3fEleZ',
            '21764f7b45e64f36bd6b4af20d5940bb', 'https://baas.kinvey.com/');
        var pagination = app.pagination.load();

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var taskViewBag = app.taskViewBag.load();

        var userModel = app.userModel.load(requester);
        var taskModel = app.taskModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var taskController = app.taskController.load(taskViewBag, taskModel);

        this.before(function () {
            if (!sessionStorage['sessionId']) {
                $('#menu').hide();
            } else {
                $('#welcome-menu').text('Welcome, ' + sessionStorage['username']);
                $('#menu').show();
            }
        });

        this.get('#/', function () {
            homeController.loadWelcomePage(selector);
        });

        this.get('#/home/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/office-tasks/', function () {
            taskController.loadOfficeTasks(selector);
        });

        this.get('#/my-tasks/', function () {
            taskController.loadMyTasks(selector);
        });

        this.get('#/add-task/', function () {
            taskController.loadAddTask(selector);
        });

        this.bind('redirectUrl', function (ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function (ev, data) {
            userController.login(data);
        });

        this.bind('register', function (ev, data) {
            userController.register(data);
        });

        this.bind('addTask', function (ev, data) {
            taskController.addTask(data);
        });

        this.bind('showEditTask', function (ev, data) {
            taskController.loadEditTask(selector, data);
        });

        this.bind('editTask', function (ev, data) {
            taskController.editTask(data);
        });

        this.bind('showDeleteTask', function (ev, data) {
            taskController.loadDeleteTask(selector, data);
        });

        this.bind('deleteTask', function (ev, data) {
            taskController.deleteTask(data._id);
        })
    });

    router.run('#/');
}());

