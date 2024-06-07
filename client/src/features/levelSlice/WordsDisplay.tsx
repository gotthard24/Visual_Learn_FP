import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getWords, getLng, addScore, addProgress} from './levelSlice';
import { getUrlsPexels } from './levelSlice'
// import { getImageURLs } from './levelSlice';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WordsDisplayProps {
  level: number;
  name: string
}

const WordsDisplay = ({level, name} : WordsDisplayProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [count, setCount] = useState<number>(0)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const email = localStorage.getItem('email')
  const language = useSelector((state: RootState) => state.levelReducer.language);
  const difficulty = useSelector((state: RootState) => state.levelReducer.difficulty);
  const status = useSelector((state: RootState) => state.levelReducer.status);
  const words = useSelector((state: RootState) => state.levelReducer.words);
  const imageURLs = useSelector((state: RootState) => state.levelReducer.imageURLs);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const hardinputRef = useRef<HTMLInputElement>(null);

  interface Card {
    word: string;
    word_heb: string;
    word_rus: string;
    image: string | undefined;
    buttons: (number | null)[];
  }

  useEffect(() => {
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
      const result = await dispatch(getWords(level));
      if (getWords.fulfilled.match(result)) {
        await dispatch(getUrlsPexels(result.payload))
        // await dispatch(getImageURLs(result.payload));
      }
  };

  const handleButtonClick = (word: string) => {
    console.log('Button clicked:', word);
    let example = language === 'english' ? cards[count].word : language === 'hebrew' ? cards[count].word_heb : cards[count].word_rus
    if(word === example){
      console.log('WP');
      console.log(count, cards.length);    
      nextQuestCheck()    
    } else {
      console.log('Wrong');
      setMessage("Wrong")
    }
  };

  const nextQuestCheck = () => {
    if((count + 1) < cards.length){
      setCount(count + 1)
      if (email) dispatch(addScore({email, score: 1}))
      setMessage('')
    } else {
        endLevelCheck()
    }
  }

  const endLevelCheck = () => {
    if ((count + 1) === cards.length){
      setIsFinished(true)
      console.log('WIN');
      setCount(count + 1)
      setMessage('Good Job!')
      if(email)dispatch(addProgress(email))
    } 
  }

  const nextLevelHandler = () => {
    navigate(`/level${level + 1}`)
    window.location.reload()
  }

  const generateCards = () => { 
    return words.map((item, i) => {
      let randomIndex1, randomIndex2, randomIndex3;
      do {
        randomIndex1 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
        randomIndex2 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
        randomIndex3 = words.length > 0 ? Math.floor(Math.random() * words.length) : null;
      } while (
          (randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3) || 
          (randomIndex1 === i || randomIndex2 === i || randomIndex3 === i)
      );
      
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

  const handleCheckHard = () => {
    const answer = language === 'russian' ? cards[count].word_rus : language === 'english' ? cards[count].word : cards[count].word_heb
    if(hardinputRef.current) {
      if( answer.toLowerCase() === hardinputRef.current.value.toLowerCase()){
        nextQuestCheck()     
      }else {
        console.log('Sad');
        setMessage("Wrong")
      }}
  }

  return (
    <>
      <h1>{`Level ${level}: ${name}`}</h1>
      <h2>{`Right answers: ${count}/${cards.length}`}</h2>
      {/* {console.log('cards', cards)} */}
      {/* {console.log('words', words)} */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading data.</p>}
      {status === 'succeeded' && (
        <>
          {!isStarted ?
            <button onClick={() => render()}>Start</button>
            : null
          }
          {isStarted && isFinished ? <><h2>Good Job!</h2> <button onClick={()=>nextLevelHandler()}>Next Level</button></> : null}
          {isStarted && !isFinished? 
            <>
              {difficulty === 'easy' ? 
                <>
                  <div key={count}>
                    {language === 'english' ? cards[count].word_heb : language === 'hebrew' ? cards[count].word : cards[count].word}<br />
                    {cards[count].image && <img src={cards[count].image} alt={cards[count].word} style={{ width: '20vw' }} />} <br />
                    {shuffledButtons(count)}
                  </div>
                  <h1>{message}</h1>
                </> : difficulty === 'normal' ? 
                  <>
                  <div key={count}>
                    {language === 'english' ? <h2>{cards[count].word_heb}</h2> : language === 'hebrew' ? <h2>{cards[count].word}</h2> : <h2>{cards[count].word}</h2>}<br />
                    {shuffledButtons(count)}
                  </div>
                  <h1>{message}</h1>
                </>
                : 
                <>
                  <div key={count}>
                    {language === 'english' ? <h2>{cards[count].word_heb}</h2> : language === 'hebrew' ? <h2>{cards[count].word}</h2> : <h2>{cards[count].word}</h2>}<br />
                    <input type="text" placeholder='Guess the word' ref={hardinputRef}/>
                    <button onClick={() => handleCheckHard()}>check</button>
                  </div>
                  <h1>{message}</h1>
                </>
                }
            </>
          : null}
          <br /> <br />
          <button onClick={() => navigate('/')}>Back</button>
        </>
      )}
    </>
  );
};

export default WordsDisplay;