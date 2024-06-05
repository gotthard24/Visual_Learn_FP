import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getWords, getLng, addScore} from './levelSlice';
import { getUrlsPexels } from './levelSlice'
// import { getImageURLs } from './levelSlice';
import { useEffect, useState } from 'react';

const WordsDisplay = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [count, setCount] = useState<number>(0)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const email = localStorage.getItem('email')
  const language = useSelector((state: RootState) => state.levelReducer.language);
  const status = useSelector((state: RootState) => state.levelReducer.status);
  const words = useSelector((state: RootState) => state.levelReducer.words);
  const imageURLs = useSelector((state: RootState) => state.levelReducer.imageURLs);
  const dispatch = useDispatch<AppDispatch>();

  interface Card {
    word: string;
    word_heb: string;
    word_rus: string;
    image: string | undefined;
    buttons: (number | null)[];
  }

  useEffect(() => {
    if(words.length === 0)
      fetchWordsAndImages();
    initLanguage()
  }, []);

  useEffect(() => {
    if (words.length > 0 && imageURLs.length > 0) {
      setCards(generateCards());
    }
  }, [words, imageURLs]);

  const initLanguage = async() => {
    if(email) await dispatch(getLng(email))
  }

  const fetchWordsAndImages = async () => {
      const result = await dispatch(getWords());
      if (getWords.fulfilled.match(result)) {
        await dispatch(getUrlsPexels(result.payload))
        // await dispatch(getImageURLs(result.payload));
      }
  };

  const handleButtonClick = (word: string) => {
    console.log('Button clicked:', word);
    switch (language) {
      case 'english':
        if(word === cards[count].word){
          console.log('WP');
          setCount(count + 1)
          if (email) dispatch(addScore({email, score: 1}))
          setMessage('')
        } else {
          console.log('Dolboeb');
          setMessage("Wrong")
        }
        break;
      case 'hebrew':
        if(word === cards[count].word_heb){
          console.log('WP');
          setCount(count + 1)
          if (email) dispatch(addScore({email, score: 1}))
          setMessage('')
        } else {
          console.log('Dolboeb');
          setMessage("Wrong")
        }
        break;
      case 'russian':
        if(word === cards[count].word_rus){
          console.log('WP');
          setCount(count + 1)
          if (email) dispatch(addScore({email, score: 1}))
          setMessage('')
        } else {
          console.log('Dolboeb');
          setMessage("Wrong")
        }
        break;
    }
  };

  const generateCards = () => { 
    return words.map((item, i) => {
      const randomIndex1 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      const randomIndex2 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      const randomIndex3 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      return { word: item.word, word_rus: item.word_in_russian, word_heb: item.word_in_hebrew, image: imageURLs[i], buttons: [i, randomIndex1, randomIndex2, randomIndex3] };
    });
  };

  const render = async() => {
    setIsStarted(true)
  }

  const shuffledButtons = (i: number) => {
    if (!cards[i]) return null;
    const shuffled = [...cards[i].buttons].sort(() => Math.random() - 0.5);

    switch (language) {
      case 'english':
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
      case 'hebrew':
      return (
        <div>
          {shuffled.map((number, buttonIndex) => (
            number !== null && number < cards.length ? (
              <button key={buttonIndex} onClick={() => handleButtonClick(cards[number].word_heb)}>
                {cards[number].word_heb}
              </button>
            ) : null
          ))}
        </div>
      );
      case 'russian':
      return (
        <div>
          {shuffled.map((number, buttonIndex) => (
            number !== null && number < cards.length ? (
              <button key={buttonIndex} onClick={() => handleButtonClick(cards[number].word_rus)}>
                {cards[number].word_rus}
              </button>
            ) : null
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <h1>Level 1: Food</h1>
      {console.log('cards', cards)}
      {/* {console.log('words', words)} */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading data.</p>}
      {status === 'succeeded' && (
        <>
          {!isStarted ?
          <button onClick={() => render()}>Start</button>
          : null
          }
          {isStarted ? 
            <>
              <div key={count}>
                {language === 'english' ? cards[count].word_heb : language === 'hebrew' ? cards[count].word : cards[count].word}<br />
                {cards[count].image && <img src={cards[count].image} alt={cards[count].word} style={{ width: '20vw' }} />} <br />
                {shuffledButtons(count)}
              </div>
              <h1>{message}</h1>
            </>
          : null}
        </>
      )}
    </>
  );
};

export default WordsDisplay;