var configuration = {

    Initialize: function () {
        configuration.InitializeConfigDataTable();
        configuration.InitializeApplicationDropdown();

        $(document).on("click", "#button-view-configuration", function () {
            configuration.GetConfiguration($(this).attr("data-configurationApp"), $(this).attr("data-configurationKey"));
            $("#modal-configuration").modal("show");
        });

        $(document).on("click", "#buttonSubmitConfigurationChange", function () {


            var newValue = $("#newConfigurationValue").val();
            var changedApplication = $(this).attr("data-app");
            var changedKey = $(this).attr("data-key");
            console.log(newValue, changedApplication, changedKey);

            if (newValue !== "") {
                configurationAPI.submitConfigurationChange(changedApplication, changedKey, newValue);
            }

            $("#modal-configuration").modal("show");
        });

        $(document).on("click", "#button-clear-search-config", function () {
            $("#input-config-search").val('');
            $("#select-application-config").val('');
            $("#table-configuration").DataTable().ajax.reload();
        });

        /*
            search filtering event handlers
        */

        $(document).on("keyup", "#input-config-search", function () {
            $("#table-configuration").DataTable().ajax.reload();
        });

        $(document).on("change", '#select-application-config', function () {
            $("#table-configuration").DataTable().ajax.reload();
        });
    },

    InitializeConfigDataTable: function () {
        $("#table-configuration").DataTable({
            ajax: {
                url: "../Configuration/GetConfigurationsForDataTable",
                type: "POST",
                datatype: "json",
                data: function (d) {
                    d.application = $('#select-application-config').val(),
                    d.searchTerm = $("#input-config-search").val()
                }
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
             // { Name: "Quick Values", sortable: true, searchable: true },
                { Name: "Edit Quick Values", sortable: false, searchable: false }
            ],
            columnDefs: [
                {
                    targets: 2,
                    visible: true,
                    render: function (data, type, row) {

                        return '<button class="btn btn-sm btn-primary" id="button-view-configuration" data-configurationApp="' + row.Application + '" data-configurationKey= "' + row.Key + '"><span class="fa fa-edit"><span></button>';
                    }
                }
            ]
        });
    },

    GetConfiguration: function (application, key) {

        configurationAPI.GetConfiguration(application, key, function (response) {


            if (response) {

                // var configurationValue = "<tr><td><b> Configure: " + response.Application + " " + response.Key + " </b></td><td>" + response.Value + "</td></tr>";
                $("#modal-title-configuration").text("Configure " + response.Application + ": " + response.Key);

                $("#configuration-details").addClass("hidden");
                $("#table-configuration-details > tbody:last-child").empty();

                var configValue = "<tr><td><b> Config Values: </b></td><td>" + response.Value + "</td></tr>";
                var editValue = "<tr><td><b> New Value:</b></td><td><textarea id=\"newConfigurationValue\" type=\"text\" value=\"\"\"></textarea></td></tr>";

                //set the submit change button to have app and key info
                $("#buttonSubmitConfigurationChange").attr("data-app", response.Application);
                $("#buttonSubmitConfigurationChange").attr("data-key", response.Key);
                $("#table-configuration-details > tbody:last-child").append(configValue + editValue);

                $("#configuration-details").removeClass("hidden");
                $("#modal-configuration").modal("show");
            }
            else {
                console.log(response);
            }
        });
    },

    InitializeApplicationDropdown: function () {
        //select distinct applications from table
        configurationAPI.InitializeApplicationDropdown(function (response) {
            $.each(response, function (index, value) {
                $("#select-application-config").append('<option value="' + value + '">' + value + '</option>');
            });
        });
    },


};

$(document).ready(configuration.Initialize());