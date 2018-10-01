var syssislog = {
    Initialize: function () {
        sysssislog.InitializeLogsDataTable();

        $(document).on("click", "#button-view-full-sysssislog", function () {
            sysssislog.GetSysssislog($(this).attr("data-sysssislog-id"));
        });
    },

    GetSysssislog: function (ID) {
        //open modal
        $("#modal-sysssislog-details").modal("show");

        sysssislogAPI.GetSysssislog(ID, function (response) {
            if (response) {
                //build table with data
                //possible use handlebars template?

                $("#sysssislog-details").addClass("hidden");
                $("#table-sysssislog-details > tbody:last-child").empty();

                var ID = "<tr><td><b> ID: </b></td><td>" + response.ID + "</td></tr>";
                var Event = "<tr><td><b> Event: </b></td><td>" + response.Event + "</td></tr>";
                var Computer = "<tr><td><b> Computer: </b></td><td>" + response.Computer + "</td></tr>";
                var Operator = "<tr><td><b> Operator: </b></td><td>" + response.Operator + "</td></tr>";
                var Source = "<tr><td><b> Source: </b></td><td>" + response.Source + "</td></tr>";
                var SourceID = "<tr><td><b> SourceID: </b></td><td>" + response.SourceID + "</td></tr>";
                var ExectionID = "<tr><td><b> ExecutionID: </b></td><td>" + response.ExectionID + "</td></tr>";
                var StartTime = "<tr><td><b> StartTime: </b></td><td>" + response.StartTime + "</td></tr>";
                var EndTime = "<tr><td><b> EndTime: </b></td><td>" + response.EndTime + "</td></tr>";
                var DataCode = "<tr><td><b> DataCode: </b></td><td>" + response.DataCode + "</td></tr>";
                var DataBytes = "<tr><td><b> ThreadName: </b></td><td>" + response.DataBytes + "</td></tr>";
                var Message = "<tr><td><b> Message: </b></td><td>" + response.Message + "</td></tr>";

                $("#table-sysssislog-details > tbody:last-child").append(ID + Event + Computer + Operator + Source + SourceID + ExectionID + StartTime + EndTime + DataCode + DataBytes + Message);
                $("#sysssislog-details").removeClass("hidden");
            }
            else {
                console.log(response)
            }
        });
    },

    InitializeLogsDataTable: function () {
        $("#table-sysssislog").dataTable({
            ajax: {
                url: "../Sysssislog/GetSysssislogForDataTable",
                type: "POST",
                datatype: "json",
            },
            rowId: "ID",
            serverSide: true,
            searching: true,
            pageLength: 10,
            lengthChange: true,
            order: [1, "desc"],
            columns: [
                { data: "Message", sortable: true, searchable: true, name: "Message" },
                { data: "Event", sortable: true, searchable: false, name: "Event" },
                { data: "Computer", sortable: true, searchable: false, name: "Computer" },
                { data: "Operator", sortable: true, searchable: false, name: "Operator" },
              
            ],
            columnDefs: [
                {
                    targets: 5,
                    visible: true,
                    render: function (data, type, row) {
                        // data-toggle="modal" data-target="#modal-log"
                        return '<button class="btn btn-sm btn-primary" id="button-view-full-sysssislog" data-log-id="' + row.ID + '"><span class="fa fa-edit"><span></button>'
                    }
                },
            ]
        });
    }

}

$(document).ready(sysssislog.Initialize());