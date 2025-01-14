import { useState } from 'preact/hooks';
    import CardList from './components/CardList';

    function App() {
      const [board, setBoard] = useState(null);
      const [error, setError] = useState(null);

      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
          setError('No file selected.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            setBoard(jsonData);
            setError(null);
          } catch (err) {
            setError('Error parsing JSON file.');
            setBoard(null);
          }
        };
        reader.onerror = () => {
          setError('Error reading file.');
          setBoard(null);
        };
        reader.readAsText(file);
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Trello Board Viewer</h1>
          <input type="file" accept=".json" onChange={handleFileUpload} className="mb-4" />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {board && board.lists && (
            <div className="flex flex-wrap -mx-2">
              {board.lists.map((list) => (
                <CardList key={list.id} list={list} cards={board.cards.filter(card => card.idList === list.id)} />
              ))}
            </div>
          )}
        </div>
      );
    }

    export default App;
