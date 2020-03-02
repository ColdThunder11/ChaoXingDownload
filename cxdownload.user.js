// ==UserScript==
// @name         超星学习通课程资源直链下载
// @namespace    https://github.com/ColdThunder11/ChaoXingDownload
// @version      0.1
// @description  超星学习通课程资源直链下载，支持ppt(x),doc(x),pdf,mp4,flv,mp3资源的下载。
// @author       ColdThunder11
// @match        https://*.chaoxing.com/mycourse/studentstudy?chapterId=*&courseId=*&clazzid=*&enc=*
// @grant        none
// @supportURL   https://github.com/ColdThunder11/ChaoXingDownload/issues
// @updateURL    https://github.com/ColdThunder11/ChaoXingDownload/raw/master/cxdownload.user.js
// ==/UserScript==

(function() {
    'use strict';
    setInterval(()=>{
        var iframes=document.getElementsByTagName("iframe");
        for(var i=0;i<iframes.length;i++){
            var frames=iframes[i].contentWindow.document.getElementsByTagName("iframe");
            for(var j=0;j<frames.length;j++){
                var frame=frames[j];
                if(!frame) return;
                var fdiv=frame.parentNode;
                if(!fdiv) return;
                if(iframes[i].contentWindow.document.getElementsByClassName("ct11_dl")[j]!=null) return;
                var data=frame.getAttribute('data');
                if(data!=null){
                    var jsondata=JSON.parse(data);
                    if(jsondata.type==".ppt"||jsondata.type==".ppt"||jsondata.type==".mp4"||jsondata.type==".pdf"||jsondata.type==".flv"||jsondata.type==".doc"||jsondata.type==".docx"){
                        var downloadTag = document.createElement("A");
                        downloadTag.setAttribute("href","https://d0.ananas.chaoxing.com/download/"+jsondata.objectid);
                        downloadTag.setAttribute("class","ct11_dl");
                        downloadTag.innerHTML="点此下载 "+jsondata.name;
                        fdiv.appendChild(downloadTag);
                        continue;
                    }
                }
                if(frame.getAttribute("name").substr(frame.getAttribute("name").length-4,4)==".mp3"){
                    var adownloadTag = document.createElement("A");
                    adownloadTag.setAttribute("href","https://d0.ananas.chaoxing.com/download/"+frame.getAttribute("objectid"));
                    adownloadTag.setAttribute("class","ct11_dl");
                    adownloadTag.innerHTML="点此下载 "+frame.getAttribute("name");
                    fdiv.appendChild(adownloadTag);
                }

            }
        }
    },3000);
})();
