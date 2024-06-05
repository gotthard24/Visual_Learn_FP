import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getUserScore } from "../levelSlice/levelSlice";


const Score = (): JSX.Element => {
    const [redirect, setVisible] = useState(false);
    const score = useSelector((state: RootState) => state.levelReducer.score)
    const dispatch = useDispatch<AppDispatch>()
    const email = localStorage.getItem("email")
    
    useEffect(() => {  
        console.log(email);
           
        if(email !== null){
            setVisible(true)
        } else {
            setVisible(false)
        }
        if(email) dispatch(getUserScore(email))
    }, [email, dispatch]);

    

    return redirect ? <h2>Score: {score}</h2> : <></>;
};

export default Score;
