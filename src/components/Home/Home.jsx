import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>
          I am the Traveler,
          <br />
          Nice to meet you!
        </h1>
        <p>
        A full-time adventurer and an outlander. 
        <br />
        And on a journey to find my lost sibling.
        <br />
        Do you want to travel with me?
        </p>
      </div>
      <div className="home-image">
        <img src="\aether.png" alt="Profile" />
      </div>  
    </div>
  );
}

export default Home;