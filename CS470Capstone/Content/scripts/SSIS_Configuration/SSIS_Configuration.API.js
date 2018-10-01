var ssis_configurationAPI = {

    GetSsis_Configuration: function (stageReportIDMapping, callback) {
        $.ajax({
            type: "POST",
            url: "../Ssis_Configuration/GetSsis_Configuration",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                stageReportIDMapping: stageReportIDMapping
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