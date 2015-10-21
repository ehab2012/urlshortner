jQuery(function () {

	$.mockjax(function (requestSettings) {

		// Here is our manual URL matching...
		if (requestSettings.url === "url/generate" && requestSettings.type === "POST") {

			return {
				response: function (origSettings) {
					// now we check the request headers, which may be set directly
					// on the xhr object through an ajaxSetup() call or otherwise:

					// requestSettings.headers["Authentication"] === "some-token"
					if (1) {
						this.dataType = "json",
						this.contentType = "text/json",
							//this.proxy= '/mocks/data.json',  // returns json file
							//  isTimeout: true
						this.responseTime= 750,  // make them wait
						this.responseText = {shorturl: "short_" + requestSettings.data["longurl"]}, //{ user: { id: 13 } };
						this.status = 200;
					} else {
						this.responseTime= 750,  // make them wait
						this.responseText = "failed generating short url!" ,
						this.status = 403;
					}
				}
			};
		}



		// If you get here, there was no url match
		return;
	});

});