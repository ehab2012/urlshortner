/**
 * Created by aboudeh on 10/20/15.
 */
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
