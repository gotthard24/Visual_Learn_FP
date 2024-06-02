const Home = () => {
  const email = localStorage.getItem('email')

  return (
    <>
      <h1>Home</h1>
      <ul>
        {email}
      </ul>
    </>
  );
};

export default Home;
