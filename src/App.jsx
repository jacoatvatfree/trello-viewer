import { useState } from 'preact/hooks';
import CardList from './components/CardList';

function App() {
  const [board, setBoard] = useState(null);
  const [error, setError] = useState(null);
  const [hiddenLists, setHiddenLists] = useState(new Set());

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
        setHiddenLists(new Set()); // Reset hidden lists when loading new board
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

  const toggleListVisibility = (listId) => {
    setHiddenLists(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(listId)) {
        newHidden.delete(listId);
      } else {
        newHidden.add(listId);
      }
      return newHidden;
    });
  };

  const showAllLists = () => {
    setHiddenLists(new Set());
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-4 border-b border-gray-200 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Trello Board Viewer</h1>
          {board && hiddenLists.size > 0 && (
            <button 
              onClick={showAllLists}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Show All Lists
            </button>
          )}
        </div>
        <input type="file" accept=".json" onChange={handleFileUpload} className="mb-4" />
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
      {board && board.lists && (
        <div className="flex-1 overflow-auto">
          <div className="flex gap-4 snap-x snap-mandatory p-4">
            {board.lists
              .filter(list => !hiddenLists.has(list.id))
              .map((list) => (
                <div key={list.id} className="snap-start">
                  <CardList 
                    list={list} 
                    cards={board.cards.filter(card => card.idList === list.id)}
                    onHide={() => toggleListVisibility(list.id)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
