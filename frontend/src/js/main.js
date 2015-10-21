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
                    {"data": "long"}
                    ],
        "columnDefs": [
                    {   "targets": 0,
                        "render": function (data, type, row) {

                            var newLink = $("<a />", {
                                "id": row["short"],
                                "target" : "_blank",
                                "href" : "//" + data ,
                                "html" : data
                            });

                            return $(newLink).prop('outerHTML');

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
                    }
                    ],
        "initComplete": function () {    }
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


    $("#fromUrl").submit(function(event) {
        event.preventDefault();

        var formData = {
            'longurl': $('#longurl').val(),
        };

        $.ajax({
            type: "POST",
            url:  $(this).attr('action'),
            dataType    : 'json',
            contentType: 'application/json',
            encode          : true,
            data:  formData, // serializes the form's elements.
            beforeSend:function() {
                $("#btn_generate").text("Wait...");
                $("#btn_generate").removeClass("btn-primary");
                $("#btn_generate").addClass("btn-default");
            },
            complete:function() {
                $("#btn_generate").removeClass("btn-default");
                $("#btn_generate").addClass("btn-primary");

                $("#btn_generate").text("Generate");
            },
            success: function(json) {
                //  $.mockjax.clear();
                $("#div_result").removeClass("has-error");
                $('#input_shortUrl').val(json.shorturl);
                $('#input_shortUrl').focus();
                $('#input_shortUrl').select();
                },
            error: function(json) {
                //  $.mockjax.clear();
                $("#div_result").addClass("has-error");
                $('#input_shortUrl').val(json.responseText);
                console.dir(json);
            }
        });

        return false; // avoid to execute the actual submit of the form.
    });

});
