$(document).ready(function() {

    $('#output_fake').click(function(e) {
        $(this).keypress(function(e){
            e.preventDefault();
        })
    });


    var table = $('#example').DataTable( {
        "ajax": "data/urls.txt",
        "columnDefs": [ {
            "targets": 0,
            "render": function ( data, type, full, meta ) {
                return '<a target="_blank" href="http://'+ data + '">' + data + '</a>';
            }
        } ]
    } );

    $('#example tbody').on( 'click', 'td', function () {
        var column_num = parseInt( $(this).index() );
        //var row_num = parseInt( $(this).parent().index() )+1;
        if(column_num===1) {
            $(this).closest('tr').toggleClass('warning');
            $("#delBtn").prop("disabled", (table.rows('.warning').data().length === 0));
        }
    } );

    $('#delBtn').click( function () {
        //alert((table.rows('.warning').data().length>0));
        var table = $('#example').DataTable();
        table.rows('.warning').remove().draw( false );
    } );



    $('#longurl').focus();

});


$('form').validator().on('submit', function (e) {
	if (e.isDefaultPrevented()) {
		// handle the invalid form...

	} else {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'longurl'              : $('#longurl').val(),
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/api/beer/random', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            contentType: 'application/json',
            encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);

                //  $.mockjax.clear();
                $('#output_fake').select();
                $('#output_fake').focus();
                $('#output_fake').val(data.shorturl);

                // here we will handle errors and validation messages
            })
            .fail(function(data) {

                // show any errors
                // best to remove for production
                console.log(data);

                // $.mockjax.clear();
                $('#output_fake').select();
                $('#output_fake').focus();
                $('#output_fake').val("error occured");
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();

	}
})

