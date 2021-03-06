import React from 'react';
import { useParams } from 'react-router-dom';
import marked from 'marked'
import './Author.css'
import News from './News';

const Author = ({items}) => {
  const { name } = useParams();
  const author = items.filter(item => item.sys.contentType.sys.id === 'author')
    .filter(item => item.fields.name === name)[0];
  
  const picture = author.fields.profilePicture.fields.file.url;
  const itemsByAuthor = items.filter(item => item.fields.author && item.fields.author.fields.name === name);

  return( 
    <>
      <h1>{author.fields.name}</h1>
      <img className='profilePicture' src={picture && picture} alt={author && author.name} />
      <section className='aboutText' dangerouslySetInnerHTML={{ __html: marked(author.fields.about)}} />
      <hr className='articleSeparator' />
      <h2>Articles composed by {name}:</h2>

      <News items={itemsByAuthor} />
    </>
  )
}

export default Author;