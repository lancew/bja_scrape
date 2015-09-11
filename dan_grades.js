var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


var baseURL = 'http://membersearch.britishjudo.org.uk/dan-register-display.php?number=';
var numberID = 1000;

while (numberID < 99999) {
    request(baseURL+numberID, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            if($('body>form>table').length) {
                var table_content = $('body>form>table').contents().toString();
                if(table_content.match(/<td>.*Dan<\/td>/)) {
                var name =table_content.match(/width="432">.*</).toString();
                name = name.replace(/width="432">/,'');
                name = name.replace(/</,'');
                table_content = table_content.match(/<td>.*Dan<\/td>/);
                table_content = table_content.toString().replace(/<td>/,'');
                table_content = table_content.toString().replace(/<\/td>/,'');
                console.log('' + name + ',' + table_content );
                }
                //console.log($('div.club_details>p:nth-child(2)').text().replace('Club Correspondence: ',''));
            }
        } else {
            console.log(error);

        }
    });
    numberID++;

}
