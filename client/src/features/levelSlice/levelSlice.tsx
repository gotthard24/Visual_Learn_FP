import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DEPLOY_DOMAIN } from "../../hosts/options";
import axios from "axios";

export interface Word {
    id: number;
    word: string;
    word_in_russian: string;
    word_in_hebrew: string;
}

export interface Score{
    email: string,
    score: number
}

export type ImageURLs = string[];

interface LevelState {
    words: Word[];
    imageURLs: ImageURLs;
    progress: number;
    score: number;
    language: 'english' | 'russian' | 'hebrew'
    leaderboard: Score[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

const initialState: LevelState = {
    words: [],
    imageURLs: [],
    progress: 1,
    score: 0,
    language: 'english',
    leaderboard:[],
    status: 'idle',
    error: null,
};

export const getWords = createAsyncThunk('levels/getWords', async () => {
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.get(`${DEPLOY_DOMAIN}/users/words`, {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
});

export const getImageURLs = createAsyncThunk('levels/getImageURLs', async (words: Word[]) => {
    const API_KEY = '44201920-d23d7ae2dc8e24522dfb3bd56';
    const imageURLPromises = words.map(async (item) => {
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(item.word)}`;
        const response = await axios.get(URL);
        return response.data.totalHits > 0 ? response.data.hits[0].webformatURL : null;
    });
    const imageURLs = await Promise.all(imageURLPromises);
    return imageURLs;
});

export const getPlayerScores = createAsyncThunk('levels/getScores', async () => {
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.get(`${DEPLOY_DOMAIN}/users/leaderboard`, {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
});

export const setLanguage = createAsyncThunk('levels/setlang', async ({email, language}: {email:string, language: 'english' | 'russian' | 'hebrew'}) => {
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.put(`${DEPLOY_DOMAIN}/users/changeln`, 
    { email,language},
    {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
});

export const getLng = createAsyncThunk('levels/getLng', async (email: string) => {
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.post(`${DEPLOY_DOMAIN}/users/userlng`, 
    {email},
    {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
});

export const levelSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWords.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWords.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.words = action.payload;
            })
            .addCase(getWords.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getImageURLs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getImageURLs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.imageURLs = action.payload;
            })
            .addCase(getImageURLs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getPlayerScores.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPlayerScores.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.leaderboard = action.payload;
            })
            .addCase(getPlayerScores.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(setLanguage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setLanguage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.language = action.payload.language;
            })
            .addCase(setLanguage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getLng.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLng.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.language = action.payload.language.language;
            })
            .addCase(getLng.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default levelSlice.reducer;