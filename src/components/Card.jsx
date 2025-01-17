import { useState } from 'preact/hooks';

function Card({ card, onHide }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const generateMarkdown = () => {
    const markdown = [
      `# ${card.name}\n`,
      card.desc ? `## Description\n${card.desc}\n` : '',
      card.comments && card.comments.length > 0 
        ? `## Comments\n${card.comments.map(c => `- ${c.text}`).join('\n')}\n`
        : ''
    ].join('\n');
    return markdown.trim();
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(generateMarkdown());
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <div
        className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 mb-2 cursor-pointer 
          hover:bg-gray-50 dark:hover:bg-gray-600 relative group transition-colors duration-200"
        onClick={openModal}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-2 text-gray-900 dark:text-gray-100">{card.name}</div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onHide();
              }}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="Hide card"
            >
              ×
            </button>
            <button
              onClick={handleCopy}
              className={`${
                copyFeedback ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              } p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 
              hover:bg-gray-200 dark:hover:bg-gray-500`}
              title="Copy as markdown"
            >
              {copyFeedback ? '✓' : '📋'}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 
          overflow-y-auto h-full w-full z-50 transition-colors duration-200">
          <div className="relative top-20 mx-auto p-5 border w-[32rem] shadow-xl rounded-xl 
            bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
            <div className="mt-3">
              <h3 className="text-xl leading-6 font-semibold text-gray-900 dark:text-white mb-4">
                {card.name}
              </h3>
              <div className="mt-2 px-4 py-3">
                {card.desc ? (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description:</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{card.desc}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 mb-6">No description</p>
                )}
                
                {card.comments && card.comments.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Comments:</h4>
                    {card.comments.map((comment, index) => (
                      <div key={index} className="mb-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No comments</p>
                )}
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                    rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
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
