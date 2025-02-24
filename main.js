const API_KEY = `e069d8ca7aec4b55b3b8477a11e2ee2f`
let newsList=[]
const menus = document.querySelectorAll(".button-style button") 
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
   const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );

    const response = await fetch(url);
    const data = await response.json(); 
    newsList = data.articles 
    render();
    console.log("ddd", newsList)
}

const getNewsByCategory = async (event) => {
   const category = event.target.textContent.trim().toLowerCase();
   console.log(category)
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  const url= new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`)

   const response = await fetch(url);
   const data = await response.json();
   console.log("data", data)

   newsList = data.articles; 

   render()  
}


const getNewsByKeyword = async() => {
    const keyword = document.getElementById("search-input").value;

    console.log("키워드", keyword);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    newsList = data.articles;

    render();
}

const render = () => {
    const newsHTML = newsList.map(news => ` <div class="row news"> 
            <div class="col-lg-4"> 
             <img class="news-img-size" src=${news.urlToImage}> 
            </div>
            <div class="col-lg-8"> 
              <h3> ${news.title} </h3>
              <p> ${news.description} </p>
              <div> ${news.source.name} * ${news.publishedAt}</div>
            </div>
        </div>`).join('')

    document.getElementById("news-board").innerHTML = newsHTML; 
}

getLatestNews() 

