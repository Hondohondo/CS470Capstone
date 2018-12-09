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
                    { data: "PackagePath", sortable: false, searchable: false, name: "PackagePath" },
                    { data: "ConfiguredValueType", sortable: false, searchable: false, name: "ConfiguredValueType" },
                    { sortable: false, searchable: false, name: "Actions" }
                ],
                columnDefs: [
                    {
                        targets: 4,
                        visible: true,
                        render: function (data, type, row) {
                            return '<button class="btn btn-primary" id="button-view-ssis_configuration" data-config-filter="' + row.ConfigurationFilter + '" data-configured-value="' + row.ConfiguredValue + '"><span class="fa fa-edit"></span></button>';
                        }
                    },
                ]
            });
        }

    };

$(document).ready(ssis_configuration.Initialize());