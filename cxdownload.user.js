// ==UserScript==
// @name         超星学习通课程资源直链下载
// @namespace    https://github.com/ColdThunder11/ChaoXingDownload
// @version      0.24
// @description  超星学习通课程资源直链下载，支持ppt(x),doc(x),pdf,mp4,flv,mp3,avi资源的下载，支持整节课资源批量下载。
// @author       ColdThunder11
// @match        *://*.chaoxing.com/mycourse/studentstudy?chapterId=*&courseId=*&clazzid=*&enc=*
// @match        *://*.chaoxing.com/coursedata?classId=*&courseId=*&type=*&ut=*&enc=*&cpi=*&openc=*
// @match        *://*.chaoxing.com/coursedata?courseId=*&classId=*&type=*&enc=*&ut=*&openc=*
// @match        *://*.chaoxing.com/coursedata/search?dataName=*&courseId=*&classId=*&ut=*&cpi=*&openc=*
// @match        *://*.chaoxing.com/coursedata?courseId=*&classId=*&type=*&ut=*&enc=*&cpi=*&openc=*
// @match        *://*.chaoxing.com/coursedata?courseId=*&dataName=*&dataId=*&type=*&parent=*&flag=*&classId=*&enc*&ut=*&cpi=*&openc=*
// @match        *://*.edu.cn/mycourse/studentstudy?chapterId=*&courseId=*&clazzid=*&enc=*
// @match        *://*.edu.cn/coursedata?classId=*&courseId=*&type=*&ut=*&enc=*&cpi=*&openc=*
// @match        *://*.edu.cn/coursedata?courseId=*&classId=*&type=*&enc=*&ut=*&openc=*
// @match        *://*.edu.cn/coursedata/search?dataName=*&courseId=*&classId=*&ut=*&cpi=*&openc=*
// @match        *://*.edu.cn/coursedata?courseId=*&classId=*&type=*&ut=*&enc=*&cpi=*&openc=*
// @match        *://*.edu.cn/coursedata?courseId=*&dataName=*&dataId=*&type=*&parent=*&flag=*&classId=*&enc*&ut=*&cpi=*&openc=*
// @grant        none
// @supportURL   https://github.com/ColdThunder11/ChaoXingDownload/issues
// @updateURL    https://github.com/ColdThunder11/ChaoXingDownload/raw/master/cxdownload.user.js
// ==/UserScript==

var enableCoursedataDownload=false;

(function() {
    'use strict';
    var url=document.location.toString();
    if(url.indexOf("coursedata")!=-1&&enableCoursedataDownload){
        setTimeout(()=>{
            if(document.getElementsByClassName("ct11_dl")[0]==null){
                var fileList=document.getElementsByClassName("ZYCon")[0].childNodes[1].childNodes[3].childNodes;
                for(var i=0;i<fileList.length;i++){
                    try{
                        if(fileList[i].getAttribute("type")!="afolder"){
                            var objectid=fileList[i].getAttribute("objectid");
                            var downloadTag = document.createElement("A");
                            downloadTag.setAttribute("href","https://d0.ananas.chaoxing.com/download/"+objectid);
                            downloadTag.setAttribute("class","ct11_dl");
                            downloadTag.innerHTML="下载";
                            fileList[i].childNodes[3].childNodes[1].appendChild(downloadTag);
                        }
                    }
                    catch(e){}
                }
            }
        },1500);
    }
    else{
        setInterval(()=>{
            var haveResource=false;
            var downloadLinks;
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
                        if(jsondata.type==".ppt"||jsondata.type==".pptx"||jsondata.type==".mp4"||jsondata.type==".pdf"||jsondata.type==".flv"||jsondata.type==".doc"||jsondata.type==".docx"||jsondata.type==".avi"||jsondata.type==".wmv"){
                            if(!haveResource) {
                                haveResource=true;
                                downloadLinks=new Array();
                            }
                            downloadLinks.push("https://d0.ananas.chaoxing.com/download/"+jsondata.objectid)
                            var downloadTag = document.createElement("A");
                            downloadTag.setAttribute("href","https://d0.ananas.chaoxing.com/download/"+jsondata.objectid);
                            downloadTag.setAttribute("class","ct11_dl");
                            downloadTag.setAttribute("style","font-size: 14px;color: #666666;");
                            downloadTag.innerHTML="点此下载 "+jsondata.name;
                            fdiv.appendChild(downloadTag);
                            continue;
                        }
                    }
                    if(frame.getAttribute("name")==null) continue;
                    if(frame.getAttribute("name").substr(frame.getAttribute("name").length-4,4)==".mp3"){
                        if(!haveResource) {
                            haveResource=true;
                            downloadLinks=new Array();
                        }
                        downloadLinks.push("https://d0.ananas.chaoxing.com/download/"+frame.getAttribute("objectid"))
                        var adownloadTag = document.createElement("A");
                        adownloadTag.setAttribute("href","https://d0.ananas.chaoxing.com/download/"+frame.getAttribute("objectid"));
                        adownloadTag.setAttribute("class","ct11_dl");
                        adownloadTag.setAttribute("style","font-size: 14px;color: #666666;");
                        adownloadTag.innerHTML="点此下载 "+frame.getAttribute("name");
                        fdiv.appendChild(adownloadTag);
                        continue;
                    }

                }
            }
            if(haveResource){
                if(iframes[0].parentNode.getElementsByClassName("ct11_dl")[0]!=null) iframes[0].parentNode.getElementsByClassName("ct11_dl")[0].remove()
                var allDownloadTag = document.createElement("A");
                allDownloadTag.setAttribute("class","ct11_dl");
                allDownloadTag.setAttribute("style","font-size: 14px;color: #666666;");
                allDownloadTag.setAttribute("href","javascript:void(0)");
                allDownloadTag.innerHTML="点此下载本节内的全部资源";
                allDownloadTag.onclick = function name(params) {
                    for(var i=0;i<downloadLinks.length;i++){
                        const iiframe = document.createElement("iframe");
                        iiframe.style.display = "none";
                        iiframe.style.height = 0;
                        iiframe.src = downloadLinks[i];
                        document.body.appendChild(iiframe);
                        setTimeout(()=>{
                            iiframe.remove();
                        }, 10000);
                    }
                }
                iframes[0].parentNode.insertBefore(allDownloadTag,iframes[0])
            }
        },3000);
    }
})();
