var configuration = {
    Initialize: function () {
        configuration.InitializeConfigDataTable();
    },

    InitializeConfigurationDataTable: function () {
        $("#table_configuration").DataTable({
            ajax: {
                url: "../Configuration/GetConfigurationForDataTable",
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
}

$(document).ready(configuration.Initialize());