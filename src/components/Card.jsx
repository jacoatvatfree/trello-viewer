import { useState } from 'preact/hooks';

    function Card({ card }) {
      const [showModal, setShowModal] = useState(false);

      const handleCardClick = () => {
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };

      return (
        <>
          <div
            className="bg-white p-2 rounded shadow mb-2 cursor-pointer hover:bg-gray-200"
            onClick={handleCardClick}
          >
            {card.name}
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{card.name}</h3>
                  <div className="mt-2 px-7 py-3">
                    <p className="text-sm text-gray-500">{card.desc || 'No description'}</p>
                  </div>
                  <div className="items-center px-4 py-3">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    export default Card;
