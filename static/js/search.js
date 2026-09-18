const input = document.getElementById("search-input");
const results = document.getElementById("search-results");
const count = document.getElementById("search-count");

let articles = [];

// 検索用JSONを読み込む
fetch("/tginet-intern/index.json")
  .then(response => response.json())
  .then(data => {
    articles = data;
  })
  .catch(error => {
    console.error("検索データの読み込みに失敗しました:", error);
  });

// キーワード入力時に検索
input.addEventListener("input", function () {

  const keyword = input.value.trim().toLowerCase();

  results.innerHTML = "";

  if (keyword === "") {
    count.textContent = "";
    return;
  }

  const matchedArticles = articles.filter(article => {

    const title = article.title.toLowerCase();
    const content = article.content.toLowerCase();

    return (
      title.includes(keyword) ||
      content.includes(keyword)
    );

  });

  count.textContent = matchedArticles.length + "件見つかりました";

  matchedArticles.forEach(article => {

    const div = document.createElement("div");

    div.innerHTML = `
      <h2>
        <a href="${article.url}">
          ${article.title}
        </a>
      </h2>
    `;

    results.appendChild(div);

  });

});