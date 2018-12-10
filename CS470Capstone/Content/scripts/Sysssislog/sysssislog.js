var sysssislog = {
    Initialize: function () {

        $(document).on("click", "#button-view-full-sysssislog", function () {
            sysssislog.GetSysssislog($(this).attr("data-log-id"));
        });

        //close sysssislog details modal
        $(document).on("hidden.bs.modal", "#modal-sysssislog-details", function () {
            $("#table-sysssislog-details > tbody:last-child").empty();
        });

        $(document).on("keyup", "#input-sysssislog-search", function () {
            $("#table-sysssislog").DataTable().ajax.reload();
        });

        $(document).on("change", "#select-event", function () {
            $("#table-sysssislog").DataTable().ajax.reload();
        });

        $(document).on("click", "#button-clear-search", function () {
            $("#input-sysssislog-search").val('');
            $("#select-event").val('');
            $("#table-sysssislog").DataTable().ajax.reload();
        });

        sysssislog.InitializeSysssislogsDataTable();
        sysssislog.InitializeEventsDropdown();
    },

    GetSysssislog: function (logID) {
        //open modal
        $("#modal-sysssislog-details").modal("show");

        sysssislogAPI.GetSysssislog(logID, function (response) {
            if (response) {
                $("#sysssislog-details").addClass("hidden");
                $("#table-sysssislog-details > tbody:last-child").empty();

                var ID = "<tr><td><b> ID: </b></td><td>" + response.id + "</td></tr>";
                var Event = "<tr><td><b> Event: </b></td><td>" + response.event + "</td></tr>";
                var Computer = "<tr><td><b> Computer: </b></td><td>" + response.computer + "</td></tr>";
                var Operator = "<tr><td><b> Operator: </b></td><td>" + response.operator + "</td></tr>";
                var Source = "<tr><td><b> Source: </b></td><td>" + response.source + "</td></tr>";
                var SourceID = "<tr><td><b> SourceID: </b></td><td>" + response.sourceid + "</td></tr>";
                var ExecutionID = "<tr><td><b> ExecutionID: </b></td><td>" + response.executionid + "</td></tr>";
                var StartTime = "<tr><td><b> StartTime: </b></td><td>" + response.starttime + "</td></tr>";
                var EndTime = "<tr><td><b> EndTime: </b></td><td>" + response.endtime + "</td></tr>";
                var DataCode = "<tr><td><b> DataCode: </b></td><td>" + response.datacode + "</td></tr>";
                var DataBytes = "<tr><td><b> DataBytes: </b></td><td>" + response.databytes + "</td></tr>";
                var Message = "<tr><td><b> Message: </b></td><td>" + response.message + "</td></tr>";
                
                $("#table-sysssislog-details > tbody:last-child").append(ID + Event + Computer + Operator + Source + SourceID + ExecutionID + StartTime + EndTime + DataCode + DataBytes + Message);
                $("#sysssislog-details").removeClass("hidden");
            }
            else {
                console.log(response)
            }
        });
    },

    InitializeEventsDropdown: function () {
        sysssislogAPI.InitializeEventsDropdown(function (response) {
            $.each(response, function (index, value) {
                $("#select-event").append('<option value="' + value + '">' + value + '</option>');
            });
        });
    },

    InitializeSysssislogsDataTable: function () {
        $("#table-sysssislog").dataTable({
            ajax: {
                url: "../Sysssislog/GetSysssislogForDataTable",
                type: "POST",
                datatype: "json",
                data: function (d) {
                    d.searchTerm = $("#input-sysssislog-search").val(),
                    d.event = $("#select-event").val()
                }
            },
            rowId: "id",
            serverSide: true,
            searching: false,
            pageLength: 10,
            lengthChange: false,
            order: [1, "desc"],
            processing: true,
            columns: [
                { data: "message", sortable: true, searchable: true, name: "Message" },
                { data: "event", sortable: true, searchable: false, name: "Event" },
                { data: "computer", sortable: true, searchable: true, name: "Computer" },
                { data: "operator", sortable: true, searchable: true, name: "Operator" },
                { data: "source", sortable: true, searchable: true, name: "Source" },
            ],
            columnDefs: [
                {
                    targets: 5,
                    visible: true,
                    render: function (data, type, row) {
                        return '<button class="btn btn-sm btn-primary" id="button-view-full-sysssislog" data-log-id="' + row.id +'"><span class="fa fa-edit"><span></button>'
                    }
                },
            ]
        });
    }
}

$(document).ready(sysssislog.Initialize());