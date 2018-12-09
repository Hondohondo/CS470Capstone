var ssis_configuration = {

        Initialize: function () {
            ssis_configuration.InitializeConfigDataTable();
        },


        InitializeConfigDataTable: function () {
            $("#table-ssis_configurations").DataTable({
                ajax: {
                    url: "../SSIS_Configuration/GetSSIS_ConfigurationForDataTable",
                    type: "POST",
                    datatype: "json",
                },
                //rowId: "ConfigurationValue",
                serverSide: true,
                searching: false,
                pageLength: 10,
                lengthChange: false,
                order: [1, "desc"],
                processing: true,
                columns: [
                    { data: "ConfigurationFilter", sortable: true, searchable: true, name: "ConfigurationFilter" },
                    { data: "ConfiguredValue", sortable: true, searchable: true, name: "ConfiguredValue" },
                    { data: "PackagePath", sortable: true, searchable: false, name: "PackagePath" },
                    { data: "ConfiguredValueType", sortable: true, searchable: false, name: "ConfiguredValueType" },
                ],
            });
        }

    };

$(document).ready(ssis_configuration.Initialize());