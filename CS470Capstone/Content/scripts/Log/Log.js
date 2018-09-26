var log = {
    Initialize: function () {
        log.InitializeLogsDataTable();
    },

    InitializeLogsDataTable: function () {
        $("#table-log").dataTable({
            ajax: {
                url: "../Log/GetLogForDataTable",
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
}

$(document).ready(log.Initialize());