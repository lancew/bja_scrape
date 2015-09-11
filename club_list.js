'use strict';

var request = require('request');
var cheerio = require('cheerio');

var baseURL = 'http://www.britishjudo.org.uk/clubs/';
var clubID = 0;

while (clubID < 10000) {
    request(baseURL+clubID, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            if($('div.club_info>h1').length) {
                console.log($('div.club_info>h1').text());
            }
        } else {
            console.log(error);

        }
    });
    clubID++;

}
