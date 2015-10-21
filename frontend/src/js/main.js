$(document).ready(function () {

    // disable editing in input_shortUrl
    $('#input_shortUrl').click(function (e) {
        $(this).keypress(function (e) {
            e.preventDefault();
        })
    });

    // datatable related
    var table = $('#table_dataTables').DataTable({
        "ajax": "data/urls.txt",
        "columns": [
                    {"data": "short"},
                    {"data": "long"},
                   // {"data": "notes"}
                    ],
        "columnDefs": [
                    {   "targets": 0,
                        "render": function (data, type, row) {
                            return '<a target="_blank" href="http://' + data + '">' + data + '</a>';
                        }
                    },
                    {   "targets": 1,
                        "render": function (data, type, row) {

                            var newLink = $("<div />", {
                                "id": row["short"],
                                "html" : data
                            });

                            return $(newLink).prop('outerHTML');
                        }
                    },

                    {   "targets": 2,
                        "render": function (data, type, row) {
                            noteStr = row["notes"];

                            var newLink = $("<a />", {
                                "id": row["short"],
                                href: "#",
                                "data-pk": row["short"],
                                "data-type": "text"
                            });

                            if (noteStr.length == 0) {
                                noteStr = "click to add note";
                                $(newLink).addClass('editable Lnk NoteLnk');  // editable-click inline-input
                            }

                            $(newLink).text(noteStr);
                            return $(newLink).prop('outerHTML');
                        }
                    }
                    ],
        "initComplete": function () {
                    //$.fn.editable.defaults.mode = 'inline';
                    $('#table_dataTables .Lnk').editable({
                        type: 'text',
                        url: '/post',
                        placement: 'top',
                        title: 'Enter text'
                    });
                }
    });


    // multiselecting datatable rows
    $('#table_dataTables tbody').on('click', 'td', function () {
        var column_num = parseInt($(this).index());
        //var row_num = parseInt( $(this).parent().index() );
        if (column_num === 1) {
            $(this).closest('tr').toggleClass('warning');
            $("#delBtn").prop("disabled", (table.rows('.warning').data().length === 0));
        }
    });

    $('#delBtn').click(function () {
        //alert((table.rows('.warning').data().length>0));

        var table = $('#table_dataTables').DataTable();
        table.rows('.warning').remove().draw(false);

    });


    $('#longurl').focus();

});
