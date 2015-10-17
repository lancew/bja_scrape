var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');


var baseURL = 'http://membersearch.britishjudo.org.uk/dan-register-display.php?number=';
var numberID = 1000;

while (numberID < 9999) {
    request(baseURL+numberID, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            if($('body>form>table').length) {
                var table_content = $('body>form>table').contents().toString();
                var tablesJson = tabletojson.convert($('body>form>table'));

                //console.log(tablesJson[2]);
                var name = (tablesJson[2][1])[1];
                var grade = (tablesJson[2][5])[1];
                var area = (tablesJson[2][3])[1];
                var club = (tablesJson[2][2])[1];
                var gender = (tablesJson[2][4])[1];
                var awarded_year = ((tablesJson[2][6])[1]).match(/\d{4}$/);

                console.log( [name,grade,area,club,gender,awarded_year].join(',') );



                //console.log($('div.club_details>p:nth-child(2)').text().replace('Club Correspondence: ',''));
            }

        } else {
            console.log(error);

        }
    });
    numberID++;

}
