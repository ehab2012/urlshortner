// api url definations
//APIURL="http://localhost:5000/urlshortener/api/urls"
APIURL="urlshortener/api/urls"
SHORTURL="http://l.tryme.xyz/"

$(document).ready(function () {

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
        "initComplete": function () {
                // when we are ready lets focus
                $('#longurl').focus();
        }
    });

});


/// submit part

$("#fromUrl").submit(function(event) {
    event.preventDefault();

    var formData = {
        'longurl': $('#longurl').val(),
    };
    /*
     var formData = {
     'name'              : $('input[name=name]').val()
     }
     */

    $.ajax({
        type: "POST",
        url:  APIURL, //$(this).attr('action'),
        dataType    : 'json',
        contentType: 'application/json',
        encode          : true,
        data:  formData, // serializes the form's elements.
        beforeSend:function() {
            $('#btn_generate').button('loading');
        },
        complete:function() {
            $('#btn_generate').button('reset');
        },
        success: function(json) {
            //  $.mockjax.clear();
            addShortUrl(json);

            $('#btn_generate').button('reset');
            setTimeout(function() {
                $(".alert-success").slideUp()
            }, 2000);
            $(".alert-success").slideDown();

            //$("#div_result").removeClass("has-error");
            $('#input_shortUrl').val(json.shorturl);
            $('#input_shortUrl').focus();
            $('#input_shortUrl').select();
        },
        error: function(json) {
            //  $.mockjax.clear();
            //$("#div_result").addClass("has-error");
            $('#input_shortUrl').val(json.responseText);
            setTimeout(function() {
                $(".alert-danger").slideUp()
            }, 2000);
            $(".alert-danger").slideDown();

        }
    });

    return false; // avoid to execute the actual submit of the form.
});


// disable editing in input_shortUrl
$('#input_shortUrl').click(function (e) {
    $(this).keypress(function (e) {
        e.preventDefault();
    })
});

// multiselecting datatable rows
$('#table_dataTables tbody').on('click', 'td', function () {
    var column_num = parseInt($(this).index());
    //var row_num = parseInt( $(this).parent().index() );
    if (column_num === 1) {
        var t = $('#table_dataTables').DataTable();
        $(this).closest('tr').toggleClass('warning');
        $("#btn_deleteUrl").prop("disabled", (t.rows('.warning').data().length === 0));
    }
});

// delete the link
$('#btn_deleteUrl').click(function () {
    var table = $('#table_dataTables').DataTable();
    if((table.rows('.warning').data().length>0)) // really make sure
        bootbox.confirm("<b>Confirm deletion of selected row(s)</b>", function(result) {
            if(result)
            {
                DeleteUrls();
            }
        });
});


// add shorturl to datatable
function addShortUrl(json)
{
    console.log(json);
    var t = $('#table_dataTables').DataTable();
    t.row.add({
        "short": json.shorturl,
        "long": json.longurl
    } ).draw( false );
}


// add shorturl to datatable
function DeleteUrls()
{
    var table = $('#table_dataTables').DataTable();
    if(table.rows('.warning').data().length<=0)  // sanity check
        return;

    var table_data=table.rows('.warning').data();
    var arr_tmpDel=[];
    $.each(table_data, function( index, value ) {
        arr_tmpDel.push(value.short);
    });

    if(arr_tmpDel.length===0)
        return;

    $.ajax({
        type: "DELETE",
        url:  APIURL,
        dataType    : 'json',
        contentType: 'application/json',
        encode          : true,
        data: JSON.stringify(arr_tmpDel), // serializes the form's elements.
        beforeSend:function() {
            $('#btn_deleteUrl').button('loading');
        },
        complete:function() {
            $('#btn_deleteUrl').button('reset');
        },
        success: function(json) {
            //  $.mockjax.clear();

            setTimeout(function() {
                $(".alert-success").slideUp()
            }, 2000);

            $(".alert-success").slideDown();
            table.rows('.warning').remove().draw(false);
        },
        error: function(json) {
            //  $.mockjax.clear();
            setTimeout(function() {
                $(".alert-danger").slideUp()
            }, 2000);
            $(".alert-danger").slideDown();
        }
    });


}
