var sysssislogAPI = {

    GetSysssislog: function (logID, callback) {
        $.ajax({
            type: "POST",
            url: "../Sysssislog/GetSysssislog",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                logID: logID
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