import { useState } from 'react'
import Card from './components/Card'
import './App.css';
import maomaoImage from './assets/Maomao-Design-Anime.webp'
import levenshtein from 'js-levenshtein';

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
  const[Mastered, setMasteredCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [correctStreak, setCorrectStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [labelColor, setLabelColor] = useState('');
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    if (currentIndex === characters.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex === 0) {
      setCurrentIndex(characters.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const shuffleCards = () => {
    characters.sort(() => Math.random() - 0.5);
    setCurrentIndex(0);
  }

  const MasteredCard = () => {
    const mastered = characters[currentIndex];
    setMasteredCharacters([...Mastered, mastered]);
    const newCharacters = characters.filter((_, index) => index !== currentIndex);
    setCharacters(newCharacters);
    if (currentIndex >= newCharacters.length) {
      setCurrentIndex(0);
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    const userInput = inputValue.trim().toLowerCase();
    const correctAnswer = characters[currentIndex].name.toLowerCase();
    const distance = levenshtein(userInput, correctAnswer);
    const threshold = 3;

    if (distance <= threshold) {
      setCorrectStreak(correctStreak + 1);
      if (correctStreak + 1 > longestStreak) {
        setLongestStreak(correctStreak + 1);
      }
      setLabelColor('green');
    } else {
      setCorrectStreak(0);
      setLabelColor('red');
    }
    setInputValue('');
    nextCard();
    setTimeout(() => setLabelColor(''), 500);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
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
        <div className = "counter">
          <p>Correct Streak: {correctStreak} Longest Streak: {longestStreak}</p>
        </div>
      </div>
      {characters.length > 0 ? (
        <div>
          <div className={`CardContainer ${characters[currentIndex].difficulty}`}>
            <Card 
              character={characters[currentIndex]} 
              difficulty={characters[currentIndex].difficulty} 
              flipped={flipped} 
              onFlip={handleFlip} 
            />
          </div>
          <div>
            <button className='button' onClick={prevCard}>{"<-"}</button>
            <button className='button' onClick={nextCard}>{"->"}</button>
            <button className='button' onClick={shuffleCards}>Shuffle</button>
            <button className='button' onClick={MasteredCard}>Add to Mastered</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>All cards mastered!</h2>
        </div>
      )}
      {!flipped && (
        <div>
          <label style={{ color: labelColor }}>Enter your answer: </label>
          <input value={inputValue} onChange={handleInputChange}></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <div>
        <h2>Mastered Cards</h2>
        <div className="MasteredCardContainer">
          {Mastered.map((character, index) => (
            <Card key={index} character={character} difficulty={character.difficulty} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default App;
