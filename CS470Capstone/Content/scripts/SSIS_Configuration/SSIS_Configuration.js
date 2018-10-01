var ssis_configuration = {

        Initialize: function () {
            ssis_configuration.InitializeConfigDataTable();
        },

        InitializeConfigDataTable: function () {
            $("#table-ssis_configurations").DataTable({
                ajax: {
                    url: "../SSIS_Configuration/GetSsis_ConfigurationForDataTable",
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