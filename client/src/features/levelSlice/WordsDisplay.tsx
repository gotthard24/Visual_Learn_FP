import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getImageURLs, getWords } from './levelSlice';
import { useEffect, useState } from 'react';

const WordsDisplay = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [count, setCount] = useState<number>(0)
  const [isStarted, setIsStarrted] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const status = useSelector((state: RootState) => state.levelReducer.status);
  const words = useSelector((state: RootState) => state.levelReducer.words);
  const imageURLs = useSelector((state: RootState) => state.levelReducer.imageURLs);
  const dispatch = useDispatch<AppDispatch>();

  interface Card {
    word: string;
    image: string | undefined;
    buttons: (number | null)[];
  }

  useEffect(() => {
    if(words.length === 0)
    fetchWordsAndImages();
  }, []);

  useEffect(() => {
    if (words.length > 0 && imageURLs.length > 0) {
      setCards(generateCards());
    }
  }, [words, imageURLs]);

  const fetchWordsAndImages = async () => {
    if (status === 'idle') {
      const result = await dispatch(getWords());
      if (getWords.fulfilled.match(result)) {
        await dispatch(getImageURLs(result.payload));
      }
    }
  };

  const handleButtonClick = (word: string) => {
    console.log('Button clicked:', word);
    if(word === cards[count].word){
      console.log('WP');
      setCount(count + 1)
      setMessage('')
    } else {
      console.log('Dolboeb');
      setMessage("Dolboeb")
    }
  };

  const generateCards = () => {
    return words.map((item, i) => {
      const randomIndex1 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      const randomIndex2 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      const randomIndex3 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      return { word: item.word, image: imageURLs[i], buttons: [i, randomIndex1, randomIndex2, randomIndex3] };
    });
  };

  const render = async() => {
    setIsStarrted(true)
  }

  const shuffledButtons = (i: number) => {
    if (!cards[i]) return null;
    const shuffled = [...cards[i].buttons].sort(() => Math.random() - 0.5);
    return (
      <div>
        {shuffled.map((number, buttonIndex) => (
          number !== null && number < cards.length ? (
            <button key={buttonIndex} onClick={() => handleButtonClick(cards[number].word)}>
              {cards[number].word}
            </button>
          ) : null
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Level 1: Food</h1>
      {console.log('cards', cards)}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading data.</p>}
      {status === 'succeeded' && (
        <>
          <button onClick={() => render()}>Start</button>
          {isStarted ? 
            <>
              <div key={count}>
                {cards[count].image && <img src={cards[count].image} alt={cards[count].word} style={{ width: '30vw' }} />} <br />
                {shuffledButtons(count)}
              </div>
              <h1>{message}</h1>
            </>
          : null}
          {/* {cards.map((card, index) => (
            <div key={index}>
              {card.image && <img src={card.image} alt={card.word} style={{ width: '30vw' }} />} <br />
              {shuffledButtons(index)}
            </div>
          ))} */}
        </>
      )}
    </>
  );
};

export default WordsDisplay;