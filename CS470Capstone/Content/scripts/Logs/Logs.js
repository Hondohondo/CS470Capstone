var logs = {
    Initialize: function () {
        //logs.CreateLogs();
        //logs.CreateSSISLog();
        logs.InitializeLogsDataTable();
    },

    InitializeLogsDataTable: function () {
        $("#table-logs").dataTable({
            ajax: {
                url: "../Logs/GetLogsForDataTable",
                type: "POST",
                datatype: "json",
            },
            rowId: "LogID",
            serverSide: true,
            searching: true,
            pageLength: 10,
            lengthChange: true,
            order: [1, "desc"],
            columns: [
                { data: "Title", sortable: true, searchable: false, name: "Title" },
                { data: "Severity", sortable: true, searchable: false, name: "Severity" },
                { data: "Priority", sortable: true, searchable: false, name: "Priority" },
                { data: "Timestamp", sortable: true, searchable: false, name: "Timestamp" },
                { data: "AuthenticatedUser", sortable: false, searchable: false, name: "Authenticated User"},
                //{ Name: "Actions", sortable: false, searchable: false }
            ],
            columnDefs: [
                {
                    targets: 5,
                    visible: true,
                    render: function (data, type, row) {
                        return '<button id="my button">Click Me!</button>'
                    }
                },
            ]
        });
    }

    //CreateLogs: function () {
    //    logsAPI.CreateLogs(function (response) {
    //        console.log(response);
    //    });
    //}

    //CreateSSISLog: function () {
    //    logsAPI.CreateSSISLog(function (response) {
    //        console.log(response);
    //    });
    //}
}

$(document).ready(logs.Initialize());