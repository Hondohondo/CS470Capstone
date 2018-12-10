var ssis_configurationAPI = {
    InitializeValueTypeDropdown: function (callback) {
        $.ajax({
            type: "POST",
            url: "../SSIS_Configuration/GetTypes",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                typeof callback === "function" && callback(data);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    }
}