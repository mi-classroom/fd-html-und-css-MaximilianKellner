const ArticleListURL = 'https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/49ddd7c2636fb722912d91107aff55c79ddf05a8/articles.json';

document.addEventListener('DOMContentLoaded', function(){
    initArticleList();
});



function initArticleList(){
const responsePromise = fetch(ArticleListURL)
//Response ist der Varieblennamen den man für die response setzt, man kann das auch anders nennen
responsePromise.then(function(response){
    console.log(response);

    const DataPromise = response.json();
    DataPromise.then(function(data){
    
        console.log(data);
        renderArticleList(data.articles);

    })
});
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
              <li>Präsentation</li>
              <li>PPT</li>
              <li>Vortrag</li>
            </ul>
          </figcaption>
        </figure>
      </li>`;
    }).join('');

    articleListElement.innerHTML = cards;

}