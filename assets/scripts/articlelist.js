const ArticleListURL = 'https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json';
let currentData = null;

document.addEventListener('DOMContentLoaded', function(){
    initArticleList();
});

function initFilters(){
    const filterButtons = document.querySelectorAll('[data-js-category="keywords"] [data-js-filter]');

    filterButtons.forEach(function(button){
        button.addEventListener('click', function(event){
            console.log('click');
            const filter = event.currentTarget.getAttribute('data-js-filter');
            const filteredArticles = filterArticles(filter);
            renderArticleList(filteredArticles);
        });
    });
}


function initArticleList(){
const responsePromise = fetch(ArticleListURL)
//Response ist der Varieblennamen den man für die response setzt, man kann das auch anders nennen
responsePromise.then(function(response){
    console.log(response);

    const dataPromise = response.json();
    dataPromise.then(function(data){
    
        currentData = data;
        console.log(data);
        renderArticleList(data.articles);
        initFilters();

    })
});
}

function filterArticles(filterValue){
    const filteredArticles = currentData.articles.filter(function(article){
        return article.tags.keywords.includes(filterValue);
    });
    return filteredArticles;
}

function renderArticleList(articles){
    const articleListElement = document.querySelector('[data-js-generate-articlelist]');
    console.log(articleListElement);
    console.log(articles);


    const cards = articles.map(function(article){
        return `
        <li>
        <figure>
          <img src="./images/${article.teaserImg}" alt="${article.title}">
          <figcaption>
            <h3>${article.title}</h3>
            <address>${article.author}</address>
            <ul class="tag-list">
              ${article.tags.fileFormat.map((tag) => `<li>${tag}</li>`).join('')}
              ${article.tags.keywords.map((tag) => `<li>${tag}</li>`).join('')}
              ${article.tags.modules.map((tag) => `<li>${tag}</li>`).join('')}
              ${article.tags.projectphase.map((tag) => `<li>${tag}</li>`).join('')}
            </ul>
          </figcaption>
        </figure>
      </li>`;
    }).join('');

    articleListElement.innerHTML = cards;

}