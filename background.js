/**
 * Background js file that checks costo tires.
 */

console.log('background.js loaded');

var COSTCO_TIRES_WEBSITE = 'http://tires2.costco.com/';
var SEARCH_URL = 'SearchHandler.ashx';
var SEARCH_RESULTS_URL = 'SearchResults.aspx';
var DELIMITER = '@%@';

// Config Options for the search.
var YEAR = 2011;
var MAKE = 'BMW';
var MODEL = 'M3';
var OPTIONS = 'Base';

var jqxhr;
var a;
var b;
var $foo;

function getSearchUrl() {
  return COSTCO_TIRES_WEBSITE + SEARCH_URL + '?SearchParams=' + YEAR +
      DELIMITER + MAKE + DELIMITER + MODEL + DELIMITER + OPTIONS + DELIMITER
      + '1';
}

function getSearchId() {
  console.log('getSearchId called');
  // Make inital search request.
  $.ajax({
      url: getSearchUrl(),
      type: 'GET',
      dataType: 'json'
    })
    .fail(function(error) {
      console.log('Failure to get SearchId from Costco website. ' + error);
    })
    .done(function(data) {
      console.log('Finished getting search id.');
      makeSearchRequest(data[0]['SearchID']);
    });
};

function makeSearchRequest(searchId) {
  console.log('makeSearchRequest called');
  console.log(COSTCO_TIRES_WEBSITE + SEARCH_RESULTS_URL + '?SearchID='
      + searchId);
  $.ajax({
      url: COSTCO_TIRES_WEBSITE + SEARCH_RESULTS_URL + '?SearchID=' + searchId,
      type: 'GET'
    })
    .fail(function(error) {
      console.log('Failure to get search results from Costco website. ' + error);
    })
    .done(function(data) {
      console.log('Finished getting search results.');
      var $temp = $.parseHTML(data);
      //TODO handle pagination case.
      //$foo = $($temp[$temp.length - 1]).find('#p_lt_zoneContent_pageplaceholder_p_lt_ctl02_TireSearchResults_gvOrginalFitmentFrontTires')
      $foo = $($temp[$temp.length - 1]).find('#p_lt_zoneContent_pageplaceholder_p_lt_ctl02_TireSearchResults_gvOptionalFitmentRearTires')
          .find('div.tireDetails h3 span')
          .filter(function(index, el) {
            return checkTire(this.innerHTML);
          });
      getResults($foo);
    });
};

function checkTire(tire) {
  var re = /[Mm]ichelin.*[Ss]uper.*[Ss]port/;
  return re.test(tire);
}

/**
 * Return whether the tire is the right one.
 */
function getResults(list) {
  console.log('Does Costco have your tire?');
  console.log(list.length > 0);
}

getSearchId();
console.log('done');
//$foop = $('<form>' + data.results[0] + '</form>');
//$('#content').add(data.results[0]);
