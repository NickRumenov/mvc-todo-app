var app = app || {};

app.userViewBag = (function () {

    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#login-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function () {
                    this.trigger('login', { username: username, password: password });
                })
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#register-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    repeatPassword = $('#repeat-password').val();

                Sammy(function () {
                    this.trigger('register', { username: username, password: password, repeatPassword: repeatPassword });
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());