/**
 * Background js file that checks costo tires.
 */

console.log('background.js loaded');

var COSTCO_TIRES_WEBSITE = 'http://tires2.costco.com/SearchHandler.ashx';
var DELIMITER = '@%@';

// Config Options for the search.
var YEAR = 2011;
var MAKE = 'BMW';
var MODEL = 'M3';
var OPTIONS = 'Base';

var jqxhr;
var a;
var b;

function getSearchUrl() {
  return COSTCO_TIRES_WEBSITE + '?SearchParams=' + YEAR + DELIMITER + MAKE
      + DELIMITER + MODEL + DELIMITER + OPTIONS + DELIMITER + '1';
}

function getSearchId() {
  console.log('getSearchId called');
  // Make inital search request.
  jqxhr = $.ajax({
      url: getSearchUrl(),
      type: 'GET',
      dataType: 'json'
    })
    .fail(function(jqxhr, textStatus, error) {
      console.log('Failure to get Costco website with error: ' + error);
    })
    .done(function(data) {
      console.log('Finished getting search id.');
      makeSearchRequest(data[0]['SearchID']);
      a = data;
    });
};

function makeSearchRequest(searchId) {
  console.log('makeSearchRequest called');
  console.log(searchId);
}

getSearchId();
console.log('done');

//$foop = $('<form>' + data.results[0] + '</form>');
//$('#content').add(data.results[0]);
