import { useEffect, useState, } from 'react';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { updateGame } from './services/fetch-utils';
import { getGameById } from './services/fetch-utils';

export default function DetailPage() {
  const [game, setGame] = useState({});
  const match = useRouteMatch();
  const { push } = useHistory();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [designer, setDesigner] = useState('');
  const [description, setDescription] = useState('');
  const [minPlayers, setMinPlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    async function fetch() {
      const gameResponse = await getGameById(match.params.id);
      setGame(gameResponse);
    }
    fetch();
  }, [match]);

  async function handleSubmit(e) {
    e.preventDefault();

    await updateGame({
      title,
      genre,
      designer,
      description,
      min_players: minPlayers,
      max_players: maxPlayers,
      params: id
    });

    push('/board-games');
  }

  

  return (
    <div className='detail'>
      <h1>{game.title}</h1>
      <h2>A {game.genre} game for {game.min_players} to {game.max_players} players</h2>
      <h3>by celebrated designer {game.designer}</h3>
      <p>
        {game.description}
      </p>
      <form onSubmit={handleSubmit}>
        <h2>Update board game</h2>
        <label>
            Title
          <input required name='title' onChange={e => setTitle(e.target.value)}/>
        </label>
        <label>
            Genre
          <select required onChange={e => setGenre(e.target.value)}>
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
            Designer
          <input required name='designer' onChange={e => setDesigner(e.target.value)}/>
        </label>
        <label>
            Min Players
          <input required name='min_players' onChange={e => setMinPlayers(e.target.value)}/>
        </label>
        <label>
            Max Players
          <input required name='max_players' onChange={e => setMaxPlayers(e.target.value)}/>
        </label>
        <label>
            Description
          <textarea required name='max_players' onChange={e => setDescription(e.target.value)}/>
        </label>
        <button>Update game</button>
      </form>
    </div>
  );
}

