const request = require('request-promise');
const cheerio = require('cheerio');
const req = require('request');
var fs = require('fs');
var url = 'https://www.inc.com/lolly-daskal/100-motivational-quotes-that-will-inspire-you-to-succeed.html';
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        var page = $.text();
        page = page.substring(2205);
        var s = "";
        let listQuotes = new Array();
        var quo = false
        for (var i = 0; i < page.length; i++) {
            if(!(page.charAt(i) == "1" || page.charAt(i) == "2" || page.charAt(i) == "3" || 
            page.charAt(i) == "4" || page.charAt(i) == "5" || page.charAt(i) == "6" ||
             page.charAt(i) == "7" || page.charAt(i) == "8" || page.charAt(i) == "9" || page.charAt(i) == "0"))
            {
                s+=page.charAt(i)
            }
          }
          var temp = "";
          var ind = 0;
          while(ind < page.length-2)
          {
              if(page.charAt(ind) != ".")
              {
              temp+=page.charAt(ind);
              }
              else
              {
                if((page.charAt(ind-1) == "1" || page.charAt(ind-1) == "2" || page.charAt(ind-1) == "3" || 
                page.charAt(ind-1) == "4" || page.charAt(ind-1) == "5" || page.charAt(ind-1) == "6" ||
                 page.charAt(ind-1) == "7" || page.charAt(ind-1) == "8" || page.charAt(ind-1) == "9" || page.charAt(ind-1) == "0"))
                {
                    temp = temp.replace(/[0-9]/g, '');
                    console.log(temp.length);
                  listQuotes.push(temp);
                  temp = "";
                }
                else
                {
                    temp+=page.charAt(ind);
                }
                
              }
              ind++;
          }
          
        var allQuotes = JSON.stringify(listQuotes);
        var test = JSON.stringify(page);
         fs.writeFile('quotes.json', allQuotes, finished);
         fs.writeFile('test.json', test, finished);
       
    }
});
function finished(error)
  {
    if(error != null)
    {
      console.log(error);
    }
  }

