import { useState } from 'preact/hooks';

    function Card({ card }) {
      const [modalOpen, setModalOpen] = useState(false);

      const openModal = () => setModalOpen(true);
      const closeModal = () => setModalOpen(false);

      return (
        <div>
          <div
            className="bg-white rounded shadow p-2 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={openModal}
          >
            {card.name}
          </div>

          {modalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{card.name}</h3>
                  <div className="mt-2 px-7 py-3">
                    <p className="text-sm text-gray-500">
                      {card.desc ? <p><strong>Description:</strong> {card.desc}</p> : <p>No description</p>}
                    </p>
                    {card.comments && card.comments.length > 0 ? (
                      <div className="mt-4">
                        <h4 className="text-md font-semibold mb-2">Comments:</h4>
                        {card.comments.map((comment, index) => (
                          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                            <p className="text-sm text-gray-700">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4">No comments</p>
                    )}
                  </div>
                  <div className="items-center px-4 py-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default Card;
