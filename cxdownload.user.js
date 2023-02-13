// ==UserScript==
// @name         超星学习通课程资源直链下载
// @namespace    https://github.com/ColdThunder11/ChaoXingDownload
// @version      0.37
// @description  超星学习通课程资源直链下载，支持ppt(x),doc(x),pdf,mp4,flv,mp3,avi资源的下载，支持整节课资源批量下载。
// @author       ColdThunder11
// @match        *://*.chaoxing.com/mycourse/studentstudy?chapterId=*&courseId=*&clazzid=*&enc=*
// @match        *://*.chaoxing.com/coursedata?classId=*
// @match        *://*.chaoxing.com/coursedata?courseId=*
// @match        *://*.chaoxing.com/coursedata/search?dataName=*&courseId=*
// @match        *://*.chaoxing.com/ananas/modules/pdf/index.html*
// @match        *://*.edu.cn/mycourse/studentstudy?chapterId=*&courseId=*&clazzid=*&enc=*
// @match        *://*.edu.cn/coursedata?classId=*
// @match        *://*.edu.cn/coursedata?courseId=*
// @match        *://*.edu.cn/coursedata/search?dataName=*&courseId=*
// @match        *://*.edu.cn/ananas/modules/pdf/index.html*
// @run-at       document-start
// @grant        unsafeWindow
// @supportURL   https://github.com/ColdThunder11/ChaoXingDownload/issues
// ==/UserScript==

(function () {
    'use strict';
    try{
        let href = unsafeWindow.top.location.href
    }
    catch{
        location.reload() //Refresh page to avoid cross-origin problem cause by http page
        return
    }
    if(unsafeWindow.top.location.href != unsafeWindow.location.href){ //Only run xhr hook in iframe
        var myOpen = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function () {
            //console.log(arguments)
            this.addEventListener("load",()=>{
                if(this.responseText.includes("d0.ananas.chaoxing.com/download/") ){
                    //console.log(this.responseText);
                    let jsondata = JSON.parse(this.responseText);
                    if(unsafeWindow.top.decdata != null){
                        unsafeWindow.top.decdata[jsondata.objectid] = jsondata.download
                    }
                }
            })
            return myOpen.apply(this,arguments)
        };
        var mySend = unsafeWindow.XMLHttpRequest.prototype.send;
        unsafeWindow.XMLHttpRequest.prototype.send = function () {
            mySend.apply(this,arguments);
        };
    }
    else{
        unsafeWindow["decdata"] = {}
    }
    var url = document.location.toString();
    if (url.indexOf("coursedata") != -1) {
        setTimeout(() => {
            if (document.getElementsByClassName("ct11_dl")[0] == null) {
                var fileList = document.getElementsByClassName("ZYCon")[0].childNodes[1].childNodes[3].childNodes;
                let getQueryStringFunc = (name)=> {
                    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    let r = window.location.search.substr(1).match(reg);
                    if (r != null) {
                        return decodeURIComponent(r[2]);
                    };
                    return null;
                }
                for (var i = 0; i < fileList.length; i++) {
                    try {
                        if (fileList[i].getAttribute("type") != "afolder") {
                            let itemId = fileList[i].getAttribute("id");
                            let objectid = fileList[i].getAttribute("objectid");
                            var downloadTag = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74\x28\x22\x64\x69\x76\x22\x29");
                            downloadTag.setAttribute("href", "javascript:void(0)");
                            downloadTag.setAttribute("style", "cursor:pointer;");
                            downloadTag.setAttribute("class", "ct11_dl");
                            downloadTag.innerHTML = "下载";
                            downloadTag.onclick = function name(params) {
                                //let download_link = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x73\x2d\x61\x6e\x73\x2e\x63"
                                //download_link += "\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" + objectid;
                                let download_link = "/coursedata/downloadData?dataId=" + itemId + "&classId=" + getQueryStringFunc("classId") + "&cpi=" + getQueryStringFunc("cpi") + "&courseId=" + getQueryStringFunc("courseId") + "&ut=s"
                                window.location = download_link
                            }
                            eval("\x66\x69\x6c\x65\x4c\x69\x73\x74\x5b\x69\x5d\x2e\x63\x68\x69\x6c\x64\x4e\x6f\x64\x65\x73\x5b\x33\x5d\x2e\x63\x68\x69\x6c\x64\x4e\x6f\x64\x65\x73\x5b\x31\x5d\x2e\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64\x28\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x54\x61\x67\x29");
                        }
                    }
                    catch (e) { }
                }
            }
        }, 1500);
    }
    else {
        setInterval(() => {
            var haveResource = false;
            var downloadLinks;
            var if2rames = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65\x28\x22\x69\x66\x72\x61\x6d\x65\x22\x29");
            for (var i = 0; i < if2rames.length; i++) {
                var frames = eval("\x69\x66\x32\x72\x61\x6d\x65\x73\x5b\x69\x5d\x2e\x63\x6f\x6e\x74\x65\x6e\x74\x57\x69\x6e\x64\x6f\x77\x2e\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65\x28\x22\x69\x66\x72\x61\x6d\x65\x22\x29");
                for (var j = 0; j < frames.length; j++) {
                    var frame = frames[j];
                    if (!frame) return;
                    var fdiv = frame.parentNode;
                    if (!fdiv) return;
                    if (if2rames[i].contentWindow.document.getElementsByClassName("ct11_dl")[j] != null) return;
                    var data = frame.getAttribute('data');
                    if (data != null) {
                        let jsondata = JSON.parse(data);
                        if (jsondata.type == ".ppt" || jsondata.type == ".pptx" || jsondata.type == ".mp4" || jsondata.type == ".pdf" || jsondata.type == ".flv" || jsondata.type == ".doc" || jsondata.type == ".docx" || jsondata.type == ".avi" || jsondata.type == ".wmv" || jsondata.type == ".mpg" || jsondata.type == ".mpeg") {
                            if (!haveResource) {
                                haveResource = true;
                                downloadLinks = new Array();
                            }
                            if (jsondata.type == ".mp4" || jsondata.type == ".avi" || jsondata.type == ".wmv" || jsondata.type == ".mpg" || jsondata.type == ".mpeg" || jsondata.type == ".flv") {
                                let v_tag = frame.contentWindow.document.getElementsByTagName("video");
                                console.log(v_tag);
                                //downloadLinks.push("\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x73\x2d\x61\x6e\x73\x2e\x63\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" + jsondata.objectid)
                                let downloadTag = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74\x28\x22\x64\x69\x76\x22\x29");
                                console.log(v_tag[0].currentSrc);
                                downloadTag.setAttribute("href", "javascript:void(0)");
                                downloadTag.setAttribute("class", "ct11_dl");
                                downloadTag.setAttribute("style", "font-size: 14px;color: #666666;cursor:pointer;");
                                downloadTag.innerHTML = "点此下载 " + jsondata.name;
                                downloadTag.onclick = function name(params) {
                                    let download_link = v_tag[0].currentSrc
                                    //download_link += "\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" +jsondata.objectid;
                                    window.location = download_link
                                }
                                eval("\x66\x64\x69\x76\x2e\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64\x28\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x54\x61\x67\x29");
                            }
                            else {
                                //downloadLinks.push("\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x73\x2d\x61\x6e\x73\x2e\x63\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" + jsondata.objectid)
                                let downloadTag = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74\x28\x22\x64\x69\x76\x22\x29");
                                downloadTag.setAttribute("href", "javascript:void(0)");
                                downloadTag.setAttribute("class", "ct11_dl");
                                downloadTag.setAttribute("style", "font-size: 14px;color: #666666;cursor:pointer;");
                                downloadTag.innerHTML = "点此下载 " + jsondata.name;
                                downloadTag.onclick = function name(params) {
                                    //let download_link = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x73\x2d\x61\x6e\x73\x2e\x63"
                                    //download_link += "\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" + jsondata.objectid;
                                    try{
                                        let download_link = unsafeWindow.decdata[jsondata.objectid].replace("http://","https://")
                                        window.location = download_link
                                    }
                                    catch{
                                        alert("资源解析失败")
                                    }
                                }
                                eval("\x66\x64\x69\x76\x2e\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64\x28\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x54\x61\x67\x29");
                            }
                            continue;
                        }
                    }
                    if (frame.getAttribute("name") == null) continue;
                    if (frame.getAttribute("name").substr(frame.getAttribute("name").length - 4, 4) == ".mp3") {
                        if (!haveResource) {
                            haveResource = true;
                            downloadLinks = new Array();
                        }
                        downloadLinks.push("\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x73\x2d\x61\x6e\x73\x2e\x63\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" + frame.getAttribute("objectid"))
                        let objectId = frame.getAttribute("objectid");
                        var adownloadTag = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74\x28\x22\x64\x69\x76\x22\x29");
                        adownloadTag.setAttribute("href", "javascript:void(0)");
                        adownloadTag.setAttribute("class", "ct11_dl");
                        adownloadTag.setAttribute("style", "font-size: 14px;color: #666666;cursor:pointer;");
                        adownloadTag.innerHTML = "点此下载 " + frame.getAttribute("name");
                        adownloadTag.onclick = function name(params) {
                            let download_link = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x63\x73\x2d\x61\x6e\x73\x2e\x63"
                            download_link += "\x68\x61\x6f\x78\x69\x6e\x67\x2e\x63\x6f\x6d\x2f\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2f" + objectId;
                            window.location = download_link
                        }
                        continue;
                    }
                }
            }
            // if (haveResource) {
            //     if (if2rames[0].parentNode.getElementsByClassName("ct11_dl")[0] != null) if2rames[0].parentNode.getElementsByClassName("ct11_dl")[0].remove()
            //     var allDownloadTag = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74\x28\x22\x64\x69\x76\x22\x29");
            //     allDownloadTag.setAttribute("class", "ct11_dl");
            //     allDownloadTag.setAttribute("style", "font-size: 14px;color: #666666;cursor:pointer;");
            //     allDownloadTag.setAttribute("href", "javascript:void(0)");
            //     allDownloadTag.innerHTML = "点此下载本节内的全部资源";
            //     allDownloadTag.onclick = function name(params) {
            //         for (var i = 0; i < downloadLinks.length; i++) {
            //             const iif2rame = eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x63\x72" + "\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74\x28\x22\x69\x66\x72\x61\x6d\x65\x22\x29");
            //             iif2rame.style.display = "none";
            //             iif2rame.style.height = 0;
            //             iif2rame.src = downloadLinks[i];
            //             eval("\x64\x6f\x63\x75\x6d\x65\x6e\x74\x2e\x62\x6f\x64\x79\x2e\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64\x28\x69\x69\x66\x32\x72\x61\x6d\x65\x29");
            //             setTimeout(() => {
            //                 iif2rame.remove();
            //             }, 10000);
            //         }
            //     }
            //     if2rames[0].parentNode.insertBefore(allDownloadTag, if2rames[0])
            // }
        }, 3000);
    }
})();

