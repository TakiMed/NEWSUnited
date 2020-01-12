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
                res.articles[i].views=0;}
                return res.articles;})
            .then(function(res){
                                loadAll(res);
                                addArticles(res);
                                showBest(res);});
            }
fetchNews();
let i=0;
var parentNEWS=document.getElementsByClassName("news")[0];
var recent=document.getElementsByClassName("recent")[0];

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

function loadAll(jsonData){
    while(jsonData[i]!= undefined){
        const newsWrapper=document.createElement("div");
        j=i+1;
        className="slider"+String(j);
        newsWrapper.classList.add("slider");
        newsWrapper.classList.add(className);
        if(jsonData[i].author==null){jsonData[i].author="Anonymus";}
        newsWrapper.innerHTML+="<p>Posted by <span class=\"author\"><i>"+jsonData[i].author+"</i></span></p>";
        newsWrapper.innerHTML+="<div class=\"image\">"+
                                    "<h2>"+jsonData[i].title+"</h2></div>";
        newsWrapper.childNodes[1].style.backgroundImage="url("+jsonData[i].urlToImage+")";
        newsWrapper.innerHTML+="<a href=\""+jsonData[i].url+"\"target=\"_blank\">read more</a>"; //klikom otvara modal window
        parentNEWS.appendChild(newsWrapper);
        newsWrapper.style.display = "none";
        i++;
}
allNews=document.getElementsByClassName("slider");
showSlides(0);
}
var num=0;
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
function showSlides(num){
    allNews=document.getElementsByClassName("slider");
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
function addArticles(newsArr){
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
//newsArrSortedByDate=newsArr.sort(function (a, b) {
  //  return new Date(a.publishedAt).getTime()<new Date(b.publishedAt).getTime();
  //});
/*newsArrSortedByRate=newsArr.sort(function(a,b){
    return a.rate>=b.rate;
});*/
//console.log(newsArrSortedByRate);
const featured=document.getElementsByClassName("featured")[0];
function showBest(newsArr){
    for (var i=0;i<3;i++){
        var n=i+1;
        const articleWrapper=document.createElement("article");
        articleWrapper.innerHTML+="<div class=\"image\">"+
        "<div class=\"numbering\">"+String(n)+"</div></div>";
        articleWrapper.childNodes[0].style.backgroundImage="url("+newsArr[i].urlToImage+")";
        articleWrapper.innerHTML+="<a href="+newsArr[i].url+"target=\"_blank\">"+newsArr[i].title+"</a>";
        featured.appendChild(articleWrapper);
    }
}
featured.addEventListener("click",showModalWindow);
function showModalWindow(e){
    current=e.target;
    currentName=e.target.parentNode;
    modalWindowWrapper=document.createElement("div");
    modalWindowWrapper.classList.add("modal");
    modalWindow=document.createElement("div");
    modalWindow.classList.add("modalWindow");
    modalWindowWrapper.style.display="flex";
    //display-none
    modalWindowWrapper.appendChild(modalWindow);
    document.body.appendChild(modalWindowWrapper);
    document.body.style.height="100vh";
    //inherit ili auto
    document.body.style.overflowY="hidden";
    //auto
    document.body.style.position="fixed";
    //static ili relative
    //u klasi . modal podesiti da se .style.top namjesti na trenutni Y point
}
//ExtensionScriptApis.addEventListener("click",removeModalindow);


var loadMoreButton=document.getElementsByClassName("loadMore")[0];
loadMoreButton.addEventListener("click",loadMoreFun);
function loadMoreFun(){
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
}



/*news.addEventListener("click",presentImage);
function presentImage(event) {
    const xButton = document.createElement('button');
    xButton.appendChild(document.createTextNode('X'));
    xButton.classList.add('xButton');
    newsTemp = event.target.parentNode;
    news.style.height = '90vh';
    news.style.width = '90vw';
    newsTemp.appendChild(xButton);
    document.body.style.backgroundColor = 'gray';
    xButton.addEventListener('click', undoPresentImage);
}

function undoPresentImage(event) {
    newsTemp = event.target.parentNode;
    newsTemp.removeChild(event.target);
    news.style.height = '330px';
    news.style.width = '670px';
    document.body.style.backgroundColor = 'white';
}*/