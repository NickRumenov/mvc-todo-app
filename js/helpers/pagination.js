var app = app || {};

app.pagination = (function () {
    function pagination(style, tasksPerPage, listName) {
        $(document).ready(function () {

            $("#pagination").jPages({
                containerID: listName,
                perPage: tasksPerPage,
                first: true,
                last: true,
                keyBrowse: true,
                scrollBrowse: true,
                animation: style
            });
        });
        $("button").click(function () {

            var page = parseInt($("input").val());

            $("div.holder").jPages(page);
        });
    }

    return {
        load: function () {
            return {
                pagination: pagination,
            }
        }
    }

}());