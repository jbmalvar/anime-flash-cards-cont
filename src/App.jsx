import { useState } from 'react'
import Card from './components/Card'
import './App.css';
import maomaoImage from './assets/Maomao-Design-Anime.webp'

const App = () => {
  const [characters, setCharacters] = useState([
    {
      name: 'Naruto Uzumaki',
      image: 'https://cdn.staticneo.com/w/naruto/Nprofile2.jpg?20120125214131',
      difficulty: 'easy'
    },
    {
      name: 'Sasuke Uchiha',
      image: 'https://upload.wikimedia.org/wikipedia/en/4/42/SasukeKishimoto.jpg',
      difficulty: 'easy'
    },
    {
      name: 'Sakura Haruno',
      image: 'http://www.gubaba.org/mi2/wiki/images/thumb/7/70/Sakura.jpg/600px-Sakura.jpg',
      difficulty: 'easy'
    },
    {
      name: 'Kakashi Hatake',
      image: 'https://static.wikia.nocookie.net/character-stats-and-profiles/images/5/5b/Part_1_Kakashi.jpg',
      difficulty: 'easy'
    },
    {
      name: 'Vladilena Milize',
      image: 'https://static.wikia.nocookie.net/universal-warriors/images/a/a7/Vladilena_Milize_Anime.png',
      difficulty: 'medium'
    },
    {
      name: 'Eren Yeager',
      image: 'https://static.wikia.nocookie.net/shingekinokyojin/images/3/3c/Eren_Jaeger_%28Anime%29_character_image_%28850%29.png',
      difficulty: 'easy'
    },
    {
      name: 'Satowa Hozuki',
      image: 'https://static.wikia.nocookie.net/kono-oto-tomare/images/1/1d/230971.jpg',
      difficulty: 'hard'
    },
    {
      name: 'Maomao',
      image: maomaoImage,
      difficulty: 'medium'
    },
    {
      name: 'Megumin',
      image: 'https://static.wikia.nocookie.net/konosuba/images/3/3f/Megumin-anime.png',
      difficulty: 'easy'
    },
    {
      name: 'Miu Takigawa',
      image: 'https://cdn.myanimelist.net/images/characters/5/389321.jpg',
      difficulty: 'hard'
    }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setCurrentIndex(randomIndex);
    };

  return (
    <div className="App">
      <div className="header">
        <h1>Anime Character Flash Cards</h1>
        <p>How well can you identify these characters? Check it out!</p>
        <p>Number of cards: {characters.length}</p>
        <div className = "difficultyColor">
          <p>Difficulties: Green = Easy, Yellow = Medium, Red = Hard</p>
        </div>
      </div>
      <div className={`CardContainer ${characters[currentIndex].difficulty}`}>
        <Card character={characters[currentIndex]} difficulty={characters[currentIndex].difficulty} />
      </div>
      <div>
        <button className='button' onClick={nextCard}>{"->"}</button>
      </div>
    </div>
  )
};

export default App;
