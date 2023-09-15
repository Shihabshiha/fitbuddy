import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

interface CourseActionMenuProps {
  onViewClick: () => void;
  onDeleteClick: () => void;
}

const CourseActionMenu: React.FC<CourseActionMenuProps> = ({ onViewClick, onDeleteClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2  hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      >
      <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul>
            <li>
              <button
                onClick={onViewClick}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                View
              </button>
            </li>
            <li>
              <button
                onClick={onDeleteClick}
                className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseActionMenu;
