const API_KEY = `e069d8ca7aec4b55b3b8477a11e2ee2f`
let newsList=[]
const menus = document.querySelectorAll("#menu-list button") 
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));


let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`)
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

let totalResults = 0; 
let page = 1;
const pageSize = 10;
const groupSize = 5; 


const getNews = async () => {
  try{
    url.searchParams.set("page", page)  // &page = page 
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json(); 
    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search")
      }
      newsList = data.articles 
      totalResults = data.totalResults
      render();
      pagiNationRender();
    }else {
      throw new Error(data.message)
    }
   
  }catch(error){
    console.log(error.message)
    errorRender(error.message)
  }
}

const getLatestNews = async () => {
   //url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);

    getNews()
}

const getNewsByCategory = async (event) => {
   const category = event.target.textContent.trim().toLowerCase();
   console.log(category)

   page = 1; 
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

const pagiNationRender = () => {
 const pageGroup = Math.ceil(page/groupSize);
 let lastPage = pageGroup * groupSize; 
 const totalPages = Math.ceil(totalResults/pageSize);
 //마지막 페이지 그룹이 그룹사이즈보다 작다?? lastPage = totalpage
 if(lastPage > totalPages){
  lastPage = totalPages
 }

 
 const firstPage = lastPage - (groupSize - 1) <=0? 1 : lastPage - (groupSize - 1);

 let paginationHTML = 
 `<li class="page-item ${page === 1 ? 'disabled' : ''}" onclick="${page === 1 ? '' : 'moveToPage(1)'}">
 <a class="page-link"> << </a>
</li>
<li class="page-item ${page === 1 ? 'disabled' : ''}" onclick="${page === 1 ? '' : `moveToPage(${page - 1})`}">
 <a class="page-link"><</a>
</li>`;

   
 for(let i = firstPage; i<=lastPage; i++){
  paginationHTML+= ` <li class="page-item ${i===page? "active" : " "}" onclick = "moveToPage(${i})"><a class="page-link">${i}</a></li>`
 }

 paginationHTML +=
 `<li class="page-item ${page === lastPage ? 'disabled' : ''}" onclick="${page === lastPage ? '' : `moveToPage(${page + 1})`}">
    <a class="page-link">></a>
  </li>
  <li class="page-item ${page === totalPages ? 'disabled' : ''}" onclick="${page === totalPages ? '' : `moveToPage(${totalPages})`}">
    <a class="page-link"> >> </a>
  </li>`;

 document.querySelector(".pagination").innerHTML=paginationHTML;
}



const moveToPage = (pageNum) => {
  page = pageNum;
  getNews()
}
getLatestNews() 
