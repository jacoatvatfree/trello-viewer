import Card from './Card';

function CardList({ list, cards, onHide }) {
  return (
    <div className="w-80 shrink-0 bg-gray-100 rounded shadow max-h-full">
      <div className="sticky top-0 z-10 bg-gray-100 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{list.name}</h2>
          <button 
            onClick={onHide}
            className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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
