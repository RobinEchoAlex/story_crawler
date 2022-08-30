console.log("hello")

const axios = require('axios').default;
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function getIconPage(){
  axios.get('https://www.ibm.com/ibm/history/ibm100/us/en/icons/')
    .then(function (response) {
      // handle success
      // console.log(response);
      fs.writeFile("iconPage.html", response.data, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

}

function readAndProcess(iconPagePath){
  fs.readFile(iconPagePath,{encoding:'utf-8'},processIconPage)
}

function processIconPage(err,data){
  if (err){
    throw err
  }

  const dom = new JSDOM(data);
  console.log(dom.window.document)
  console.log(dom.window.document.querySelector(".ibm-access").innerHTML);


}

function main(){
  readAndProcess("iconPage.html")
}

main()
