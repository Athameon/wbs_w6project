import React from 'react';
import Post from './Post';

const News = ({ items }) => {
  console.log(items);
  const posts = items.filter((item) => item.sys.contentType.sys.id === 'post');
  return (
    <>
      {posts.map((item) => (
        <Post key={item.sys.id} {...item} />
      ))}
    </>
  );
};

export default News;
