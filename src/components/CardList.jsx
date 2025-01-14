import Card from './Card';

    function CardList({ list, cards }) {
      return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
          <div className="bg-gray-100 rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">{list.name}</h2>
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      );
    }

    export default CardList;
