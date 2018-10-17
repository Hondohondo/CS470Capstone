var configurationAPI = {
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

    submitConfigurationChange: async function (application, key, value, callback) {
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
            //on successful change, update modal info.
            success: function (data) {
                typeof callback === "function" && callback(data);
                configuration.GetConfiguration(application, key);
            },
            error: function (xhr) {
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });
    }
}