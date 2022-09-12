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

function saveJsons(jsons){
  var jsonStr = JSON.stringify(jsons);
  fs.writeFile('myjsonfile.json', jsonStr, 'utf8', ()=>{});
}

function processIconPage(err,data){
  if (err){
    throw err
  }

  const dom = new JSDOM(data);

  const iconListEle = dom.window.document.querySelector("#icon-list")
  const icons = iconListEle.childNodes
  const cleanIcons = []
  icons.forEach((currentValue)=>{
    if(currentValue.id===undefined){
      return
    }
    cleanIcons.push(currentValue)
  })

  let jsons = []
  //https://stackoverflow.com/questions/4534488/does-the-javascript-for-in-function-return-just-an-index
  //different from python, Js for...in returns only the index, this is a bad example to learn from
  for (let iconIndex in cleanIcons){
    let icon = cleanIcons[iconIndex]
    let lgIconEle = icon.querySelector(".icon-lg,.clearfix")
    let headingText = icon.querySelector("h3").textContent
    let introText= icon.querySelector("p").textContent
    let imgSrc = "https://www.ibm.com"+icon.querySelector("img").src
    let json = {title: headingText, intro: introText, img: imgSrc}
    jsons.push(json)
  }

  saveJsons(jsons)
}

function main(){
  readAndProcess("iconPage.html")
}

main()
