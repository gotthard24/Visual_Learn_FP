import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { getLng, resetScore, setDifficulty, setLanguage } from "./levelSlice"
import { useEffect } from "react"

const Settings = () => {
    const email = localStorage.getItem('email')
    const language = useSelector((state: RootState) => state.levelReducer.language)
    const difficulty = useSelector((state: RootState) => state.levelReducer.difficulty)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        initLanguage()
        console.log(language);
        console.log(difficulty);
    },[language, difficulty])

    const changeLanguage = async(language: 'english' | 'russian' | 'hebrew') => {
        if(email) await dispatch(setLanguage({email, language}))
    }

    const changeDifficulty = async(difficulty: 'easy' | 'normal' | 'hard') => {
        if(email) await dispatch(setDifficulty({email, difficulty}))
    }

    const initLanguage = async() => {
        if(email) await dispatch(getLng(email))
    }

    const reset = async() => {
        if(email) await dispatch(resetScore(email))
    }

    return(
        <>
            <h1>Settings</h1>
            <hr />
            <h3>Change Language on Levels</h3>
            <h4>Current language: {language}</h4>
            <button onClick={() => changeLanguage('english')}>English</button> {' '}
            <button onClick={() => changeLanguage('russian')}>Russian</button> {' '}
            <button onClick={() => changeLanguage('hebrew')}>Hebrew</button> <br /> <br />
            <hr />
            <h3>Change Difficulty on Levels</h3>
            <h4>Current difficulty: {difficulty}</h4>
            <button onClick={() => changeDifficulty('easy')}>Easy</button> {' '}
            <button onClick={() => changeDifficulty('normal')}>Normal</button> {' '}
            <button onClick={() => changeDifficulty('hard')}>Hard</button> <br /> <br />
            <hr />
            <button onClick={() => reset()}>Reset Progress</button>
        </>
    )
}

export default Settings