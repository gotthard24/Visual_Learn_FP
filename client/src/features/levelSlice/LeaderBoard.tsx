import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store";
import { getPlayerScores } from "./levelSlice";

const LeaderBoard = () => {
    const leaderBoardData = useSelector((state: RootState) => state.levelReducer.leaderboard)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        await dispatch(getPlayerScores());
    };

    return(
        <>
        <h1>LeaderBoard</h1>
        <ol>
            {leaderBoardData.map((player, index) => (
                <li key={index}>
                    {player.email}: {player.score}
                </li>
            ))}
        </ol>
        </>   
    )
}

export default LeaderBoard