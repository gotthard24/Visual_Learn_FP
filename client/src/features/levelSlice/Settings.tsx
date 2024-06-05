import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { getLng, resetScore, setLanguage } from "./levelSlice"
import { useEffect } from "react"

const Settings = () => {
    const email = localStorage.getItem('email')
    const language = useSelector((state: RootState) => state.levelReducer.language)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        initLanguage()
        console.log(language);
    },[language])

    const changeLanguage = async(language: 'english' | 'russian' | 'hebrew') => {
        if(email) await dispatch(setLanguage({email, language}))
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
            <button onClick={() => changeLanguage('english')}>English</button> <br /> <br />
            <button onClick={() => changeLanguage('russian')}>Russian</button> <br /> <br />
            <button onClick={() => changeLanguage('hebrew')}>Hebrew</button> <br /> <br />
            <hr />
            <button onClick={() => reset()}>Reset Progress</button>
            {/* https://api.pexels.com/v1/search */}
        </>
    )
}

export default Settings