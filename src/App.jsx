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
        setHiddenLists(new Set());
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
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-200">
        <div className="flex justify-between items-center mb-4 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trello Board Viewer</h1>
          {board && hiddenLists.size > 0 && (
            <button 
              onClick={showAllLists}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors duration-200 font-medium"
            >
              Show All Lists
            </button>
          )}
        </div>
        <div className="max-w-7xl mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Trello JSON export
            <input 
              type="file" 
              accept=".json" 
              onChange={handleFileUpload} 
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                dark:file:bg-blue-900 dark:file:text-blue-300
                hover:file:bg-blue-100 dark:hover:file:bg-blue-800
                transition-colors duration-200"
            />
          </label>
          {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}
        </div>
      </div>
      {board && board.lists && (
        <div className="flex-1 overflow-auto">
          <div className="flex gap-6 snap-x snap-mandatory p-6 items-start">
            {board.lists
              .filter(list => !hiddenLists.has(list.id))
              .map((list, index) => (
                <div key={list.id} className="snap-start">
                  <CardList 
                    list={list} 
                    cards={board.cards.filter(card => card.idList === list.id)}
                    onHide={() => toggleListVisibility(list.id)}
                    colorIndex={index}
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
