const { app, BrowserWindow } = require('electron');
const path = require('path');
const ejse = require('ejs-electron')
//all my dependancies

setInterval(showTime, 1000);
function showTime() {
  let d = new Date();
  let hour = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  am_pm = "AM";

  if (hour > 12) {
      hour -= 12;
      am_pm = "PM";
  }
  if (hour == 0) {
      hr = 12;
      am_pm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" 
          + min + ":" + sec + am_pm;

ejse.data('time', currentTime)
//this single line is what sends the time to the EJS file to display (EJS is a templating engine that basically works like an HTML file but i can send stuff to it even when using nodeJS)
}
showTime();
//this huge function is what actually tells the time, it takes info from the Date object and turns it into a digital clock style readout

function createWindow () {
    const win = new BrowserWindow({
      width: 500,
      height: 150,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    })
  
    win.loadFile('index.ejs')

var reloadInterval = setInterval(reloadWindow, 1000)
function reloadWindow (){
  win.loadFile('index.ejs')
}
//this function tells the app to recheck the index.ejs for changes every second
}
//this function creates the window my clock is on, then tells it what HTML file to load onto it, it also defines its size in pixels

  app.whenReady().then(() => {
    createWindow()
  });