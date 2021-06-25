import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marked from 'marked';
import './Author.css';
import News from './News';

const Author = () => {
  const [authorWithArticles, setAuthorWithArticles] = useState();
  const { name } = useParams();

  useEffect(() => {
    // setIsLoading(true);
    // setIsError(false);

    fetch('http://localhost:4000/authorWithArticles/' + name)
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error('Error');
        },
        (error) => {
          throw Error('Network Error');
        }
      )
      .then((jsonData) => {
        // setIsLoading(false);
        // setContent(jsonData);
        setAuthorWithArticles(jsonData);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
        // setIsError(true);
      });
  }, [name]);

  if (authorWithArticles) {
    return (
      <>
        <h1>{authorWithArticles.author.fields.name}</h1>
        <img
          className="profilePicture"
          src={
            authorWithArticles.author.fields.profilePicture &&
            authorWithArticles.author.fields.profilePicture.fields.file.url
          }
          alt={authorWithArticles.author.fields.name}
        />
        <section
          className="aboutText"
          dangerouslySetInnerHTML={{
            __html: marked(authorWithArticles.author.fields.about),
          }}
        />
        <hr className="articleSeparator" />
        <h2>Articles composed by {name}:</h2>

        <News items={authorWithArticles.articles} />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default Author;
