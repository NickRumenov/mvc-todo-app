﻿var app = app || {};

app.selectMenu = (function () {

    function selectMenuFunc() {

        $(function () {
            $("<select />").appendTo("nav");
            $("<option />", {
                "selected": "selected",
                "value": "",
                "text": "Go to..."
            }).appendTo("nav select");
            $("nav a").each(function () {
                var el = $(this);
                $("<option />", {
                    "value": el.attr("href"),
                    "text": el.text()
                }).appendTo("nav select");
            });
            $("nav select").change(function () {
                window.location = $(this).find("option:selected").val();
            });
        });

    }

    return {
        load: function () {
            return {
                selectMenuFunc: selectMenuFunc
            }
        }
    }

}());