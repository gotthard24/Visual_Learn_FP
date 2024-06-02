import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const email = localStorage.getItem('email')

  useEffect(()=>{
    axios.get
  })

  return (
    <>
      <h1>Home</h1>
      <ul>
        <h2>Welcome {`${email}`} !</h2>
      </ul>
    </>
  );
};

export default Home;
