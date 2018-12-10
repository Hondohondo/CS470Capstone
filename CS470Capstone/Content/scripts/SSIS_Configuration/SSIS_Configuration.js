var ssis_configuration = {

    Initialize: function () {

        $(document).on("click", "#button-clear-search", function () {
            $("#select-type").val('').trigger("change");
        });

        $(document).on("change", "#select-type", function () {
            $("#table-ssis_configurations").DataTable().ajax.reload();
        })

            ssis_configuration.InitializeConfigDataTable();
            ssis_configuration.InitializeValueTypeDropdown();
        },


        InitializeConfigDataTable: function () {
            $("#table-ssis_configurations").DataTable({
                ajax: {
                    url: "../SSIS_Configuration/GetSSIS_ConfigurationForDataTable",
                    type: "POST",
                    datatype: "json",
                    data: function (d) {
                        d.type = $("#select-type").val();
                    }
                },
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
        },

        InitializeValueTypeDropdown: function () {
            ssis_configurationAPI.InitializeValueTypeDropdown(function (response) {
                $.each(response, function (index, value) {
                    $("#select-type").append('<option value="' + value + '">' + value + '</option>');
                });
            });
        }

    };

$(document).ready(ssis_configuration.Initialize());