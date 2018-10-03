﻿var sysssislog = {
    Initialize: function () {
        sysssislog.InitializeSysssislogsDataTable();

        $(document).on("click", "#button-view-full-sysssislog", function () {
            sysssislog.GetSysssislog($(this).attr("data-id"));
        });

        $(document).on("click", "#button-view-pretty-json", function () {
            $("#modal-pretty-json").modal("show");
        });

        //close log details modal
        $(document).on("hidden.bs.modal", "#modal-sysssislog-details", function () {
            $("#table-sysssislog-details > tbody:last-child").empty();
        });

        //close pretty json modal
        $(document).on("hidden.bs.modal", "#modal-pretty-json", function () {
            $("#pretty-json").empty();
        });
    },

    ResetSysssislogModals: function () {
        $("#table-sysssislog-details > tbody:last-child").empty();
        $("#pretty-json").empty();
    },

    GetSysssislog: function (ID) {
        //open modal
        $("#modal-sysssislog-details").modal("show");
        $("#modal-sysssislog-details").modal("show");
        sysssislog.ResetSysssislogModals();

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
                var ExecutionID = "<tr><td><b> ExecutionID: </b></td><td>" + response.ExecutionID + "</td></tr>";
                var StartTime = "<tr><td><b> StartTime: </b></td><td>" + response.StartTime + "</td></tr>";
                var EndTime = "<tr><td><b> EndTime: </b></td><td>" + response.EndTime + "</td></tr>";
                var DataCode = "<tr><td><b> DataCode: </b></td><td>" + response.DataCode + "</td></tr>";
                var DataBytes = "<tr><td><b> DataBytes: </b></td><td>" + response.DataBytes + "</td></tr>";
                var Message = "<tr><td><b> Message: </b></td><td>" + response.Message + "</td></tr>";
                

                var FormattedMessage = '<tr><td><b> FormattedMessage: </b></td><td><button id="button-view-pretty-json" class="btn btn-sm btn-primary"><span class="fa fa-search"></span></button>&nbsp;</td></tr>';
                var pretty = JSON.stringify(response.FormattedMessage, undefined, 5);
                var json = JSON.parse(pretty);
                $("#pretty-json").append(json);
                
                var EntityKey = "<tr><td><b> EntityKey: </b></td><td>" + response.EntityKey + "</td></tr>";
                $("#table-sysssislog-details > tbody:last-child").append(ID + Event + Computer + Operator + Source + SourceID + ExecutionID + StartTime + EndTime + DataCode + DataBytes + Message + FormattedMessage + EntityKey);
                $("#sysssislog-details").removeClass("hidden");
            }
            else {
                console.log(response)
            }
        });
    },

    InitializeSysssislogsDataTable: function () {
        $("#table-sysssislog").dataTable({
            ajax: {
                url: "../Sysssislog/GetSysssislogForDataTable",
                type: "POST",
                datatype: "json",
            },
            rowId: "ID",
            serverSide: true,
            searching: false,
            pageLength: 10,
            lengthChange: false,
            order: [1, "desc"],
            columns: [
                { data: "Message", sortable: true, searchable: true, name: "Message" },
                { data: "Event", sortable: true, searchable: false, name: "Event" },
                { data: "Computer", sortable: true, searchable: true, name: "Computer" },
                { data: "Operator", sortable: true, searchable: true, name: "Operator" },
       
            ],
            columnDefs: [
                {
                    targets: 5,
                    visible: true,
                    render: function (data, type, row) {
                        // data-toggle="modal" data-target="#modal-log"
                        return '<button class="btn btn-sm btn-primary" id="button-view-full-sysssislog" data-id="' + row.ID +'"><span class="fa fa-edit"><span></button>'
                    }
                },
            ]
        });
    }
}

$(document).ready(sysssislog.Initialize());