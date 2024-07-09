// ==UserScript==
// @name         RefreshTickets
// @namespace    http://tampermonkey.net/
// @version      1.0
// @updateURL    https://github.com/rave340Dev/tampermonkeyShit/raw/main/RefreshTickets.user.js
// @downloadURL  https://github.com/rave340Dev/tampermonkeyShit/raw/main/RefreshTickets.user.js
// @description  Adds a button and hotkey(Shift+R) to auto reload boost/t.corp ticket queue
// @author       Mathew Channell @hmchanne
// @match        https://myday-website.cmh.aws-border.com/dashboard
// @match        https://t.corp.amazon.com/issues*
// @icon         https://svgur.com/i/17qh.svg
// @grant        none
// @require		https://code.jquery.com/jquery-3.4.1.min.js
// @require		https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// ==/UserScript==
var reloadLen = 60; //How many Seconds to refresh Queue
var time = reloadLen;
var button = '[aria-label="Reload tickets"]'
var page = "MyDay | DashBoard"
var doRefresh = false
var tabTitle;
var hdStuff = ["awsui_root_18582_frdpw_93 awsui_horizontal_18582_frdpw_108 awsui_horizontal-m_18582_frdpw_124", 1]

if(window.location.href.indexOf("t.corp") > -1) {
    button = '[aria-label="Refresh"]'
    page = "t.corp"
    hdStuff = ["awsui_root_18582_thzpv_97 awsui_horizontal_18582_thzpv_112 awsui_horizontal-xs_18582_thzpv_122", 0]
}

(function() {
    'use strict';
    setTimeout(() => {
        addBtn()
    }, 3500);

    document.addEventListener("keypress", (e) => {
         var evtobj = window.event ? event : e
         if(evtobj.keyCode == 82 && evtobj.shiftKey) {
             var clickBtn = document.getElementsByClassName("refreshStatusBtn")[0]
             clickBtn.click()
         }
     });
})();

function addBtn() {
    var newBtnDiv = document.createElement("div")
    newBtnDiv.setAttribute("class", "refreshStatusBtnDiv awsui_child_18582_frdpw_97")
    var newBtn = document.createElement("button")
    newBtn.setAttribute("class", "refreshStatusBtn awsui_button_vjswe_1okex_101 awsui_variant-normal_vjswe_1okex_130 awsui_button-no-text_vjswe_1okex_979")


    newBtnDiv.appendChild(newBtn)

    var header = document.getElementsByClassName(hdStuff[0])[hdStuff[1]];

    var refrshSymbol = document.createElement("p")
    refrshSymbol.innerText = "Auto Refresh ❌"
    refrshSymbol.style.marginTop = "0"
    refrshSymbol.style.paddingTop = "0"
    refrshSymbol.style.color = "white"



    newBtnDiv.style.maxHeight = `${31.667}px`
    newBtn.style.maxHeight = `${31.667}px`

    newBtn.style.maxWidth = `${150}px`

    newBtn.appendChild(refrshSymbol)


    header.prepend(newBtnDiv)

    var radius = 31.667;

    newBtnDiv.style.minHeight = `${radius}px`
    newBtn.style.minHeight = `${radius}px`
    newBtnDiv.style.minWidth = `${radius}px`
    newBtn.style.minWidth = `${radius}px`

    var bgRed = "rgba(255, 25, 25, 0.5)"
    var bgGrn = "rgba(25, 255, 25, 0.5)"
    newBtn.style.background = bgRed

    newBtn.onclick = () => {
        if(!doRefresh) {
            newBtn.style.background = bgGrn
            tabTitle = setInterval(updateTitle, 1000)
            refrshSymbol.innerText = "Auto Refresh ✔️"
            refrshSymbol.style.color = "black"
             }
             else {
                 clearInterval(tabTitle);
                 newBtn.style.background = bgRed
                 refrshSymbol.innerText = "Auto Refresh ❌"
                 refrshSymbol.style.color = "white"
                 document.title = `MyDay | DashBoard`;
             }
             doRefresh = !doRefresh
    }
   }

function refrsh()
{
    document.querySelector(button).click();

    time = reloadLen;
}

function updateTitle() {
    document.title = `${time} - ${page}`;
    time -= 1
    if(!time) {
        refrsh()
    }
}
