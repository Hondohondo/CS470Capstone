﻿var configurationAPI = {
    GetConfiguration: function (application, key, callback) {
        $.ajax({
            type: "POST",
            url: "../Configuration/GetConfiguration",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                application: application,
                key: key
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    },

    submitConfigurationChange: function (application, key, value, callback) {
        $.ajax({
            type: "POST",
            url: "../Configuration/SetConfiguration",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                application: application,
                key: key,
                value: value
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    }
}