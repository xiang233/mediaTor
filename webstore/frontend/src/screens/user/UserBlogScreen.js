import React from "react";

import { Link } from "react-router-dom";
import ArticleTags from "../../components/general/ArticleTags";
function UserBlogScreen() {
  const articles = [
    {
      author: "author",
      slug: "slug",
      createdAt: "createdAt",
      favorited: false,
      favoritesCount: 0,
      title: "title",
      description: "descriptions",
      tagList: ["a", "b", "c"],
    },
  ];
  const loading=true;

  return articles?.length > 0 ? (
    articles.map((article) => {
      return (
        <div className="article-preview" key={article.slug}>
          {/* <ArticleMeta author={article.author} createdAt={article.createdAt}> */}
          {/* <FavButton
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
            //   handler={handleFav}
              right
              slug={article.slug}
            /> */}
          {/* </ArticleMeta> */}
          <Link
            to={`/article/${article.slug}`}
            state={article}
            className="preview-link"
          >
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ArticleTags tagList={article.tagList} />
          </Link>
        </div>
      );
    })
  ) : loading ? (
    <div className="article-preview">Loading article...</div>
  ) : (
    <div className="article-preview">No articles available.</div>
  );
}

export default UserBlogScreen;
