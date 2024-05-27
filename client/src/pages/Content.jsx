import React, { useState } from "react";
import Modal from "react-modal";
import PersonalDetails from "./PersonalDetails";
import EducationalDetails from "./EducationalDetails";
import Achievements from "./Achievements";
import ExtraCurricular from "./ExtraCurricular ";
import Projects from "./Projects";
import Image from "../assets/Image.png";
import Footer from "./Footer";
import Header from "./Header";
import {
  FaUser,
  FaGraduationCap,
  FaMedal,
  FaLaptop,
  FaCode,
} from "react-icons/fa";

Modal.setAppElement("#root"); // Set the root element for modal accessibility

function Content() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [profileProgress, setProfileProgress] = useState(0);
  const [formCompletion, setFormCompletion] = useState({
    personalDetails: false,
    educationalDetails: false,
    achievements: false,
    extraCurricular: false,
    projects: false,
  });


  // Function to open the modal and set the component to be rendered
  const openModal = (component) => {
    setModalComponent(component);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalComponent(null);
    setModalIsOpen(false);
  };
   // Function to update the form completion status
   const handleFormSubmit = (formName) => {
    setFormCompletion((prev) => ({ ...prev, [formName]: true }));
  };

  // Function to update the profile progress
  const updateProgress = () => {
    const filledFormsCount = Object.values(formCompletion).filter(Boolean)
      .length;
    const progress = (filledFormsCount / 5) * 100;
    setProfileProgress(progress);
  };

  // Call updateProgress whenever formCompletion changes
  React.useEffect(() => {
    updateProgress();
  }, [formCompletion]);


  return (
    <div>
      {/* Header */}
      <Header />
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome To The Student Dashboard
        </h1>

        <div className="relative p-4 w-full">
          <p className="text-lg font-semibold mb-2">Profile Progress</p>
          <div className="h-2 bg-gray-300 rounded-md">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${profileProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Filled: {profileProgress.toFixed(2)}%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
             onClick={() =>
              openModal(
                <PersonalDetails
                  handleFormSubmit={() => handleFormSubmit("personalDetails")}
                />
              )
            }
            className="p-6 bg-lime-300 hover:bg-lime-400 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center"
          >
            <div className="mb-2">
              <FaUser className="text-5xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
            <p className="text-gray-700">
              Fill in your personal information here.
            </p>
          </button>

          <button
            onClick={() =>
              openModal(
                <EducationalDetails
                  handleFormSubmit={() => handleFormSubmit("educationalDetails")}
                />
              )
            }
            className="p-6 bg-yellow-300 hover:bg-yellow-400 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center"
          >
            <div className="mb-2">
              <FaGraduationCap className="text-5xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Educational Details</h2>
            <p className="text-gray-700">
              Fill in your educational information here.
            </p>
          </button>

          <button
             onClick={() =>
              openModal(
                <Achievements
                  handleFormSubmit={() => handleFormSubmit("achievements")}
                />
              )
            }
            className="p-6 bg-orange-300 hover:bg-orange-500 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center"
          >
            <div className="mb-2">
              <FaMedal className="text-5xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Achievements</h2>
            <p className="text-gray-700">Fill in your achievements here.</p>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <button
              onClick={() =>
                openModal(
                  <ExtraCurricular
                    handleFormSubmit={() => handleFormSubmit("extraCurricular")}
                  />
                )
              }
            className="p-6 bg-red-300 hover:bg-red-600 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center"
          >
            <div className="mb-2">
              <FaLaptop className="text-5xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Curricular and Co-curricular Activities
            </h2>
            <p className="text-gray-700">
              Fill in your extracurricular activities here.
            </p>
          </button>

          <button
            onClick={() =>
              openModal(
                <Projects
                  handleFormSubmit={() => handleFormSubmit("projects")}
                />
              )
            }
            className="p-6 bg-purple-300 hover:bg-purple-500 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center"
          >
            <div className="mb-2">
              <FaCode className="text-5xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p className="text-gray-700">Fill in your projects here.</p>
          </button>
        </div>

        <div className="flex justify-center items-center mt-8">
          <img className="py-5 h-25" src={Image} alt="placeholder" />
        </div>

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
              maxHeight: "750px",
              maxWidth: "700px",
              height: "90vh",
              width: "90vw",
            },
          }}
        >
          {modalComponent} {/* Render the selected component in the modal */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 "
            onClick={closeModal}
          >
            Close
          </button>{" "}
          {/* Close button */}
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Content;
