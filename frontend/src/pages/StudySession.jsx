import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { FaArrowLeft } from 'react-icons/fa';

const StudySession = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionFinished, setSessionFinished] = useState(false);

  useEffect(() => {
    const fetchDueCards = async () => {
      try {
        setLoading(true);
        // This endpoint needs to be created on the backend
        const response = await api.get(`/flashcards/deck/${deckId}/due`);
        if (response.data.length > 0) {
          setCards(response.data);
        } else {
          setSessionFinished(true);
        }
        setError('');
      } catch (err) {
        setError('Failed to fetch due cards. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDueCards();
  }, [deckId]);

  const handleReview = async (performanceScore) => {
    if (currentCardIndex >= cards.length) return;

    const cardId = cards[currentCardIndex].id;
    try {
      await api.post(`/flashcards/${cardId}/review`, { performance_score: performanceScore });
      
      // Move to the next card
      if (currentCardIndex + 1 < cards.length) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      } else {
        setSessionFinished(true);
      }
    } catch (err) {
      setError('Failed to save review. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading study session...</div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">{error}</div>;
  }

  if (sessionFinished) {
    return (
      <div className="text-center p-10 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Session Complete!</h2>
        <p className="text-gray-600 mb-6">You've reviewed all due cards for this deck. Great job!</p>
        <Link to="/dashboard" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
            <Link to="/dashboard" className="flex items-center text-sm text-blue-600 hover:underline mb-6">
                <FaArrowLeft className="mr-2" />
                Back to Decks
            </Link>

            <div className="w-full h-64 perspective mb-6">
                <div
                    className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div className="absolute w-full h-full backface-hidden bg-white border-2 border-gray-300 rounded-lg shadow-lg flex items-center justify-center p-4">
                        <p className="text-xl text-center">{currentCard.front}</p>
                    </div>
                    <div className="absolute w-full h-full backface-hidden bg-gray-50 border-2 border-gray-300 rounded-lg shadow-lg flex items-center justify-center p-4 rotate-y-180">
                        <p className="text-xl text-center">{currentCard.back}</p>
                    </div>
                </div>
            </div>

            {isFlipped && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                    <button onClick={() => handleReview(0)} className="p-4 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">Forgot</button>
                    <button onClick={() => handleReview(2)} className="p-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600">Hard</button>
                    <button onClick={() => handleReview(4)} className="p-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">Good</button>
                    <button onClick={() => handleReview(5)} className="p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">Easy</button>
                </div>
            )}

            <div className="text-center mt-6 text-gray-500">
                Card {currentCardIndex + 1} of {cards.length}
            </div>
        </div>
    </div>
  );
};

export default StudySession;
