@Paginations
	User can either pass a list of data
	or
	Provide an api for the table to call 
		The api must have a response consist of the following fields:
			- list of data
			- the link for the next api
			- the link for the previous api
			- total count

	* Note that if items is provided, the table will not call the api.
	* API is still in alpha, don't use it for production.