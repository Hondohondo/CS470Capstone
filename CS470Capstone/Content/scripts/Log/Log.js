var log = {
    Initialize: function () {

        log.InitializeLogsDataTable();

        $(document).on("click", "#button-view-full-log", function () {
            log.GetLog($(this).attr("data-log-id"));
        });

        $(document).on("click", "#button-view-pretty-json", function () {
            var logID = $(this).attr("data-log-id");
            $("#modal-pretty-json .modal-title").text("Formatted Message for Log " + logID);
            $("#modal-pretty-json").modal("show");
        });

        //use value stored in hidden field to avoid additional ajax call
        $(document).on("click", "#button-view-pretty-json-from-table", function () {
            var logID = $(this).attr("data-log-id");
            var encoded = $("#pretty-json-log-id-" + logID).val();
            var decoded = decodeURIComponent(encoded); //decode encoded formatted message from hidden field
            var noBackslashes = decoded.replace(/\\/g, "/"); //JSON.parse has a problem with backslashes so we need to replace them with forward slashes
            var parsed = JSON.parse(noBackslashes);
            var syntax = log.JSONSyntaxHighlight(parsed);
            $("#pretty-json").append(syntax);
            
            $("#modal-pretty-json .modal-title").text("Formatted Message for Log " + logID);
            $("#modal-pretty-json").modal("show");
        });

        //want these to act independantly of each other
        $(document).on("hidden.bs.modal", "#modal-pretty-json", function () {
            $("#modal-pretty-json .modal-title").text('Formatted Message');
            $("#pretty-json").empty();
            $("#input-json-search-result").empty(); //THIS ISNT WORKING
        });

        $(document).on("hidden.bs.modal", "#modal-log-details", function () {
            $("#table-log-details > tbody:last-child").empty();
            $("#pretty-json").empty();
        });

        //copy json content event handler
        $(document).on("click", "#copy-json", function () {
            var $temp = $('<input type="text">');
            $("body").append($temp);
            $temp.val($("#pretty-json").text()).select();
            document.execCommand("copy");
            $temp.remove();
        });

        //copy json search result content event handler
        $(document).on("click", "#copy-json-result", function () {
            //TODO get this to work. works for some reason in the stackoverflow example but not here. same browser
            //https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery
        });

        $(document).on("click", "#button-search-json", function () {
            // if there are no values we dont want to do the search so make sure there are values first
            var search = $("#input-json-search").val();
            var charLimit = $("#input-json-char-limit").val();
            console.log(search);
            console.log(charLimit);

            if (search && charLimit) {
                console.log("both have values");
                $("#no-search-value").addClass("hidden");
                $("#no-char-value").addClass("hidden");

                var json = $("#pretty-json").text();
                var start = json.indexOf(search);
                var result = "";
                if(start != -1){
                    if (start + charLimit < json.length) {
                        result = json.substring(start, start + charLimit);
                    }
                    else {
                        result = json.substring(start);
                    }
                    $("#input-json-search-result").val(result);
                }
                
                console.log(result);
            }
            else {
                search ? $("#no-search-value").addClass("hidden") : $("#no-search-value").removeClass("hidden");
                charLimit ? $("#no-char-value").addClass("hidden") : $("#no-char-value").removeClass("hidden");
            }
        });
    },

    ResetLogModals: function () {
        $("#modal-pretty-json .modal-title").text('Formatted Message');
        $("#table-log-details > tbody:last-child").empty();
        $("#pretty-json").empty();
    },

    InitializeApplicationDropdown: function () {
        //select distinct applications from table
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
            searching: false,
            pageLength: 10,
            lengthChange: false,
            order: [0, "asc"],
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
                        var encoded = encodeURIComponent(row.FormattedMessage); //encode json data to store in hidden field
                        return '<button class="btn btn-sm btn-primary" id="button-view-full-log" data-log-id="' + row.LogID + '"><span class="fa fa-edit"><span></button> &nbsp;' +
                            '<button class="btn btn-sm btn-primary" id="button-view-pretty-json-from-table" data-log-id="' + row.LogID + '"><span class="fa fa-share"><span></button>' +
                            '<input id="pretty-json-log-id-' + row.LogID + '"type="text" value="' + encoded + '" hidden>';
                    }
                },
            ]
        });
    },

    GetLog: function (logID) {

        $("#loading-log-details").removeClass("hidden");
        $("#modal-log-details").modal("show");
        log.ResetLogModals();

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

                var formattedMessage = "";
                //formatted message parsing and syntax highlighting
                if(response.FormattedMessage){
                    FormattedMessage = '<tr><td><b> FormattedMessage: </b></td><td><button id="button-view-pretty-json" class="btn btn-sm btn-primary" data-log-id="' + response.LogID + '"><span class="fa fa-share"></span></button>&nbsp;</td></tr>';
                    var noBackslashes = response.FormattedMessage.replace(/\\/g, "/"); //JSON.parse has a problem with backslashes so we need to replace them with forward slashes
                    var parsed = JSON.parse(noBackslashes);
                    var syntax = log.JSONSyntaxHighlight(parsed);
                    $("#pretty-json").append(syntax);
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
    },

    //function borrowed from https://stackoverflow.com/a/7220510
    JSONSyntaxHighlight: function (json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    },
}

$(document).ready(log.Initialize());