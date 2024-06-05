// import { useState } from 'react';
// import axios from 'axios';

// const Test = () => {
//   const [query, setQuery] = useState('');
//   const [imageURL, setImageURL] = useState('');

//   const searchImage = async () => {
//     const API_KEY = '44201920-d23d7ae2dc8e24522dfb3bd56';
//     const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}`;

//     try {
//       const response = await axios.get(URL);
//       if (response.data.totalHits > 0) {
//         setImageURL(response.data.hits[0].webformatURL);
//       } else {
//         setImageURL('');
//         alert('No hits');
//       }
//     } catch (error) {
//       console.error('Error fetching data from Pixabay', error);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Search on Pixabay</h1>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter query..."
//         style={{ padding: '10px', width: '300px' }}
//       />
//       <button onClick={searchImage} style={{ padding: '10px 20px', marginLeft: '10px' }}>
//         Search
//       </button>
//       <div style={{ marginTop: '20px' }}>
//         {imageURL ? <img src={imageURL} alt="Image" style={{ maxWidth: '100%' }} /> : 'No hits'}
//       </div>
//     </div>
//   );
// };

// export default Test;
