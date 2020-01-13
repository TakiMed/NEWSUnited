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
function fetchNews() {
    url = "https://newsapi.org/v2/everything?q=apple&from=2020-01-11&to=2020-01-11&sortBy=popularity&apiKey=c61e604e0773445a9e1de5d6e5109315";
    fetch(url).then(checkStatus)
        .then(getJSON)
        .then(function(res) {
            for (i = 0; i < res.articles.length; i++) {
                res.articles[i].rate = Math.floor(Math.random() * 10 + 1);
                res.articles[i].views = Math.floor(Math.random() * 10 + 1) * 10;
            }
            return res.articles;
        })
        .then(function(res) {
            loadAll(res);
        });
}
fetchNews();
newsArr = [];
function loadAll(data) {
    for (el of data) {
        newsArr.push(el);
    }
}
console.log(newsArr);
blockDiv=document.getElementsByClassName("block");
console.log(blockDiv);
for (b of blockDiv){
    b.style.display="none";
}

var buttonFind = document.getElementsByClassName("findNew")[0];
buttonFind.addEventListener("click", search);
function search() {
    var blockArr=[];
    var searchTerm = document.getElementById("searchTerm");
    var title = document.getElementById("titleNews");
    var author = document.getElementById("author");
    var rangeValue = document.getElementById("range").value;
    var inputValue = searchTerm.value;
    if (title.checked) {
        for (el of newsArr) {
            if (el.title.toLowerCase().startsWith(inputValue) && el.rate >= Number(rangeValue)) {
                blockArr.push(el);
            }
        }
    } else if (author.checked) {
        for (el of newsArr) {
            if (el.author === null) { continue; }
            if (el.author.toLowerCase().startsWith(inputValue) && el.rate >= Number(rangeValue)) {
                blockArr.push(el);
            }
        }
    }
    console.log(blockArr);
    showBlocks();
}
var range = document.getElementById("range");
range.addEventListener("mouseup", search);

function showBlocks(arr){
    for (el of blockArr){
        console.log("here");
        currentBlock=blockDiv[blockArr.indexOf(el)];
        infoBlock=document.getElementsByClassName("information")[blockArr.indexOf(el)];
        infoBlock.children[0].children[0].innerText=el.title;
        infoBlock.children[0].children[1].innerText=el.description;
        seeBlock=document.getElementsByClassName("see")[blockArr.indexOf(el)];
        seeBlock.children[0].innerText=el.publishedAt.slice(0,10);
        console.log(currentBlock);
        currentBlock.style.display="grid";
    }
}