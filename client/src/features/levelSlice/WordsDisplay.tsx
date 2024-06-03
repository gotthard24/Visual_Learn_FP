import { useEffect, useState } from 'react';
import axios from 'axios';
import { DEPLOY_DOMAIN } from '../../hosts/options';

interface Word {
  id: number;
  word: string;
}

type ImageURLs = string[];

const WordsDisplay = () => {
  const [words, setWords] = useState<Word[]>([]);
  const refreshToken = localStorage.getItem('refToken');
  const [imageURLs, setImageURLs] = useState<ImageURLs>([]);
  const [randomWords, setRandomWords] = useState<string[]>([]);

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      getImages(words);
    }
  }, [words]);

  useEffect(() => {
    if (words.length > 0) {
      generateRandomWords();
    }
  }, [words]);

  const getImages = async (words: Word[]) => {
    const API_KEY = '44201920-d23d7ae2dc8e24522dfb3bd56';

    try {
      const imageURLPromises = words.map(async (item) => {
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(item.word)}`;
        const response = await axios.get(URL);
        return response.data.totalHits > 0 ? response.data.hits[0].webformatURL : null;
      });
      const imageURLs = await Promise.all(imageURLPromises);
      setImageURLs(imageURLs);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  const getWords = async () => {
    try {
      const response = await axios.get<Word[]>(`${DEPLOY_DOMAIN}/users/words`, {
        headers: {
          'x-refresh-token': refreshToken,
        },
      });
      if (response.status === 200) {
        setWords(response.data);
      }
    } catch (error) {
      console.error('Error fetching words', error);
    }
  };

  const generateRandomWords = () => {
    const randomIndices = getRandomIndices(words.length);
    const newRandomWords = randomIndices.map((index) => words[index].word);
    setRandomWords(newRandomWords);
  };

  const getRandomIndices = (max: number) => {
    const indices: number[] = [];
    while (indices.length < 3) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const handleButtonClick = (word: string) => {
    console.log('Button clicked:', word);
  };

  return (
    <>
      <h1>Level 1: Food</h1>
      {words.map((item, index) => (
        <div key={index}>
          {/* {item.word} <br /> */}
          {imageURLs[index] && <img src={imageURLs[index]} alt={item.word} style={{ width: '30vw' }} />} <br />
          <button onClick={() => handleButtonClick(item.word)}>{item.word}</button>
          
          {randomWords.map((word, i) => (
            <button key={i} onClick={() => handleButtonClick(word)}>{word}</button>
          ))} <br />
        </div>
      ))}
    </>
  );
};

export default WordsDisplay;