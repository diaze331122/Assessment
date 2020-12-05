/**
*
* Javascript file that uses Jquery to
* perform search queries using
* Entrez-Utilities API and Crossref API
*
**/

/**
* Class that Uses NCBI Entrez-Utilities
* to search for article records
*
*/
function EntrezUtilities(){

	const baseURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
	const db = "pubmed";

	/**
	* Searches pubmed database and returns a list of UIDs matching 
	* the term (query) specified.
	*
	**/
	this.searchRecordsByTerm = function(options){

		return new Promise((resolve,reject)=>{
			$.ajax({
				url: baseURL+"esearch.fcgi?",
				dataType: "xml",
				type: "GET",
				data:{
					db: db,
					term: options.data.term
				},
				cache: false,
				timeout: 600000

			}).done(function(data){
				resolve(data);

			}).fail(function(error){
				reject(error);

			});
		});

	}

	/**
	* Searches pubmed database and returns formatted records
	* for a list of UIDs
	**/
	this.searchRecordsByIDs = function(options){

		return new Promise((resolve,reject)=> {
			$.ajax({
				url: baseURL+"efetch.fcgi",
				dataType: "xml",
				type: "GET",
				data: {
					db: db,
					retmode: "xml",
					rettype: "abstract",
					id: options.data.ids
				},
				cache: false,
				timeout: 600000

			}).done(function(data){
				resolve(data);

			}).fail(function(error){
				reject(error);

			})			

		});
	}
}


function Crossref(){

	const baseURL = "https://api.crossref.org/works/";

	/**
	* Searches crossref and returns a record 
	* matching doi
	**/
	this.searchRecordsByDOI = function(options){
			$.ajax({
				url: baseURL+options.data.doi,
				type: "GET",
				contentType: "JSON"
			}).done(function(data){
				resolve(data);
				//console.log(data.message);
				//console.log(data.message.title);
				//console.log(data.message.author);

			}).fail(function(error){
				reject(error);
				console.log(error);
			});
	} 
}