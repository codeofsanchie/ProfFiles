import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import "./styles.css";
import * as Yup from "yup";

function EducationalDetails({ handleFormSubmit }) {
  const [CcResult, setCcResult] = useState(null);
  const [marksheet, setMarksheet] = useState(null);

  const initialValues = {
    admissionYear: "",
    instituteState: "",
    instituteDistrict: "",
    instituteTaluka: "",
    qualificationLevel: "",
    stream: "",
    collegeName: "",
    courseName: "",
    cetMeritPercentageClatScore: "",
    applicationId: "",
    yearOfStudy: "",
    completedOrContinue: "",
    gapYears: "",
    mode: "",
    CcResult: null,

    pastQualifications: [
      {
        qualificationLevel: "",
        stream: "",
        instituteState: "",
        instituteDistrict: "",
        instituteTaluka: "",
        collegeName: "",
        course: "",
        boardUniversity: "",
        mode: "",
        admissionYear: "",
        passingYear: "",
        result: "",
        percentage: "",
        attempts: "",
        marksheet: null,
        gap: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    admissionYear: Yup.string()
   .required("Admission Year is required")

  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {


    handleFormSubmit();

    try {
      const updatedPastQualifications = values.pastQualifications.map(
        (qualification, index) => {
          // Check if there's a marksheet file for this qualification
          if (values.pastQualifications[index].marksheet) {
            const marksheetUrl = URL.createObjectURL(
              values.pastQualifications[index].marksheet
            );
            return { ...qualification, marksheet: marksheetUrl };
          }
          // If there's no marksheet file, return the qualification object as is
          return qualification;
        }
      );

      // Exclude pastQualifications field from spreading values
      const { pastQualifications, ...currentCourse } = values;

      const combinedData = {
        currentCourse: { ...currentCourse, photo: CcResult },
        pastQualifications: updatedPastQualifications,
      };

      // Update the context with all combined data
      console.log("Education Details:", values);
      setCurrentCourseData(combinedData.currentCourse); // This is a simplified example. Adjust according to your actual data structure.
      setCcResult(null);
      setPastQualificationData(combinedData.pastQualifications);
      setMarksheet(null);
      navigate("/add-CurricularDetails", { state: { combinedData } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        handleBlur,
        values,
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <legend className="text-2xl font-bold mb-6 text-yellow-400">
                  Educational Details
                </legend>
                <fieldset className="fieldset mb-4">
                  <legend className="text-lg font-bold mb-4 text-yellow-400">
                    Current Course
                  </legend>
                  <div className="mb-3">
                    <label htmlFor="admissionYear" className="form-label">
                      Admission Year In Current Course:
                    </label>
                    <Field
                      type="text"
                      name="admissionYear"
                      id="admissionYear"
                      className="education-field"
                      placeholder="Enter admission year (YYYY)"
                    />
                    <ErrorMessage
                      name="admissionYear"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3 row">
                    <div className="col-md-4">
                      <label htmlFor="instituteState" className="form-label">
                        Institute State:
                      </label>
                      <Field
                        type="text"
                        name="instituteState"
                        id="instituteState"
                        className="education-field"
                        placeholder="Enter institute state"
                      />
                      <ErrorMessage
                        name="instituteState"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="instituteDistrict" className="form-label">
                        Institute District:
                      </label>
                      <Field
                        type="text"
                        name="instituteDistrict"
                        id="instituteDistrict"
                        className="education-field"
                        placeholder="Enter institute district"
                      />
                      <ErrorMessage
                        name="instituteDistrict"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="instituteTaluka" className="form-label">
                        Institute Taluka:
                      </label>
                      <Field
                        type="text"
                        name="instituteTaluka"
                        id="instituteTaluka"
                        className="education-field"
                        placeholder="Enter institute taluka"
                      />
                      <ErrorMessage
                        name="instituteTaluka"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label
                        htmlFor="qualificationLevel"
                        className="form-label"
                      >
                        Qualification Level:
                      </label>
                      <Field
                        type="text"
                        name="qualificationLevel"
                        id="qualificationLevel"
                        className="education-field"
                        placeholder="Qualification level (e.g., Undergraduate, Postgraduate)"
                      />
                      <ErrorMessage
                        name="qualificationLevel"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="stream" className="form-label">
                        Stream:
                      </label>
                      <Field
                        type="text"
                        name="stream"
                        id="stream"
                        className="education-field"
                        placeholder="Enter stream (e.g.Computer Science, Engineering)"
                      />
                      <ErrorMessage
                        name="stream"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label htmlFor="collegeName" className="form-label">
                        College Name / School Name:
                      </label>
                      <Field
                        type="text"
                        name="collegeName"
                        id="collegeName"
                        className="education-field"
                        placeholder="Enter college or school name"
                      />
                      <ErrorMessage
                        name="collegeName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="courseName" className="form-label">
                        Course Name:
                      </label>
                      <Field
                        type="text"
                        name="courseName"
                        id="courseName"
                        className="education-field"
                        placeholder="Enter course name (e.g., Bachelor of Technology, Master of Business Administration)"
                      />
                      <ErrorMessage
                        name="courseName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="cetMeritPercentageClatScore"
                      className="form-label"
                    >
                      CET / Merit Percentage / CLAT Score:
                    </label>
                    <Field
                      type="text"
                      name="cetMeritPercentageClatScore"
                      id="cetMeritPercentageClatScore"
                      className="education-field"
                      placeholder="Enter CET / Merit Percentage / CLAT Score"
                    />
                    <ErrorMessage
                      name="cetMeritPercentageClatScore"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="applicationId" className="form-label">
                      Application Admission ID/CAP ID/CLAT Admit Card No:
                    </label>
                    <Field
                      type="text"
                      name="applicationId"
                      id="applicationId"
                      className="education-field"
                      placeholder="Enter Application ID/CAP ID/CLAT Admit Card No"
                    />
                    <ErrorMessage
                      name="applicationId"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label htmlFor="yearOfStudy" className="form-label">
                        Year Of Study:
                      </label>
                      <Field
                        type="text"
                        name="yearOfStudy"
                        id="yearOfStudy"
                        className="education-field"
                        placeholder="Enter year of study (e.g First Year, Second Year)"
                      />
                      <ErrorMessage
                        name="yearOfStudy"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="completedOrContinue"
                        className="form-label"
                      >
                        Completed Or Pursuing:
                      </label>
                      <Field
                        as="select"
                        name="completedOrContinue"
                        id="completedOrContinue"
                        className="education-field"
                        placeholder="Select completed or pursuing"
                      >
                        <option value="">Select Option</option>
                        <option value="completed">Completed</option>
                        <option value="pursuing">Pursuing</option>
                      </Field>
                      <ErrorMessage
                        name="completedOrContinue"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label htmlFor="gapYears" className="form-label">
                        Gap Years:
                      </label>
                      <Field
                        type="text"
                        name="gapYears"
                        id="gapYears"
                        className="education-field"
                        placeholder="Enter number of gap years"
                      />
                      <ErrorMessage
                        name="gapYears"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="mode" className="form-label">
                        Mode (Regular/Distance):
                      </label>
                      <Field
                        as="select"
                        name="mode"
                        id="mode"
                        className="education-field"
                        placeholder="Select mode regular or distance"
                      >
                        <option value="">Select Mode</option>
                        <option value="Regular">Regular</option>
                        <option value="Distance">Distance</option>
                      </Field>
                      <ErrorMessage
                        name="mode"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="result" className="form-label">
                      Results (Sem wise with Image):
                    </label>
                    <Field
                      type="file"
                      name="result"
                      id="result"
                      accept=".pdf,.jpg,.jpeg"
                      className="education-field"
                      onChange={(event) =>
                        setFieldValue("result", event.currentTarget.files[0])
                      }
                    />
                    <ErrorMessage
                      name="result"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <FieldArray name="pastQualifications">
                  {(arrayHelpers) => (
                    <fieldset className="fieldset mb-4">
                      <legend className="text-lg font-bold mb-4 text-yellow-400">
                        Past Qualifications
                      </legend>
                      <label className="text-red-500">
                        Fill in the SSC, HSC, and Graduation details.
                      </label>
                      <br />
                      <label className="text-red-500">
                        Click on "Add Qualifications" every time to add
                        qualifications.
                      </label>
                      <br />
                      <br />
                      {values.pastQualifications.map((qualification, index) => (
                        <div key={index} className="qualification-item">
                          <div className="mb-3 row">
                            <div className="col-md-6">
                              <label
                                htmlFor={`qualificationLevel_${index}`}
                                className="form-label"
                              >
                                Qualification Level:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].qualificationLevel`}
                                id={`qualificationLevel_${index}`}
                                className="education-field"
                                placeholder="Qualification level (e.g., Undergraduate, Postgraduate)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].qualificationLevel`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`stream_${index}`}
                                className="form-label"
                              >
                                Stream:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].stream`}
                                id={`stream_${index}`}
                                className="education-field"
                                placeholder="Enter stream (e.g.Computer Science, Engineering)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].stream`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <div className="col-md-4">
                              <label
                                htmlFor={`instituteState_${index}`}
                                className="form-label"
                              >
                                Institute State:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].instituteState`}
                                id={`instituteState_${index}`}
                                className="education-field"
                                placeholder="Enter institute state"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].instituteState`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor={`instituteDistrict_${index}`}
                                className="form-label"
                              >
                                Institute District:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].instituteDistrict`}
                                id={`instituteDistrict_${index}`}
                                className="education-field"
                                placeholder="Enter institute district"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].instituteDistrict`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor={`instituteTaluka_${index}`}
                                className="form-label"
                              >
                                Institute Taluka:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].instituteTaluka`}
                                id={`instituteTaluka_${index}`}
                                className="education-field"
                                placeholder="Enter institute taluka"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].instituteTaluka`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <div className="col-md-6">
                              <label className="form-label">
                                College Name / School Name:
                              </label>
                              <Field
                                name={`pastQualifications[${index}].collegeName`}
                                className="education-field"
                                placeholder="Enter college or school name"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].collegeName`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Course:</label>
                              <Field
                                name={`pastQualifications[${index}].course`}
                                className="education-field"
                                placeholder="Enter course (e.g., Bachelor of Science, Bachelor of Commerce)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].course`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <div className="col-md-6">
                              <label className="form-label">
                                Board/University:
                              </label>
                              <Field
                                name={`pastQualifications[${index}].boardUniversity`}
                                className="education-field"
                                placeholder="Enter board/university (e.g., Maharashtra State Board, Mumbai University)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].boardUniversity`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`mode_${index}`}
                                className="form-label"
                              >
                                Mode (Regular/Distance):
                              </label>
                              <Field
                                as="select"
                                name={`pastQualifications[${index}].mode`}
                                id={`mode_${index}`}
                                className="education-field"
                              >
                                <option value="">Select Mode</option>
                                <option value="Regular">Regular</option>
                                <option value="Distance">Distance</option>
                              </Field>
                              <ErrorMessage
                                name={`pastQualifications[${index}].mode`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <div className="col-md-6">
                              <label
                                htmlFor={`admissionYear_${index}`}
                                className="form-label"
                              >
                                Admission Year:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].admissionYear`}
                                id={`admissionYear_${index}`}
                                className="education-field"
                                placeholder="Enter admission year (YYYY)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].admissionYear`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`passingYear_${index}`}
                                className="form-label"
                              >
                                Passing Year:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].passingYear`}
                                id={`passingYear_${index}`}
                                className="education-field"
                                placeholder="Enter passing year (YYYY)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].passingYear`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="mb-3 row">
                            <div className="col-md-4">
                              <label
                                htmlFor={`result_${index}`}
                                className="form-label"
                              >
                                Result:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].result`}
                                id={`result_${index}`}
                                className="education-field"
                                placeholder="Enter result (Pass / Fail)"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].result`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor={`percentage_${index}`}
                                className="form-label"
                              >
                                Percentage:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].percentage`}
                                id={`percentage_${index}`}
                                className="education-field"
                                placeholder="Enter percentage"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].percentage`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor={`attempts_${index}`}
                                className="form-label"
                              >
                                Attempts:
                              </label>
                              <Field
                                type="text"
                                name={`pastQualifications[${index}].attempts`}
                                id={`attempts_${index}`}
                                className="education-field"
                                placeholder="Enter number of attempts"
                              />
                              <ErrorMessage
                                name={`pastQualifications[${index}].attempts`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor={`marksheet_${index}`}
                              className="form-label"
                            >
                              Upload Marksheet:
                            </label>
                            <Field
                              type="file"
                              name={`pastQualifications[${index}].marksheet`}
                              id={`marksheet_${index}`}
                              accept=".jpg,.jpeg,.pdf"
                              className="education-field"
                            />
                            <ErrorMessage
                              name={`pastQualifications[${index}].marksheet`}
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor={`gap_${index}`}
                              className="form-label"
                            >
                              Was any Gap in this Qualification/Course?
                            </label>
                            <Field
                              as="select"
                              name={`pastQualifications[${index}].gap`}
                              id={`gap_${index}`}
                              className="education-field"
                            >
                              <option value="">Select Option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Field>
                            <ErrorMessage
                              name={`pastQualifications[${index}].gap`}
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded "
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                            }} // Inline styles for background color and text color
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <div className="mb-3">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4 "
                          onClick={() =>
                            arrayHelpers.push({
                              qualificationLevel: "",
                              stream: "",
                              instituteState: "",
                              instituteDistrict: "",
                              instituteTaluka: "",
                              collegeName: "",
                              course: "",
                              boardUniversity: "",
                              mode: "",
                              admissionYear: "",
                              passingYear: "",
                              result: "",
                              percentage: "",
                              attempts: "",
                              marksheet: null,
                              gap: "",
                            })
                          }
                        >
                          Add Qualifications
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                      >
                        {isSubmitting ? "Saved" : "Save"}
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

export default EducationalDetails;
