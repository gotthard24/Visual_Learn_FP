import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getUserScore } from "../levelSlice/levelSlice";


const Score = (): JSX.Element => {
    const [visibility, setVisible] = useState(false);
    const score = useSelector((state: RootState) => state.levelReducer.score)
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {  
        const email = localStorage.getItem("email")
        console.log(email);
           
        if(email !== null){
            setVisible(true)
        } else {
            setVisible(false)
        }
        if(email) dispatch(getUserScore(email))
    }, [score, dispatch]);

    

    return visibility ? <h2>Score: {score}</h2> : <></>;
};

export default Score;
