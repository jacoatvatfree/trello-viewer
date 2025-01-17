import Card from './Card';

const columnColors = [
  'bg-blue-50 dark:bg-blue-950/30',
  'bg-purple-50 dark:bg-purple-950/30',
  'bg-pink-50 dark:bg-pink-950/30',
  'bg-red-50 dark:bg-red-950/30',
  'bg-orange-50 dark:bg-orange-950/30',
  'bg-amber-50 dark:bg-amber-950/30',
  'bg-yellow-50 dark:bg-yellow-950/30',
  'bg-lime-50 dark:bg-lime-950/30',
  'bg-green-50 dark:bg-green-950/30',
  'bg-emerald-50 dark:bg-emerald-950/30',
  'bg-teal-50 dark:bg-teal-950/30',
  'bg-cyan-50 dark:bg-cyan-950/30',
  'bg-sky-50 dark:bg-sky-950/30',
  'bg-indigo-50 dark:bg-indigo-950/30',
  'bg-violet-50 dark:bg-violet-950/30',
  'bg-fuchsia-50 dark:bg-fuchsia-950/30',
];

function CardList({ list, cards, onHide, colorIndex }) {
  const bgColor = columnColors[colorIndex % columnColors.length];
  
  return (
    <div className={`w-80 shrink-0 rounded-lg shadow-lg max-h-full transition-all duration-200 ${bgColor}`}>
      <div className="sticky top-0 z-10 p-4 border-b border-gray-200/50 dark:border-gray-700/50 rounded-t-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 transition-colors duration-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{list.name}</h2>
          <button 
            onClick={onHide}
            className="px-3 py-1.5 text-sm bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 
              rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Hide
          </button>
        </div>
      </div>
      <div className="p-4 pt-2 overflow-y-auto">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
