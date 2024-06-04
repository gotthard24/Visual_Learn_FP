import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


const Score = (): JSX.Element => {
    const [redirect, setVisible] = useState(false);
    const score = useSelector((state: RootState) => state.levelReducer.score)
    const email = localStorage.getItem("email")
    
    useEffect(() => {  
        console.log(email);
           
        if(email !== null){
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [email]);

    

    return redirect ? <h2>Score: {score}</h2> : <></>;
};

export default Score;
