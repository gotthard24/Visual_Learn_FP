import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DEPLOY_DOMAIN } from "../../hosts/options";
import axios from "axios";
import { createClient } from 'pexels';

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

export const getUrlsPexels = createAsyncThunk<string[], Word[]>(
  'levels/urlspexels',
  async (words: Word[]) => {
    const API_KEY = '1nweLSDoYFgCMSTQ8wgQ5sLzd4EMKsuX3PU7Q2L8OBWTfGMUny0hAXDW';
    const client = createClient(API_KEY);

    const imageURLsPromises = words.map(async (item) => {
      const query = item.word;
      try {
        const response = await client.photos.search({ query, per_page: 1 });
        if ('photos' in response && Array.isArray(response.photos) && response.photos.length > 0) {
          return response.photos[0].src.original;
        } else {
          throw new Error('No photos found');
        }
      } catch (error) {
        console.error(`Error fetching photos for query "${query}":`, error);
        return `No photo of ${item.word} on Pexels`;
      }
    });

    const imageURLs = await Promise.all(imageURLsPromises);
    return imageURLs;
  }
);

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

export const addScore = createAsyncThunk('levels/addscore', async({email,score}: {email: string, score: number}) =>{
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.put(`${DEPLOY_DOMAIN}/users/addscore`, 
    {email, score},
    {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
})

export const getUserScore = createAsyncThunk('levels/getuserscore', async (email: string) => {
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.post(`${DEPLOY_DOMAIN}/users/userscore`, 
    {email},
    {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
});

export const resetScore = createAsyncThunk('levels/resetscore', async(email: string) =>{
    const refreshToken = localStorage.getItem('refToken');
    const response = await axios.put(`${DEPLOY_DOMAIN}/users/resetscore`, 
    {email},
    {
        headers: {
            'x-refresh-token': refreshToken,
        },
    });
    return response.data;
})

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
            })
            .addCase(getUserScore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserScore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.score = action.payload.score;
            })
            .addCase(getUserScore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addScore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addScore.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.score += action.payload.score;
            })
            .addCase(addScore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(resetScore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetScore.fulfilled, (state) => {
                state.status = 'succeeded';
                state.score = 0;
            })
            .addCase(resetScore.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getUrlsPexels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUrlsPexels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.imageURLs = action.payload;
            })
            .addCase(getUrlsPexels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default levelSlice.reducer;