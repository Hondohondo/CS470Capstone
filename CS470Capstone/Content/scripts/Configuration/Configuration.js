var configuration = {
    Initialize: function () {
        configuration.InitializeConfigDataTable();
    },

    InitializeConfigDataTable: function () {
        $("#table-configuration").DataTable({
            ajax: {
                url: "../Configuration/GetConfigurationForDataTable",
                type: "POST",
                datatype: "json",
            },
            rowId: "Key",
            serverSide: true,
            searching: false,
            pageLength: 10,
            lengthChange: false,
            //order: [1, "desc"],
            columns: [
                { data: "Application", sortable: true, searchable: true, name: "Application" },
                { data: "Key", sortable: true, searchable: true, name: "Key" },
                { Name: "Actions", sortable: false, searchable: false }
            ],
            columnDefs: [
                {
                    targets: 2,
                    visible: true,
                    render: function (data, type, row) {
                        return '<button id="my button">Configure</button>';
                    }
                },
            ]
        });
    }

};

$(document).ready(configuration.Initialize());