var configuration = {

    Initialize: function () {
        configuration.InitializeConfigDataTable();


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

        });

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
  
                        return '<button class="btn btn-sm btn-primary" id="button-view-configuration" data-configurationApp="' + row.Application + '" data-configurationKey= "'+ row.Key + '"><span class="fa fa-edit"><span></button>';
                    }
                },
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

                var configValue = "<tr><td><b> Config Value: </b></td><td>" + response.Value + "</td></tr>";
                var editValue = "<tr><td><b> New Value:</b></td><td><textarea id=\"newConfigurationValue\" type=\"text\" value=\"\"\"></textarea></td></tr>";

                //set the submit change button to have app and key info
                $("#buttonSubmitConfigurationChange").attr("data-app", response.Application);
                $("#buttonSubmitConfigurationChange").attr("data-key", response.Key);
                $("#table-configuration-details > tbody:last-child").append(configValue + editValue);


                //$("#loading-log-details").addClass("hidden");
                $("#configuration-details").removeClass("hidden");
            }
            else {
                console.log(response);
            }
        });
    },


};

$(document).ready(configuration.Initialize());