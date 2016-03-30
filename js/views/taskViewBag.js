var app = app || {};

app.taskViewBag = (function () {
    function showOfficeTasks(selector, data) {
        $.get('templates/office-tasks.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            app.pagination.load().paginationFunc('bounceInLeft', 12, 'items');
        })
    }

    function showMyTasks(selector, data) {
        $.get('templates/my-tasks.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            app.pagination.load().paginationFunc('bounceInRight', 12, 'items');

            $('.edit').on('click', function () {
                var taskId = $(this).parent().attr('data-id');

                var task = data.tasks.filter(function (a) {
                    return a.id == taskId;
                });

                if (task.length) {
                    Sammy(function () {
                        this.trigger('showEditTask', task[0]);
                    })
                }
            });
            $('.delete').on('click', function () {
                var taskId = $(this).parent().attr('data-id');

                var task = data.tasks.filter(function (a) {
                    return a.id == taskId;
                });

                if (task.length) {
                    Sammy(function () {
                        this.trigger('showDeleteTask', task[0]);
                    })
                }
            })

        });
    }

    function showAddTask(selector) {
        $.get('templates/add-tasks.html', function (templ) {
            $(selector).html(templ);
            $('#add-task-button').on('click', function () {
                var title = $('#title').val(),
                    text = $('#text').val(),
                    deadline = $('#deadline').val();

                Sammy(function () {
                    this.trigger('addTask', { title: title, text: text, deadline: deadline });
                    this.trigger('redirectUrl', { url: '#/office-tasks/' })
                })
            })
        })
    }

    function showEditTask(selector, data) {
        $.get('templates/edit-tasks.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editTaskButton').on('click', function () {
                var title = $('#title').val(),
                    text = $('#text').val(),
                    deadline = $('#deadline').val(),
                    id = $(this).parent().attr('data-id');

                Sammy(function () {
                    this.trigger('editTask', { title: title, text: text, deadline: deadline, _id: id });
                    this.trigger('redirectUrl', { url: '#/my-tasks/' })
                })
            })
        })
    }

    function showDeleteTask(selector, data) {
        $.get('templates/delete-tasks.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#delete-task-button').on('click', function () {
                var id = $(this).parent().attr('data-id');

                Sammy(function () {
                    this.trigger('deleteTask', { _id: id });
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showOfficeTasks: showOfficeTasks,
                showMyTasks: showMyTasks,
                showAddTask: showAddTask,
                showEditTask: showEditTask,
                showDeleteTask: showDeleteTask
            }
        }
    }
}());