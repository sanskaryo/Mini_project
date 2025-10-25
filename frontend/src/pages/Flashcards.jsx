import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Flashcard = ({ card, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-48 perspective">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden bg-white border-2 border-blue-500 rounded-lg shadow-lg flex flex-col justify-between p-4">
          <div>
            <h3 className="font-semibold text-gray-500 text-sm">QUESTION</h3>
            <p className="text-gray-800 mt-2">{card.front}</p>
          </div>
          <p className="text-xs text-gray-400 self-center">Click to reveal answer</p>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden bg-blue-50 text-gray-800 border-2 border-blue-500 rounded-lg shadow-lg flex flex-col justify-between p-4 rotate-y-180">
          <div>
            <h3 className="font-semibold text-blue-800 text-sm">ANSWER</h3>
            <p className="mt-2">{card.back}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Click to return to question</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card from flipping when deleting
                if (window.confirm('Are you sure you want to delete this flashcard?')) {
                  onDelete(card.id);
                }
              }}
              className="text-red-500 hover:text-red-700 text-xs font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const response = await api.get('/flashcards/');
      setFlashcards(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch flashcards. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFlashcard = async (e) => {
    e.preventDefault();
    if (!front || !back) {
      setError('Both front and back content are required.');
      return;
    }
    try {
      await api.post('/flashcards/', { front, back });
      setFront('');
      setBack('');
      setError('');
      fetchFlashcards(); // Refresh the list
    } catch (err) {
      setError('Failed to create flashcard.');
      console.error(err);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await api.delete(`/flashcards/${id}`);
      fetchFlashcards(); // Refresh the list
    } catch (err) {
      setError('Failed to delete flashcard.');
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Flashcards</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
          <form onSubmit={handleCreateFlashcard}>
            <div className="mb-4">
              <label htmlFor="front" className="block text-gray-700 font-medium mb-2">Front (Question)</label>
              <textarea
                id="front"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., What is the powerhouse of the cell?"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="back" className="block text-gray-700 font-medium mb-2">Back (Answer)</label>
              <textarea
                id="back"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., The mitochondria"
                rows="3"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
              Create Flashcard
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Collection</h2>
          {loading ? (
             <div className="text-center p-8">Loading flashcards...</div>
          ) : flashcards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map(card => (
                <Flashcard key={card.id} card={card} onDelete={handleDeleteFlashcard} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-500">You haven't created any flashcards yet. Use the form above to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
