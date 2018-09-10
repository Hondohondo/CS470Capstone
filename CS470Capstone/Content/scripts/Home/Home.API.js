var HomeAPI = {

    GetHelloWorld: function (str, callback) {

        $.ajax({
            type: "POST",
            url: "../Home/GetHelloWorld",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                first: str
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    },

    HeyZak: function () {
        $.ajax({
            type: "POST",
            url: "../Home/GetHelloWorld",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                first: str
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    },

    HeyZak: function () {
        $.ajax({
            type: "POST",
            url: "../Home/GetHelloWorld",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                first: str
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    },

    HeyZak: function () {
        $.ajax({
            type: "POST",
            url: "../Home/GetHelloWorld",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                first: str
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    },

    HeyZak: function () {
        $.ajax({
            type: "POST",
            url: "../Home/GetHelloWorld",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                first: str
            }),
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    },

}