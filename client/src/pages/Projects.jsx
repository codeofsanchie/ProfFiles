import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
// import "./styles.css";

function Project({handleFormSubmit}) {
  const [projectCertificate, setProjectCertificate] = useState(null);

  const initialValues = {
    projects: [
      {
        projectTitle: "",
        projectCategory: "software",
        otherCategory: "",
        githubRepoURL: "",
        technologiesUsed: "programming_languages",
        otherTechnologies: "",
        startDate: "",
        endDate: "",
        teamMembers: "",
        projectGoals: "",
        challengesFaced: "",
        license: "",
        references: "",
        projectCertificate: null,
      },
    ],
  };

  const validationSchema = Yup.object().shape({});

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {

    handleFormSubmit();


    try {
      const updatedProject = values.projects.map((project, index) => {
        if (values.projects[index].projectCertificate) {
          const projectCertificateUrl = URL.createObjectURL(
            values.projects[index].projectCertificate
          );
          return { ...project, projectCertificate: projectCertificateUrl };
        }
        return project;
      });

        } catch (error) {
      console.error("Form submission failed", error);
      setSubmitting(false);
      setErrors({ submit: "Form submission failed" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <FieldArray name="projects">
                  {({ remove, push }) => (
                    <div className="space-y-4">
                      <fieldset className="p-4 rounded">
                        <legend className="font-bold text-purple-600 text-2xl ">
                          Project Details
                        </legend>
                        {values.projects &&
                          values.projects.length > 0 &&
                          values.projects.map((project, index) => (
                            <div key={index} className="space-y-4">
                              <h5 className="font-bold text-purple-500">
                                Project {index + 1}
                              </h5>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.projectTitle`}
                                  className="text-sm font-semibold"
                                >
                                  Project Title :
                                </label>
                                <Field
                                  type="text"
                                  name={`projects.${index}.projectTitle`}
                                  placeholder="Project Title"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.projectDescription`}
                                  className="text-sm font-semibold"
                                >
                                  Project Description:
                                </label>
                                <Field
                                  as="textarea"
                                  name={`projects.${index}.projectDescription`}
                                  placeholder="Provide a brief overview of the project"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.projectCategory`}
                                  className="text-sm font-semibold"
                                >
                                  Project Category:
                                </label>
                                <Field
                                  as="select"
                                  name={`projects.${index}.projectCategory`}
                                  className="project-field"
                                >
                                  <option value="software">Software</option>
                                  <option value="ai">AI</option>
                                  <option value="ml">ML</option>
                                  <option value="iot">IoT</option>
                                  <option value="other">Other</option>
                                </Field>
                              </div>
                              {values.projects[index].projectCategory ===
                                "other" && (
                                <div className="flex flex-col">
                                  <label
                                    htmlFor={`projects.${index}.otherCategory`}
                                    className="text-sm font-semibold"
                                  >
                                    Other Category:
                                  </label>
                                  <Field
                                    type="text"
                                    name={`projects.${index}.otherCategory`}
                                    placeholder="Specify other category"
                                    className="project-field"
                                  />
                                </div>
                              )}
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.githubRepoURL`}
                                  className="text-sm font-semibold"
                                >
                                  GitHub Repository URL:
                                </label>
                                <Field
                                  type="url"
                                  name={`projects.${index}.githubRepoURL`}
                                  placeholder="E.g. https://github.com/username/repo"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.technologiesUsed`}
                                  className="text-sm font-semibold"
                                >
                                  Technologies Used:
                                </label>
                                <Field
                                  as="select"
                                  name={`projects.${index}.technologiesUsed`}
                                  className="project-field"
                                >
                                  <option value="programming_languages">
                                    Programming Languages
                                  </option>
                                  <option value="frameworks">Frameworks</option>
                                  <option value="tools">Tools</option>
                                  <option value="other">Other</option>
                                </Field>
                              </div>
                              {values.projects[index].technologiesUsed ===
                                "other" && (
                                <div className="flex flex-col">
                                  <label
                                    htmlFor={`projects.${index}.otherTechnologies`}
                                    className="text-sm font-semibold"
                                  >
                                    Other Technologies:
                                  </label>
                                  <Field
                                    type="text"
                                    name={`projects.${index}.otherTechnologies`}
                                    placeholder="Specify other technologies"
                                    className="project-field"
                                  />
                                </div>
                              )}

                              <div className="flex gap-4">
                                <div className="flex flex-col">
                                  <label
                                    htmlFor={`projects.${index}.startDate`}
                                    className="text-sm font-semibold"
                                  >
                                    Start Date:
                                  </label>
                                  <Field
                                    type="date"
                                    name={`projects.${index}.startDate`}
                                    className="project-field"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label
                                    htmlFor={`projects.${index}.endDate`}
                                    className="text-sm font-semibold"
                                  >
                                    End Date:
                                  </label>
                                  <Field
                                    type="date"
                                    name={`projects.${index}.endDate`}
                                    className="project-field"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.teamMembers`}
                                  className="text-sm font-semibold"
                                >
                                  Project Team:
                                </label>
                                <Field
                                  as="textarea"
                                  name={`projects.${index}.teamMembers`}
                                  placeholder="List the team members involved in the project"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.projectGoals`}
                                  className="text-sm font-semibold"
                                >
                                  Project Goals and Objectives:
                                </label>
                                <Field
                                  as="textarea"
                                  name={`projects.${index}.projectGoals`}
                                  placeholder="Describe the goals and objectives of the project"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.challengesFaced`}
                                  className="text-sm font-semibold"
                                >
                                  Challenges Faced:
                                </label>
                                <Field
                                  as="textarea"
                                  name={`projects.${index}.challengesFaced`}
                                  placeholder="Describe any challenges faced during the project"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.license`}
                                  className="text-sm font-semibold"
                                >
                                  License:
                                </label>
                                <Field
                                  type="text"
                                  name={`projects.${index}.license`}
                                  placeholder="Specify the license (e.g. MIT, GPL)"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.references`}
                                  className="text-sm font-semibold"
                                >
                                  References or Citations:
                                </label>
                                <Field
                                  as="textarea"
                                  name={`projects.${index}.references`}
                                  placeholder="List any references or citations used"
                                  className="project-field"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`projects.${index}.projectCertificate`}
                                  className="text-sm font-semibold"
                                >
                                  Project Certificate (If any):{" "}
                                </label>
                                <project
                                  type="file"
                                  id={`projects.${index}.projectCertificate`}
                                  name={`projects.${index}.projectCertificate`}
                                  accept=".jpg,.jpeg,.pdf"
                                  onChange={(e) => {
                                    const projectCertificate =
                                      e.currentTarget.files[0];
                                    setFieldValue(
                                      `projects.${index}.projectCertificate`,
                                      projectCertificate
                                    );
                                  }}
                                  className="project-field-small"
                                />
                                {projectCertificate && (
                                  <img
                                    src={projectCertificate}
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
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Remove Project
                              </button>
                            </div>
                          ))}
                        <br />
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              projectTitle: "",
                              projectDescription: "",
                              projectCategory: "software",
                              otherCategory: "",
                              githubRepoURL: "",
                              technologiesUsed: "programming_languages",
                              otherTechnologies: "",
                              startDate: "",
                              endDate: "",
                              teamMembers: "",
                              projectGoals: "",
                              challengesFaced: "",
                              license: "",
                              references: "",
                              projectCertificate: null,
                            })
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Add Project
                        </button>
                        <br />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Save
                        </button>
                      </fieldset>
                    </div>
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

export default Project;
