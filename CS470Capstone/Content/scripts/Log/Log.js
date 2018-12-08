var log = {
    Initialize: function () {

        /*
            Modal event handlers
        */
        $(document).on("hidden.bs.modal", "#modal-pretty-json", function () {
            $("#modal-pretty-json .modal-title").text('Formatted Message');
            $("#pretty-json").empty();
            $("#input-json-search-result").val('');
            $("#input-json-search").val('');
            $("#input-json-char-limit").val('');
            $("#json-search-result").addClass('hidden');
            $("#full-pretty-json").val('');
        });

        $(document).on("hidden.bs.modal", "#modal-log-details", function () {
            $("#table-log-details > tbody:last-child").empty();
            $("#pretty-json").empty();
        });

        /*
            Button event handlers
        */
        $(document).on("click", "#button-view-full-log", function () {
            log.GetLog($(this).attr("data-log-id"));
        });

        
        $(document).on("click", "#button-view-pretty-json", function () {
            log.PopulatePrettyJson($(this).attr("data-log-id"));
        });

        $(document).on("click", "#button-view-pretty-json-from-table", function () {
            log.PopulatePrettyJson($(this).attr("data-log-id"));
        });

        $(document).on("click", "#copy-json", function () {
            $("#pretty-json").select();
            document.execCommand('copy');
        });

        $(document).on("click", "#copy-json-result", function () {
            $("#input-json-search-result").select();
            document.execCommand('copy');
        });

        $(document).on("click", "#button-search-json", function () {
            var search = $("#input-json-search").val();
            var charLimit = parseInt($("#input-json-char-limit").val());

            if (search && charLimit) {
                $("#no-search-value").addClass("hidden");
                $("#no-char-value").addClass("hidden");
                $("#no-result").addClass('hidden');
                var json = $("#pretty-json").val();
                var start = json.indexOf(search);
                var end = start + charLimit;
                var result = "";
                if (start != -1) {
                    if (end < json.length) {
                        result = json.substring(start, end);
                    }
                    else {
                        result = json.substring(start);
                    }
                    $("#input-json-search-result").val(result);
                    $("#json-search-result").removeClass('hidden');
                }
                else {
                    $("#no-result").removeClass('hidden');
                }
            }
            else {
                search ? $("#no-search-value").addClass("hidden") : $("#no-search-value").removeClass("hidden");
                charLimit ? $("#no-char-value").addClass("hidden") : $("#no-char-value").removeClass("hidden");
            }
        });

        $(document).on("click", "#button-clear-search", function () {
            $("#input-log-search").val('');
            $("#select-application").val('');
            $("#table-log").DataTable().ajax.reload();
        });

        /*
            search filtering event handlers
        */

        $(document).on("keyup", "#input-log-search", function () {
            $("#table-log").DataTable().ajax.reload();
        });

        $(document).on("change", '#select-application', function () {
            $("#table-log").DataTable().ajax.reload();
        });

        /*
            function calls
        */
        
        log.InitializeLogsDataTable();
        log.InitializeApplicationDropdown();
    },

    PopulatePrettyJson: function (logID) {
        var encoded = $("#pretty-json-log-id-" + logID).val();
        var decoded = decodeURIComponent(encoded); //decode encoded formatted message from hidden field
        var noBackslashes = decoded.replace(/\\/g, "/"); //JSON.parse has a problem with backslashes so we need to replace them with forward slashes
        var parsed = JSON.parse(noBackslashes);
        var string = JSON.stringify(parsed, null, "\t");
        $("#pretty-json").val(string);

        $("#modal-pretty-json .modal-title").text("Formatted Message for Log " + logID);
        $("#modal-pretty-json").modal("show");
    },

    InitializeApplicationDropdown: function () {
        //select distinct applications from table
        logAPI.InitializeApplicationDropdown(function (response) {
            $.each(response, function (index,value) {
                $("#select-application").append('<option value="' + value + '">' + value + '</option>');
            });
        });
    },

    InitializeLogsDataTable: function () {

        $("#table-log").dataTable({
            ajax: {
                url: "../Log/GetLogForDataTable",
                type: "POST",
                datatype: "json",
                data: function (d) {
                    d.application = $('#select-application').val(),
                    d.searchTerm = $("#input-log-search").val()
                },
            },
            rowId: "LogID",
            serverSide: true,
            searching: false,
            pageLength: 10,
            lengthChange: false,
            order: [0, "asc"],
            processing: true,
            columns: [
                { data: "Title", sortable: true, searchable: true, name: "Title" },
                { data: "Severity", sortable: true, searchable: false, name: "Severity" },
                { data: "Priority", sortable: true, searchable: false, name: "Priority" },
                { data: "Timestamp", sortable: true, searchable: false, name: "Timestamp" },
                { data: "AuthenticatedUser", sortable: true, searchable: false, name: "AuthenticatedUser" },
            ],
            columnDefs: [
                {
                    targets: 5,
                    visible: true,
                    render: function (data, type, row) {
                        if (row.FormattedMessage) {
                            var encoded = encodeURIComponent(row.FormattedMessage); //encode json data to store in hidden field
                            return '<button class="btn btn-sm btn-primary" id="button-view-full-log" data-log-id="' + row.LogID + '"><span class="fa fa-edit"><span></button> &nbsp;' +
                                '<button class="btn btn-sm btn-primary" id="button-view-pretty-json-from-table" data-log-id="' + row.LogID + '"><span class="fa fa-share"><span></button>' +
                                '<input id="pretty-json-log-id-' + row.LogID + '"type="text" value="' + encoded + '" hidden>';
                        }
                        else {
                            return '<button class="btn btn-sm btn-primary" id="button-view-full-log" data-log-id="' + row.LogID + '"><span class="fa fa-edit"><span></button>';
                        }
                    }
                },
            ]
        });
    },

    GetLog: function (logID) {

        $("#loading-log-details").removeClass("hidden");
        $("#modal-log-details").modal("show");

        logAPI.GetLog(logID, function (response) {
            if (response) {

                $("#log-details").addClass("hidden");
                $("#table-log-details > tbody:last-child").empty();

                var LogID = "<tr><td><b> LogID: </b></td><td>" + response.LogID + "</td></tr>";
                var EventID = "<tr><td><b> EventID: </b></td><td>" + response.EventID + "</td></tr>";
                var Priority = "<tr><td><b> Priority: </b></td><td>" + response.Priority + "</td></tr>";
                var Severity = "<tr><td><b> Severity: </b></td><td>" + response.Severity + "</td></tr>";
                var Title = "<tr><td><b> Title: </b></td><td>" + response.Title + "</td></tr>";
                var Timestamp = "<tr><td><b> Timestamp: </b></td><td>" + response.Timestamp + "</td></tr>";
                var MachineName = "<tr><td><b> MachineName: </b></td><td>" + response.MachineName + "</td></tr>";
                var AppDomainName = "<tr><td><b> AppDomainName: </b></td><td>" + response.AppDomainName + "</td></tr>";
                var ProcessID = "<tr><td><b> ProcessID: </b></td><td>" + response.ProcessID + "</td></tr>";
                var ProcessName = "<tr><td><b> ProcessName: </b></td><td>" + response.ProcessName + "</td></tr>";
                var ThreadName = "<tr><td><b> ThreadName: </b></td><td>" + response.ThreadName + "</td></tr>";
                var Win32ThreadId = "<tr><td><b> Win32ThreadId: </b></td><td>" + response.Win32ThreadId + "</td></tr>";
                var DoctorKey = "<tr><td><b> DoctorKey: </b></td><td>" + response.DoctorKey + "</td></tr>";
                var AuthenticatedUser = "<tr><td><b> WinAuthenticatedUser32ThreadId: </b></td><td>" + response.AuthenticatedUser + "</td></tr>";
                var Message = "<tr><td><b> Message: </b></td><td>" + response.Message + "</td></tr>";

                var FormattedMessage = "";
                if(response.FormattedMessage){
                    FormattedMessage = '<tr><td><b> FormattedMessage: </b></td><td><button id="button-view-pretty-json" class="btn btn-sm btn-primary" data-log-id="' + response.LogID + '"><span class="fa fa-share"></span></button>&nbsp;</td></tr>';
                }
                else{
                    FormattedMessage = '<tr><td><b> FormattedMessage: </b></td><td>NULL</td></tr>';
                }

                //finish building table and append all columns to table
                var EntityKey = "<tr><td><b> EntityKey: </b></td><td>" + response.EntityKey + "</td></tr>";
                $("#table-log-details > tbody:last-child").append(LogID + EventID + Priority + Severity + Title + Timestamp + MachineName + AppDomainName + ProcessID + ProcessName + ThreadName + Win32ThreadId + DoctorKey + AuthenticatedUser + Message + FormattedMessage + EntityKey);

                $("#loading-log-details").addClass("hidden");
                $("#log-details").removeClass("hidden");
            }
            else {
                console.log(response);
            }
        });
    }
}

$(document).ready(log.Initialize());