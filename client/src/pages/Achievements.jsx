import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import "./styles.css";
import * as Yup from "yup";

function Achievements({handleFormSubmit}) {
  const [achievementCertificate, setAchievementCertificate] = useState(null);
  const [internshipCertificate, setInternshipCertificate] = useState(null);
  const [examCertificate, setExamCertificate] = useState(null);

  const [buttonText, setButtonText] = useState('Save');


  const initialValues = {
    achievements: [
      {
        title: "",
        description: "",
        type: "",
        provider: "",
        date: "",
        duration: "",
        platform: "",
        skills: "",
        achievementCertificate: null,
        certificateURL: "",
      },
    ],
    internships: [
      {
        internshiptitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
        supervisor: "",
        feedback: "",
        internshipCertificate: null,
      },
    ],
    exams: [
      {
        examName: "",
        examDate: "",
        score: "",
        rank: "",
        percentile: "",
        examCertificate: null,
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required. "),

  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {

    // Call the handleFormSubmit prop to update the form completion status
    handleFormSubmit();

    
    try {
      const updatedAchievements = values.achievements.map(
        (achievement, index) => {
          if (values.achievements[index].achievementCertificate) {
            const achievementCertificateUrl = URL.createObjectURL(
              values.achievements[index].achievementCertificate
            );
            return {
              ...achievement,
              achievementCertificate: achievementCertificateUrl,
            };
          }
          return achievement;
        }
      );
      const updatedInternship = values.internships.map((internship, index) => {
        if (values.internships[index].internshipCertificate) {
          const internshipCertificateUrl = URL.createObjectURL(
            values.internships[index].internshipCertificate
          );
          return {
            ...internship,
            internshipCertificate: internshipCertificateUrl,
          };
        }
        return internship;
      });
      const updatedExams = values.exams.map((exam, index) => {
        if (values.exams[index].examCertificate) {
          const examCertificateUrl = URL.createObjectURL(
            values.exams[index].examCertificate
          );
          return { ...exam, examCertificate: examCertificateUrl };
        }
        return exam;
      });

      const combinedData = {
        achievementsCertificates: updatedAchievements,
        internships: updatedInternship,
        exams: updatedExams,
      };

      // Update the context with all combined data
      console.log("Achievement/Certification Details: ", values);
      setAchievementData(combinedData.achievementsCertificates);
      setAchievementCertificate(null);
      setInternshipData(combinedData.internships); // Assuming you have setInternshipData in your context
      setInternshipCertificate(null);
      setExamData(combinedData.exams); // Assuming you have setExamData in your context
      setExamCertificate(null);

      // Pass all combined data in the navigation state
      navigate("/add-ProjectDetails", { state: { combinedData } });
    } catch (error) {
      console.error("Achievement submission failed", error);
      setSubmitting(false);
      setErrors({ submit: "Achievement submission failed" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        handleChange,
      }) => (
        <Form>
          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <legend className="text-2xl font-bold mb-6 text-orange-400">
                  Achievements and Certifications
                </legend>
                <FieldArray name="achievements">
                  {({ push, remove }) => (
                    <fieldset className="fieldset">
                      <legend className="text-lg font-bold mb-4 text-orange-400">
                        Achievement/Certification Details
                      </legend>
                      {values.achievements.map((achievement, index) => (
                        <div key={index} className="mb-6">
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">{`Achievement Title ${
                              index + 1
                            }:`}</label>
                            <Field
                              type="text"
                              name={`achievements[${index}].title`}
                              value={achievement.title || ""}
                              autoComplete="off"
                              placeholder="Enter title of achievement or certificate"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].title &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].title && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].title}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Achievement Description:
                            </label>
                            <Field
                              as="textarea"
                              name={`achievements[${index}].description`}
                              value={achievement.description}
                              autoComplete="off"
                              placeholder="Describe the achievement or certificate"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].description &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].description && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].description}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Type of Achievement/Certification:
                            </label>
                            <Field
                              type="text"
                              name={`achievements[${index}].type`}
                              value={achievement.type}
                              autoComplete="off"
                              placeholder="Enter type (e.g., competition, certification)"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].type &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].type && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].type}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Provider/Organizer:
                            </label>
                            <Field
                              type="text"
                              name={`achievements[${index}].provider`}
                              value={achievement.provider}
                              autoComplete="off"
                              placeholder="Enter provider (e.g., school, organization)"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].provider &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].provider && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].provider}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Date of Achievement:
                            </label>
                            <Field
                              type="date"
                              name={`achievements[${index}].date`}
                              value={achievement.date}
                              autoComplete="off"
                              placeholder="Enter date of achievement or certification"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].date &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].date && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].date}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Duration (for courses):
                            </label>
                            <Field
                              type="text"
                              name={`achievements[${index}].duration`}
                              value={achievement.duration}
                              autoComplete="off"
                              placeholder="Enter duration (for e.g. 1 month, 1 year)"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].duration &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].duration && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].duration}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Platform/Website:
                            </label>
                            <Field
                              type="text"
                              name={`achievements[${index}].platform`}
                              value={achievement.platform}
                              autoComplete="off"
                              placeholder="Enter platform or context"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].platform &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].platform && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].platform}
                                </p>
                              )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Skills/Knowledge Gained:
                            </label>
                            <Field
                              as="textarea"
                              name={`achievements[${index}].skills`}
                              value={achievement.skills}
                              autoComplete="off"
                              placeholder="List relevant skills acquired"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].skills &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].skills && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].skills}
                                </p>
                              )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Certificate URL:
                            </label>
                            <Field
                              type="url"
                              name={`achievements[${index}].certificateURL`}
                              value={achievement.certificateURL}
                              autoComplete="off"
                              placeholder="Enter certificate URL"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.achievements &&
                              errors.achievements[index] &&
                              errors.achievements[index].certificateURL &&
                              touched.achievements &&
                              touched.achievements[index] &&
                              touched.achievements[index].certificateURL && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.achievements[index].certificateURL}
                                </p>
                              )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">
                              Achievement Certificate:
                            </label>
                            <input
                              type="file"
                              id={`achievements.[${index}].achievementCertificate`}
                              name={`achievements.[${index}].achievementCertificate`}
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => {
                                const achievementCertificate =
                                  e.currentTarget.files[0];
                                setFieldValue(
                                  `achievements.[${index}].achievementCertificate`,
                                  achievementCertificate
                                );
                              }}
                              className="input-field-small"
                            />

                            <ErrorMessage
                              name={`achievements[${index}].achievementCertificate`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                            {achievement.achievementCertificate && (
                              <img
                                src={achievement.achievementCertificate}
                                alt="Uploaded"
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                  marginLeft: "10px",
                                }}
                              />
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            title: "",
                            description: "",
                            type: "",
                            provider: "",
                            date: "",
                            duration: "",
                            platform: "",
                            skills: "",
                            achievementCertificate: null,
                            certificateURL: "",
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 "
                      >
                        Add Achievement
                      </button>
                    </fieldset>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <FieldArray name="internships">
                  {({ push, remove }) => (
                    <fieldset className="fieldset">
                      <legend className="text-lg font-semibold mb-2">
                        {" "}
                        Intership Details
                      </legend>
                      {values.internships.map((internship, index) => (
                        <div key={index} className="mb-4">
                          {" "}
                          <div className="mb-2">
                            {" "}
                            <label className="block font-medium">{`Internship Title ${
                              index + 1
                            }:`}</label>{" "}
                            <Field
                              type="text"
                              name={`internships[${index}].internshiptitle`}
                              value={internship.internshiptitle}
                              autoComplete="off"
                              placeholder="Enter internship title"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.internships &&
                            errors.internships[index] &&
                            errors.internships[index].internshiptitle &&
                            touched.internships &&
                            touched.internships[index] &&
                            touched.internships[index].internshiptitle ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.internships[index].internshiptitle}
                              </p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            {" "}
                            {/* Adjusted Tailwind CSS class */}
                            <label className="block font-medium">
                              Company/Organization:
                            </label>{" "}
                            {/* Adjusted Tailwind CSS class */}
                            <Field
                              type="text"
                              name={`internships[${index}].company`}
                              value={internship.company}
                              autoComplete="off"
                              placeholder="Enter company or organization name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.internships &&
                            errors.internships[index] &&
                            errors.internships[index].company &&
                            touched.internships &&
                            touched.internships[index] &&
                            touched.internships[index].company ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.internships[index].company}
                              </p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            {" "}
                            {/* Adjusted Tailwind CSS class */}
                            <label className="block font-medium">
                              Internship Duration:
                            </label>{" "}
                            {/* Adjusted Tailwind CSS class */}
                            <div className="flex space-x-4">
                              {" "}
                              {/* Adjusted Tailwind CSS class */}
                              <div>
                                <label>Start Date</label>
                                <Field
                                  type="date"
                                  name={`internships[${index}].startDate`}
                                  value={internship.startDate}
                                  autoComplete="off"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="achievement-field"
                                />
                                {errors.internships &&
                                errors.internships[index] &&
                                errors.internships[index].startDate &&
                                touched.internships &&
                                touched.internships[index] &&
                                touched.internships[index].startDate ? (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.internships[index].startDate}
                                  </p>
                                ) : null}
                              </div>
                              <div>
                                <label>End Date</label>
                                <Field
                                  type="date"
                                  name={`internships[${index}].endDate`}
                                  value={internship.endDate}
                                  autoComplete="off"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="achievement-field"
                                />
                                {errors.internships &&
                                errors.internships[index] &&
                                errors.internships[index].endDate &&
                                touched.internships &&
                                touched.internships[index] &&
                                touched.internships[index].endDate ? (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.internships[index].endDate}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="mb-2">
                            {" "}
                            {/* Adjusted Tailwind CSS class */}
                            <label className="block font-medium">
                              Role/Responsibilities:
                            </label>{" "}
                            {/* Adjusted Tailwind CSS class */}
                            <Field
                              as="textarea"
                              name={`internships[${index}].responsibilities`}
                              value={internship.responsibilities}
                              autoComplete="off"
                              placeholder="Describe responsibilities"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              rows="4"
                              className="achievement-field"
                            />
                            {errors.internships &&
                            errors.internships[index] &&
                            errors.internships[index].responsibilities &&
                            touched.internships &&
                            touched.internships[index] &&
                            touched.internships[index].responsibilities ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.internships[index].responsibilities}
                              </p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <label className="block font-medium">
                              Achievements:
                            </label>
                            <Field
                              as="textarea"
                              name={`internships[${index}].achievements`}
                              value={internship.achievements}
                              autoComplete="off"
                              placeholder="List achievements during internship"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              rows="4"
                              className="achievement-field"
                            />
                            {errors.internships &&
                            errors.internships[index] &&
                            errors.internships[index].achievements &&
                            touched.internships &&
                            touched.internships[index] &&
                            touched.internships[index].achievements ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.internships[index].achievements}
                              </p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <label className="block font-medium">
                              Supervisor/Mentor:
                            </label>
                            <Field
                              type="text"
                              name={`internships[${index}].supervisor`}
                              value={internship.supervisor}
                              autoComplete="off"
                              placeholder="Enter supervisor's name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.internships &&
                            errors.internships[index] &&
                            errors.internships[index].supervisor &&
                            touched.internships &&
                            touched.internships[index] &&
                            touched.internships[index].supervisor ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.internships[index].supervisor}
                              </p>
                            ) : null}
                          </div>
                          {/* Feedback or Evaluation */}
                          <div className="mb-2">
                            <label className="block font-medium">
                              Feedback or Evaluation:
                            </label>
                            <Field
                              as="textarea"
                              name={`internships[${index}].feedback`}
                              value={internship.feedback}
                              autoComplete="off"
                              placeholder="Provide feedback or evaluation"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              rows="4"
                              className="achievement-field"
                            />
                            {errors.internships &&
                            errors.internships[index] &&
                            errors.internships[index].feedback &&
                            touched.internships &&
                            touched.internships[index] &&
                            touched.internships[index].feedback ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.internships[index].feedback}
                              </p>
                            ) : null}
                          </div>
                          {/* Internship Certificate */}
                          <div className="mb-2">
                            <label className="block font-medium">
                              Internship Certificate:
                            </label>
                            <input
                              type="file"
                              id={`internships.[${index}].internshipCertificate`}
                              name={`internships.[${index}].internshipCertificate`}
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => {
                                const internshipCertificate =
                                  e.currentTarget.files[0];
                                setFieldValue(
                                  `internships.[${index}].internshipCertificate`,
                                  internshipCertificate
                                );
                              }}
                              className="achievement-field"
                            />
                            <ErrorMessage
                              name={`internships[${index}].internshipCertificate`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                            {internshipCertificate && (
                              <img
                                src={URL.createObjectURL(internshipCertificate)}
                                alt="Uploaded"
                                className="mt-1 block"
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                }}
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            internshiptitle: "",
                            company: "",
                            startDate: "",
                            endDate: "",
                            responsibilities: "",
                            achievement: "",
                            supervisor: "",
                            feedback: "",
                            internshipCertificate: null,
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 "
                      >
                        Add Internship
                      </button>
                    </fieldset>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <FieldArray name="exams">
                  {({ push, remove }) => (
                    <fieldset className="fieldset">
                      <legend className="text-lg font-semibold">
                        <u>Entrance Exam Details</u>
                      </legend>
                      {values.exams.map((exam, index) => (
                        <div key={index}>
                          <div className="mb-2">
                            <label className="block font-medium">
                              Exam Name:
                            </label>
                            <Field
                              type="text"
                              name={`exams[${index}].examName`}
                              value={exam.examName}
                              autoComplete="off"
                              placeholder="Enter exam name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.exams &&
                            errors.exams[index] &&
                            errors.exams[index].examName &&
                            touched.exams &&
                            touched.exams[index] &&
                            touched.exams[index].examName ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.exams[index].examName}
                              </p>
                            ) : null}
                          </div>
                          {/* Exam Date */}
                          <div className="mb-2">
                            <label className="block font-medium">
                              Exam Date:
                            </label>
                            <Field
                              type="date"
                              name={`exams[${index}].examDate`}
                              value={exam.examDate}
                              autoComplete="off"
                              placeholder="Enter exam date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.exams &&
                            errors.exams[index] &&
                            errors.exams[index].examDate &&
                            touched.exams &&
                            touched.exams[index] &&
                            touched.exams[index].examDate ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.exams[index].examDate}
                              </p>
                            ) : null}
                          </div>
                          {/* Score */}
                          <div className="mb-2">
                            <label className="block font-medium">Score:</label>
                            <Field
                              type="text"
                              name={`exams[${index}].score`}
                              value={exam.score}
                              autoComplete="off"
                              placeholder="Enter score obtained"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.exams &&
                            errors.exams[index] &&
                            errors.exams[index].score &&
                            touched.exams &&
                            touched.exams[index] &&
                            touched.exams[index].score ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.exams[index].score}
                              </p>
                            ) : null}
                          </div>
                          {/* Rank */}
                          <div className="mb-2">
                            <label className="block font-medium">Rank:</label>
                            <Field
                              type="text"
                              name={`exams[${index}].rank`}
                              value={exam.rank}
                              autoComplete="off"
                              placeholder="Enter rank"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.exams &&
                            errors.exams[index] &&
                            errors.exams[index].rank &&
                            touched.exams &&
                            touched.exams[index] &&
                            touched.exams[index].rank ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.exams[index].rank}
                              </p>
                            ) : null}
                          </div>
                          {/* Percentile */}
                          <div className="mb-2">
                            <label className="block font-medium">
                              Percentile:
                            </label>
                            <Field
                              type="text"
                              name={`exams[${index}].percentile`}
                              value={exam.percentile}
                              autoComplete="off"
                              placeholder="Enter percentiles"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="achievement-field"
                            />
                            {errors.exams &&
                            errors.exams[index] &&
                            errors.exams[index].percentile &&
                            touched.exams &&
                            touched.exams[index] &&
                            touched.exams[index].percentile ? (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.exams[index].percentile}
                              </p>
                            ) : null}
                          </div>
                          {/* Exam Certificate */}
                          <div className="mb-2">
                            <label className="block font-medium">
                              Exam Certificate:
                            </label>
                            <input
                              type="file"
                              id={`exams.[${index}].examCertificate`}
                              name={`exams.[${index}].examCertificate`}
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => {
                                const examCertificate =
                                  e.currentTarget.files[0];
                                setFieldValue(
                                  `exams.[${index}].examCertificate`,
                                  examCertificate
                                );
                              }}
                              className="achievement-field"
                            />
                            <ErrorMessage
                              name={`exams[${index}].examCertificate`}
                              component="p"
                              className="text-red-500 text-sm mt-1"
                            />
                            {exam.examCertificate && (
                              <img
                                src={exam.examCertificate}
                                alt="Uploaded"
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                  marginLeft: "10px",
                                }}
                              />
                            )}
                          </div>
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded "
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {/* Add button */}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            examName: "",
                            examDate: "",
                            score: "",
                            rank: "",
                            percentile: "",
                            examCertificate: null,
                          })
                        }
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4"
                      >
                        Add Exams
                      </button>
                      <br />
                      <button
                        type="submit"
                        onClick={() => setButtonText('Saved')}
                        className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
                      >
                          {buttonText}
                      </button>
                    </fieldset>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Achievements;
