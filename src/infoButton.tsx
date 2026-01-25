import React from 'react';

interface InfoButtonProps {
  showInfo: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ showInfo }) => {
  return (
    <button
      onClick={showInfo}
      className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full shadow-lg transition-all duration-200"
    >
      <strong>i</strong>
    </button>
  );
};

export default InfoButton;