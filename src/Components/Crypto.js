import React, {useEffect, useState } from 'react';
import CryptoInfo from './CryptoInfo';
import { useParams } from 'react-router-dom';
import marked from 'marked';

import './Crypto.css'

const Crypto = ({currentData}) => {
  const { id } = useParams();
  console.log(id);

  const [content, setContent] = useState(); 

  useEffect(() => {
    // setIsLoading(true);
    // setIsError(false);

    fetch('http://localhost:4000/wiki/'+id)
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
        console.log(jsonData);
        setContent(jsonData);
      })
      .catch((error) => {
        console.error(error);
        // setIsLoading(false);
        // setIsError(true);
      });
  }, [id]);

  const currentCryptoInfo = currentData && currentData.filter(item => item.id.toLowerCase() === id)[0];

  return (
    <div className='cryptoContainer'>
      <div>
        <div className='cryptoInfoContainer'>
          <CryptoInfo cryptoInfos={currentCryptoInfo} />
        </div>
      </div>
      <div className='cryptoDescription'>
        {content ?
          <div>
            <h1>{content.fields.title}</h1>
            <img src={content.fields.image && content.fields.image.fields.file.url} alt='a spicture' />
            <section dangerouslySetInnerHTML={{ __html: marked(content.fields.description)}} />
          </div>
        :
          <div>
            <h2>Sorry, but we don't have data for the selected crypto currency.</h2>
          </div>
      }
      </div>
    </div>
  )
} 

export default Crypto;