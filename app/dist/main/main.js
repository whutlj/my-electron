!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("electron-log")},function(e,t,n){const{app:o,BrowserWindow:i}=n(0),{join:r}=n(1),s=n(4),c=n(2),l=n(5),a=n(7);let p;function f(){if(a.initTary(),p=new i({width:1400,height:960,useContentSize:!0,webPreferences:{preload:o.getAppPath("exe")+"/preload/index.js",nodeIntegration:!1}}),s.dev())p.loadURL("http://localhost:8000"),c.info("本地加载","http://localhost:8000");else{const e=r(__dirname,"..","renderer");c.info(`file://${e}/index.html`),p.loadURL(`file://${e}/index.html`)}p.webContents.openDevTools()}l.initEvent(),o.on("ready",f),o.on("window-all-closed",()=>{c.info("用户平台",process.platform),"darwin"!==process.platform&&o.quit()}),o.on("activate",()=>{null===p&&(c.info("mac从程序坞激活"),f())}),e.exports.showWin=function(){p?p.show():f()}},function(e,t){e.exports=require("electron-is")},function(e,t,n){const{ipcMain:o,dialog:i}=n(0),r=n(2),s=n(6),c=n(1);e.exports=new class{constructor(){this.fileContent="",this.fileExtension=""}initEvent(){o.on("async-one",(e,t)=>{e.reply("async-one","main回复async-one"),r.info("main收到async-one消息",t)}),o.on("sync-one",(e,...t)=>{e.returnValue="main回复sync-one",r.info("main收到sync-one消息",t)}),o.on("showDialog",(e,t)=>{try{const{type:n}=t;if("open"===n&&i.showOpenDialog({properties:["openFile"],filters:[{name:"TXT",extensions:["txt","docx","doc"]}]},t=>{t&&s.stat(t[0],(n,o)=>{if(n)return r.error(n),e.reply("notice",{type:"error",description:n.message});s.readFile(t[0],(n,o)=>{if(n)return e.reply("notice",{type:"error",description:n.message});const i=c.extname(t[0]);i.includes(".")&&(this.fileExtension=i.substr(1)),this.fileContent=o,r.info(o)})})}),"save"===n){if(!this.fileContent)return e.reply("notice",{type:"warn",description:"还未选择要保存的文件"});i.showSaveDialog({properties:["openFile"],filters:[{name:this.fileExtension.toUpperCase(),extensions:[this.fileExtension]}]},t=>{t&&s.writeFile(t,this.fileContent,n=>{if(n)throw e.reply("notice",{type:"error",description:"保存文件失败"}),new n;r.info("写入文件成功：",t),this.fileContent="",this.fileExtension="",e.reply("notice",{type:"success",description:"保存文件成功"})})})}}catch(e){r.error(e)}})}}},function(e,t){e.exports=require("fs")},function(e,t,n){n(4);const{Tray:o,Menu:i,app:r}=n(0),s=(n(2),n(3)),{join:c}=n(1);e.exports=new class{constructors(e){this.trayIcon="",this.tray=null}initTary(){this.tray||(this.trayIcon=`${r.getAppPath("exe")}/static/img/tray-icon.png`,this.tray=new o(this.trayIcon),this.tray.setToolTip("花音直播"),this.initEvent())}initEvent(){this.tray.on("click",()=>{s.showWin()})}setHighlightMode(e){this.tray}}}]);