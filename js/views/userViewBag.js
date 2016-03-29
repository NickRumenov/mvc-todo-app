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

                if ((username && password) && (password === repeatPassword)) {
                    Sammy(function () {
                        this.trigger('register', { username: username, password: password });
                    })
                } else {
                    if (!username && !password) {
                        alert('Please insert username and password.');
                    }
                    else if (!username) {
                        alert('Please insert username.');
                    }
                    else if (!password) {
                        alert('Please insert password.');
                    }
                    else if (password !== repeatPassword) {
                        alert('Passwords are not equal.');
                    }
                }
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