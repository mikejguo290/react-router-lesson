import React from "react";
import { useSelector } from "react-redux";
import { selectArticles, filterArticles } from "../features/articles/articlesSlice";
import Search from "./Search";

// Import Link from React Router
import { Link, useLocation } from 'react-router-dom';

export default function Articles () {
  const articles = useSelector(selectArticles)
  
  // grab the search value from useLocation()
  const { search } = useLocation(); // returns search string
  
  // get the queryParams from new URLSearchParams() 
  const queryParams = new URLSearchParams(search) // pass search string to object constructor to receive dictionary of param:param value.
  
  const title = queryParams.get('title'); // <-- fix me!

  // for reference const filterArticles = (query, articles) => Object.values(articles).filter(article => article.title.toLowerCase().includes(query.toLowerCase()))
  // allArticles.filter(a => a.title.toLowerCase().includes(query.toLowerCase));
  // Object.values(obj) returns an array of object's ennumerable property values. Articles used to create articlesSlice's initial value is an Object.
  // so selectArticles returns an object as well. 
  const filteredArticles = title ? filterArticles(title, articles) : Object.values(articles)

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        { 
          filteredArticles.map(article => {
            return (
              <li key={article.slug}>
                {/* Replace these a tags! */}
                <Link to={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </li>
            )
          })
        }
      </ul>
      <Search />
    </main>
  )
}
