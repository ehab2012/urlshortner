/**
 * Created by aboudeh on 10/19/15.
 */

$(document1).ready(function() {

    /* Selects the entire value of a text input on focus */
    //$('[data-toggle="tooltip"]').tooltip();

    /*$('input[type=text]').on('focus', function() {
     var $th = $(this);
     setTimeout(function(){$th.select();}, 50);
     $th.tooltip();
     });*/

    /// -----------------------------------------------------

    //toggle `popup` / `inline` mode
    //$.fn.editable.defaults.mode = 'popup';

    //make username editable
    //$('#username').editable();
    /*
     //make status editable
     $('#status').editable({
     type: 'select',
     title: 'Select status',
     placement: 'right',
     value: 2,
     source: [
     {value: 1, text: 'status 1'},
     {value: 2, text: 'status 2'},
     {value: 3, text: 'status 3'}
     ]

     //uncomment these lines to send data on server
     //, pk: 1  ,url: '/post'
     });






     /*
     var url = "path/to/your/script.php"; // the script where you handle the form input.

     $.ajax({
     type: "POST",
     url: url,
     data: $("#idForm").serialize(), // serializes the form's elements.
     success: function(data)
     {
     alert(data); // show response from the php script.
     }
     });

     */


    /*$.ajax({
     url: "hello.php"
     }).done(function (response) {
     $('#output_fake').html(response);
     $.mockjax.clear();
     });*/

    $.getJSON('/api/beer/random', function(resp){
        $.mockjax.clear();
        $('#output_fake').select();
        $('#output_fake').focus();
        a=resp.shorturl;
    });

    $('#output_fake').val(a);

    /*$.postJSON(url, dataToBeSent, function(data, textStatus) {
     //data contains the JSON object
     //textStatus contains the status: success, error, etc
     }, "json");*/

    return false; // avoid to execute the actual submit of the form.



});

