var num=0;
function getJSON(response) {
    return response.json();
}
function checkStatus(response) {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
function fetchNews(){
    url="https://newsapi.org/v2/everything?domains=wsj.com&apiKey=84a96d2e549b42b88262cc529453ac69";
    fetch(url).then(checkStatus)
        .then(getJSON)
        .then(function (res){
            for (i=0;i<res.articles.length;i++){
                res.articles[i].rate=Math.floor(Math.random() * 10 + 1);
                res.articles[i].views=Math.floor(Math.random() * 10 + 1)*10;}
                return res.articles;})
            .then(function(res){
                        loadAll(res);
            }).then(sliderFun).then(addArticles).then(showBest);
        }
fetchNews();
newsArr=[];
function loadAll(data){
    for (el of data){
        newsArr.push(el);
    }
}

function w(){
    if (window.innerWidth<550){
    return 1;
}
else if(window.innerWidth>550 && window.innerWidth<960){
    return 2;
}
else if(window.innerWidth>960){
    return 3;
}}
var windowVariable=w();
window.onresize=function(){windowVariable=w();}
var parentNEWS=document.getElementsByClassName("news")[0];
var recent=document.getElementsByClassName("recent")[0];
function sliderFun(){
    for (el of newsArr){
        if (newsArr.indexOf(el)=== 10){break;}
        const newsWrapper=document.createElement("div");
        newsWrapper.classList.add("slider");
        if(el.author==null){el.author="Anonymus";}
        newsWrapper.innerHTML+="<p>Posted by <span class=\"author\"><i>"+el.author+"</i></span></p>";
        newsWrapper.innerHTML+="<div class=\"image\">"+
                                    "<h2>"+el.title+"</h2></div>";
        newsWrapper.childNodes[1].style.backgroundImage="url("+el.urlToImage+")";
        newsWrapper.innerHTML+="<a class=\"readMore\" href=\"#\">read more</a>"; //klikom otvara modal window
        parentNEWS.appendChild(newsWrapper);
        newsWrapper.style.display = "none";
}
var readMore = document.getElementsByClassName("readMore");
    for (var z = 0; z < readMore.length;z++){
        readMore[z].addEventListener("click",showModalWindow);
        }
showSlides(0);
}

document.addEventListener("load",sliderFun);
allNews=document.getElementsByClassName("slider");

function showSlides(num){
    
    for (k=0;k<allNews.length;k++){
        allNews[k].style.display="none";
    }
    for(i=0;i<windowVariable;i++){
        allNews[i+num].style.display="grid";
        if ((i+num)==allNews.length-1) {
            for (var l=0;l<((allNews.length-1)%windowVariable);l++){
                allNews[l].style.display="grid";
            }
        }
    }
}

allNews=document.getElementsByClassName("slider");
const left=document.getElementById("left");
const right=document.getElementById("right");
right.addEventListener("click", slideForward);
function slideForward(){
    num=num+windowVariable;
    if(num>=allNews.length-windowVariable){
        num=0;}
    showSlides(num);
}
left.addEventListener("click", slideBack);
function slideBack(){
    num=num-windowVariable;
    if (num < 0) {num = allNews.length - windowVariable-1;}
    showSlides(num);
}

var a=true;
setInterval(function(){if(a){slideForward()}}, 3000);
recent.addEventListener("mouseover", arrowKey);
recent.addEventListener("mouseout", turnOffArrow);
function turnOffArrow() {
    document.removeEventListener("keydown", keySlider);
    a=true;
}
function arrowKey () {
    document.addEventListener("keydown", keySlider);
    a=false;
}
function keySlider(e){
    if (e.keyCode == 37) {slideBack()}
    else if (e.keyCode == 39) {slideForward()}
}
var j;
var row=document.getElementsByClassName("row")[0];
function addArticles(){
    for (j=0;j<6;j++){
        const articleWrapper=document.createElement("article");
        articleWrapper.innerHTML+="<div class=\"img\">"+
        "<span>"+newsArr[j].publishedAt.slice(0,10)+"</span><h3>"+newsArr[j].title+"</h3></div>";
        articleWrapper.childNodes[0].style.backgroundImage="url("+newsArr[j].urlToImage+")";
        articleWrapper.innerHTML+="<div class=\"lower\">"+
        "<a href="+newsArr[j].url+"target=\"_blank\">visit source post</a>"+
        "<span class=\"description\">"+newsArr[j].description.slice(0,150)+"</span>"+
        "</div>";
        row.appendChild(articleWrapper);
    }
}
const featured=document.getElementsByClassName("featured")[0];
function showBest(){
    newsArrSortedByViews=newsArr.sort(function(a,b){
    return a.views<b.views;
    });
    for (var i=0;i<3;i++){
        var n=i+1;
        const articleWrapper=document.createElement("article");
        articleWrapper.innerHTML+="<div class=\"image\">"+
        "<div class=\"numbering\">"+String(n)+"</div></div>";
        articleWrapper.childNodes[0].style.backgroundImage="url("+newsArrSortedByViews[i].urlToImage+")";
        articleWrapper.innerHTML+="<a href=\"#\">"+newsArrSortedByViews[i].title+"</a>";
        featured.appendChild(articleWrapper);
    }
}

var loadMoreButton=document.getElementsByClassName("loadMore")[0];
loadMoreButton.addEventListener("click",loadMoreFun);
function loadMoreFun(e){
    for (k=j;k<j+3;k++){
        const articleWrapper=document.createElement("article");
        articleWrapper.innerHTML+="<div class=\"img\">"+
        "<span>"+newsArr[k].publishedAt.slice(0,10)+"</span><h3>"+newsArr[k].title+"</h3></div>";
        articleWrapper.childNodes[0].style.backgroundImage="url("+newsArr[k].urlToImage+")";
        articleWrapper.innerHTML+="<div class=\"lower\">"+
        "<a href="+newsArr[k].url+"target=\"_blank\">visit source post</a>"+
        "<span class=\"description\">"+newsArr[k].description.slice(0,150)+"</span>"+
        "</div>";
        row.appendChild(articleWrapper);
        if (k==newsArr.length-1){
            j=0;
            loadMoreButton.removeEventListener("click",loadMoreFun);
            loadMoreButton.style.display="none";
            break;
        }
    }
    j=j+3;
    var loadPosition=e.pageY
    window.scrollTo({
        top: loadPosition-120,
        behavoir:"smooth"
    });
}

featured.addEventListener("click",showModalWindow);
imgDiv=document.getElementsByClassName("img");
for (var z = 0; z < imgDiv.length;z++){
    imgDiv[z].addEventListener("click",showModalWindow);
    }

row.addEventListener("click",showModalWindow);
function showModalWindow(e){
    bestNewsDiv=document.getElementsByClassName("bestNews")[0];
    if (event.target.parentNode.tagName=="ARTICLE" && event.target.classList.contains("image")){
        current=e.target;
        currentName=e.target.parentNode.children[1].innerText;
        bestNum=current.parentNode.children[0].children[0].innerText;
        bestNewsDiv.children[1].innerHTML=bestNum;
        bestNewsDiv.style.display="grid";
        }
    else if (event.target.classList.contains("readMore")){
        currentName=e.target.parentNode.children[1].childNodes[0].innerText;
        bestNewsDiv.style.display="none";
    }
    else if (event.target.parentNode.tagName=="ARTICLE" && event.target.classList.contains("img")){
        currentName=e.target.children[1].innerText;
        bestNewsDiv.style.display="none";
    }
    for (el of newsArr){
        if (el.title === currentName) {
            el.views++;
            var myel=el;
        }
    }  
    modalWindowWrapper=document.getElementsByClassName("modal")[0];
    modalWindow=document.getElementsByClassName("modalWindow")[0];
    modalWindow.children[1].style.backgroundImage="url("+myel.urlToImage+")";
    viewsDiv=document.getElementsByClassName("views")[0];
    viewsDiv.children[1].innerText=myel.views;
    holderDiv=document.getElementsByClassName("holder")[0];
    holderDiv.children[0].innerText=myel.publishedAt.slice(0,10);
    holderDiv.children[1].innerText=myel.title;
    holderDiv.children[2].children[0].innerText=myel.author;
    holderDiv.children[3].innerText=myel.description;
    holderDiv.children[4].innerText=myel.content;
    holderDiv.children[5].children[0].setAttribute("href",myel.url);
    var start = myel.url.indexOf("/")+2;
    var end = myel.url.lastIndexOf(".")+4;
    var webSiteUrl = myel.url.slice(start,end);
    holderDiv.children[5].children[1].setAttribute("href",myel.url);
    holderDiv.children[5].children[1].innerHTML=webSiteUrl;
    currentposition=event.pageY;
    modalWindowWrapper.style.display="flex";
    document.body.style.height="100vh";
    document.body.style.overflowY="hidden";
    document.body.style.position="fixed";
    
    var exit = document.getElementsByClassName("exit")[0];
    exit.addEventListener("click",hideModalWindow);
    //static ili relative
    //u klasi . modal podesiti da se .style.top namjesti na trenutni Y point
    }


function hideModalWindow (e){
    modalWindowWrapper=e.target.parentNode.parentNode;
    modalWindowWrapper.style.display="none";
    document.body.style.height="auto";
    document.body.style.overflowY="auto";
    document.body.style.position="relative";
    window.scrollTo({
        top:currentposition-300,
        behavoir:"smooth"
    });
}


//ExtensionScriptApis.addEventListener("click",removeModalindow);

