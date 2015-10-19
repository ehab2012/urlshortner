$.mockjax(function( requestSettings ) {

    // Here is our manual URL matching...
    if ( requestSettings.url === "/api/beer/random" ) {
        console.log("------------------------",requestSettings);
        // We have a match, so we return a response callback...
        return {
            response: function( origSettings ) {

                // now we check the request headers, which may be set directly
                // on the xhr object through an ajaxSetup() call or otherwise:

                // requestSettings.headers["Authentication"] === "some-token"
                if ( 1 ) {
                    this.responseText = {shorturl : "short_" + requestSettings.data["longurl"]} //{ user: { id: 13 } };
                    this.status = 200;
                } else {
                    this.status = 403;
                    this.responseText = "You are not authorized";
                }
            }
        };
    }
    // If you get here, there was no url match
    return;
});

/*
$.mockjax({
    url: "/api/beer/random",
    responseText: {
        shorturl : "the short url"
    },
    status: 201

});*/

$(document).ready(function() {

    $('#output_fake').click(function(e) {
        $(this).keypress(function(e){
            e.preventDefault();
        })

    });

    $('#example').DataTable( {
        "ajax": "data/urls.txt"
    } );

    $('#longurl').focus();

    // process the form
    $('form').submit(function(event) {

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

    });


});


$('form').validator().on('submit', function (e) {

	if (e.isDefaultPrevented()) {
		// handle the invalid form...
	} else {

	}
})

