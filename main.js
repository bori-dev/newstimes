// const API_KEY = `e069d8ca7aec4b55b3b8477a11e2ee2f`
let newsList=[]
const menus = document.querySelectorAll(".button-style button") 
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`)
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

const getNews = async () => {
  try{
    const response = await fetch(url);
    const data = await response.json(); 
    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search")
      }
      newsList = data.articles 
      render();
    }else {
      throw new Error(data.message)
    }
   
  }catch(error){
    console.log(error.message)
    errorRender(error.message)
  }
}

const getLatestNews = async () => {
   // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);

    getNews()
}

const getNewsByCategory = async (event) => {
   const category = event.target.textContent.trim().toLowerCase();
   console.log(category)
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
     url= new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`)

    getNews()
}


const getNewsByKeyword = async() => {
    const keyword = document.getElementById("search-input").value;

    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
      url= new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`)

   getNews()
}

const render = () => {
    const newsHTML = newsList.map(news => ` <div class="row news"> 
            <div class="col-lg-4"> 
                  <img class="news-img-size" src="${news.urlToImage || 
                    'https://wingandaprayer.live/wp-content/uploads/2018/07/no-image-available.jpg'}" onerror="this.onerror=null; this.src='https://wingandaprayer.live/wp-content/uploads/2018/07/no-image-available.jpg';" />

            </div>

            <div class="col-lg-8"> 
              <h3> ${news.title} </h3>
              <p>     ${
                      news.description == null || news.description == ""
                      ? "내용없음"
                      : news.description.length > 200
                      ? news.description.substring(0, 200) + "..."
                      : news.description
                    } </p>
              <div> ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}</div>
            </div>
        </div>`).join('')

    document.getElementById("news-board").innerHTML = newsHTML; 
}

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`

document.getElementById("news-board").innerHTML = errorHTML 
}

const pageNationRender = () => {
  
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === 'none' || inputArea.style.display === '') {
    inputArea.style.display = 'inline'; // 검색창과 버튼을 보이도록 설정
} else {
    inputArea.style.display = 'none'; // 다시 숨기기
}
};



getLatestNews() 

