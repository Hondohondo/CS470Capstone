var config = {
    Initialize: function () {
        config.InitializeConfigDataTable();
        //config.CreateConfig();
        //config.CreateSSISConfig();
    },

    InitializeConfigDataTable: function () {
        $("#config-logs").DataTable({
            ajax: {
                url: "../Config/GetConfigsForDataTable",
                type: "POST",
                datatype: "json",
            },
            rowId: "LogID",
            serverSide: true,
            searching: false,
            pageLength: 10,
            lengthChange: false,
            order: [1, "desc"],
            columns: [
                { data: "Application", sortable: true, searchable: false, name: "Title" },
                { Name: "Actions", sortable: false, searchable: false }
            ],
        });
    }

    //CreateConfig: function () {
    //    configAPI.CreateConfig(function (response) {
    //        console.log(response);
    //    });
    //}

    //CreateSSISConfig: function () {
    //    configAPI.CreateSSISConfig(function (response) {
    //        console.log(response);
    //    });
    //}
}

$(document).ready(config.Initialize());