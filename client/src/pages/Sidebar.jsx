import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiHome, BiHelpCircle, BiGrid, BiUser } from "react-icons/bi";
import Modal from "react-modal"; // Import Modal component
import ViewProfile from "./ViewProfile";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal open/close

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className={`bg-slate-200 menu min-h-screen ${isOpen ? "w-64" : "w-16"}`}
    >
      <div className="flex items-center p-4">
        <BiHome className="w-6 h-6 mr-2" />
        {isOpen && (
          <h2 className="text-lg font-semibold">Student Information</h2>
        )}
      </div>

      {/* View Profile Button */}
      <button
        onClick={openModal}
        className={`flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg transition duration-300 ease-in-out ${
          isOpen ? "" : "hidden"
        }`}
      >
        <BiUser className="w-6 h-6 mr-2" />
        <span>View Profile</span>
      </button>

      <Link
        to="#"
        className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg transition duration-300 ease-in-out ${
          isOpen ? "" : "hidden"
        }`}
      >
        <BiHelpCircle className="w-6 h-6 mr-2" />
        <span>Help</span>
      </Link>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen} // Set modal open state
        onRequestClose={closeModal} // Function to close modal when clicking overlay or escape key
        shouldCloseOnOverlayClick={false} // Modal won't close when clicking outside
        shouldCloseOnEsc={false} // Modal won't close when pressing the escape key
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay styles
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "750px", // Max height of the modal
            height: "90vh", // Height of the modal (90% of the viewport height)
            maxWidth: "700px", // Max width of the modal
            width: "90vw",
          },
        }}
      >
        <ViewProfile />
        <button onClick={closeModal}>Close</button>
      </Modal>

      <button
        className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-full"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
}

export default Sidebar;
