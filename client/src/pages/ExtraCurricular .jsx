import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import "./styles.css";
import * as Yup from "yup";

function ExtraCurricular({handleFormSubmit}) {
  const [eventCertificate, setEventCertificate] = useState(null);
  const [csDocumentation, setCSDocumentation] = useState(null);
  const [workshopDocumentation, setWorkshopDocumentation] = useState(null);

  const initialValues = {
    clubs: [
      {
        clubName: "",
        positionHeld: "",
        activities: "",
      },
    ],
    events: [
      {
        eventName: "",
        eventType: "",
        otherEventType: "",
        participationLevel: "",
        achievement: "",
        yearParticipated: "",
        eventCertificate: null,
      },
    ],
    communityService: [
      {
        activityName: "",
        organization: "",
        description: "",
        duration: { from: "", to: "" },
        impact: "",
        csDocumentation: null,
      },
    ],
    workshops: [
      {
        title: "",
        organizer: "",
        description: "",
        dates: { from: "", to: "" },
        skills: "",
        workshopDocumentation: null,
      },
    ],
  };

  const validationSchema = Yup.object().shape({});

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {

    handleFormSubmit();

    
    try {
      const updatedEvents = values.events.map((event, index) => {
        if (values.events[index].eventCertificate) {
          const eventCertificateUrl = URL.createObjectURL(
            values.events[index].eventCertificate
          );
          return { ...event, eventCertificate: eventCertificateUrl };
        }
        return event;
      });
      const updatedCommunityService = values.communityService.map(
        (activity, index) => {
          if (values.communityService[index].csDocumentation) {
            const csDocumentationUrl = URL.createObjectURL(
              values.communityService[index].csDocumentation
            );
            return { ...activity, csDocumentation: csDocumentationUrl };
          }
          return activity;
        }
      );
      const updatedWorkshop = values.workshops.map((workshop, index) => {
        if (values.workshops[index].workshopDocumentation) {
          const workshopDocumentationUrl = URL.createObjectURL(
            values.workshops[index].workshopDocumentation
          );
          return {
            ...workshop,
            workshopDocumentation: workshopDocumentationUrl,
          };
        }
        return workshop;
      });

      const combinedData = {
        clubs: values.clubs,
        events: updatedEvents,
        communityService: updatedCommunityService,
        workshop: updatedWorkshop,
      };

      // Update the context with all combined data
      console.log("Curricular Details:", values);
      setClubData(combinedData.clubs);
      setEventData(combinedData.events);
      setEventCertificate(null);
      setCommunityServiceData(combinedData.communityService);
      setCSDocumentation(null);
      setWorkshopData(combinedData.workshop);
      setWorkshopDocumentation(null);

      // Pass all combined data in the navigation state
      navigate("/add-AchievementDetails", { state: { combinedData } });
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
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <legend className="text-2xl font-bold mb-6 text-red-400">
                  Curricular & Co-curricular Details
                </legend>
                <FieldArray name="clubs">
                  {(arrayHelpers) => (
                    <fieldset className="mb-6">
                      <legend className="text-lg font-bold mb-4 text-red-400">
                        Section 1: Clubs & Committees:
                      </legend>
                      {values.clubs.map((club, index) => (
                        <div key={index} className="mb-6">
                          <div className="mb-4">
                            <label
                              htmlFor={`clubs.${index}.clubName`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Club/Committee Name:
                            </label>
                            <Field
                              type="text"
                              name={`clubs.${index}.clubName`}
                              placeholder="Club/Committee Name"
                              className="curricular-field"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor={`clubs.${index}.positionHeld`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Position Held:
                            </label>
                            <Field
                              type="text"
                              name={`clubs.${index}.positionHeld`}
                              placeholder="Position Held"
                              className="curricular-field"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor={`clubs.${index}.activities`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Activities/Contributions:
                            </label>
                            <Field
                              type="text"
                              name={`clubs.${index}.activities`}
                              placeholder="Activities/Contributions"
                              className="curricular-field"
                            />
                          </div>

                          <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        onClick={() =>
                          arrayHelpers.push({
                            clubName: "",
                            positionHeld: "",
                            activities: "",
                          })
                        }
                      >
                        Add Club/Committee
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
                <FieldArray name="events">
                  {(arrayHelpers) => (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-4 text-red-400">
                        Section 2: Events & Competitions
                      </h2>
                      {values.events.map((event, index) => (
                        <div key={index} className="mb-6">
                          <div className="mb-4">
                            <label
                              htmlFor={`events.${index}.eventName`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Event Name:
                            </label>
                            <Field
                              type="text"
                              name={`events.${index}.eventName`}
                              placeholder="Event Name"
                              className="curricular-field"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`events.${index}.eventType`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Event Type:
                            </label>
                            <Field
                              as="select"
                              name={`events.${index}.eventType`}
                              className="curricular-field"
                            >
                              <option value="Debate">Debate</option>
                              <option value="Sports">Sports</option>
                              <option value="Arts">Arts</option>
                              <option value="Music">Music</option>
                              <option value="Drama">Drama</option>
                              <option value="Science Fair">Science Fair</option>
                              <option value="Quiz Competition">
                                Quiz Competition
                              </option>
                              <option value="Cultural Event">
                                Cultural Event
                              </option>
                              <option value="Hackathon">Hackathon</option>
                              <option value="Robotics Competition">
                                Robotics Competition
                              </option>
                              <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage
                              name={`events.${index}.eventType`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                            {event.eventType === "Other" && (
                              <div className="mt-4">
                                <label
                                  htmlFor={`events.${index}.otherEventType`}
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                  Other Event Type:
                                </label>
                                <Field
                                  type="text"
                                  name={`events.${index}.otherEventType`}
                                  placeholder="Specify other event type"
                                  className="curricular-field"
                                />
                                <ErrorMessage
                                  name={`events.${index}.otherEventType`}
                                  component="div"
                                  className="text-red-400 text-sm mt-1"
                                />
                              </div>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`events.${index}.participationLevel`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Level of Participation:
                            </label>
                            <Field
                              as="select"
                              name={`events.${index}.participationLevel`}
                              className="curricular-field"
                            >
                              <option value="Intra-School/College">
                                Intra-School/College
                              </option>
                              <option value="Inter-School/College">
                                Inter-School/College
                              </option>
                              <option value="District">District</option>
                              <option value="Zonal">Zonal</option>
                              <option value="State">State</option>
                              <option value="National">National</option>
                              <option value="International">
                                International
                              </option>
                            </Field>
                            <ErrorMessage
                              name={`events.${index}.participationLevel`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`events.${index}.achievement`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Achievement:
                            </label>
                            <Field
                              type="text"
                              name={`events.${index}.achievement`}
                              placeholder="Achievement"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`events.${index}.achievement`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`events.${index}.yearParticipated`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Year Participated:
                            </label>
                            <Field
                              type="text"
                              name={`events.${index}.yearParticipated`}
                              placeholder="Year Participated"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`events.${index}.yearParticipated`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`events.${index}.eventCertificate`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Upload Certificate:
                            </label>
                            <input
                              type="file"
                              id={`events.${index}.eventCertificate`}
                              name={`events.${index}.eventCertificate`}
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => {
                                const eventCertificate =
                                  e.currentTarget.files[0];
                                setFieldValue(
                                  `events.${index}.eventCertificate`,
                                  eventCertificate
                                );
                              }}
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`events.${index}.eventCertificate`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                            {event.eventCertificate && (
                              <img
                                src={URL.createObjectURL(
                                  event.eventCertificate
                                )}
                                alt="Uploaded"
                                className="mt-4 max-w-xs max-h-48"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
                        onClick={() =>
                          arrayHelpers.push({
                            eventName: "",
                            eventType: "",
                            otherEventType: "",
                            participationLevel: "",
                            achievement: "",
                            yearParticipated: "",
                            eventCertificate: null,
                          })
                        }
                      >
                        Add Event
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <FieldArray name="communityService">
                  {(arrayHelpers) => (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-4 text-red-400">
                        Section 3: Community Service and Volunteering
                      </h2>
                      {values.communityService.map((activity, index) => (
                        <div key={index} className="mb-6">
                          <div className="mb-4">
                            <label
                              htmlFor={`communityService.${index}.activityName`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Activity Name:
                            </label>
                            <Field
                              type="text"
                              name={`communityService.${index}.activityName`}
                              placeholder="Activity Name"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.activityName`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`communityService.${index}.organization`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Organization/Group Involved:
                            </label>
                            <Field
                              type="text"
                              name={`communityService.${index}.organization`}
                              placeholder="Organization/Group Involved"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.organization`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`communityService.${index}.description`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Description of Activity:
                            </label>
                            <Field
                              as="textarea"
                              name={`communityService.${index}.description`}
                              placeholder="Description of Activity"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.description`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`communityService.${index}.duration.from`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Duration of Participation (From - To):
                            </label>
                            <Field
                              type="date"
                              name={`communityService.${index}.duration.from`}
                              placeholder="Start Date"
                              className="curricular-field"
                            />
                            <Field
                              type="date"
                              name={`communityService.${index}.duration.to`}
                              placeholder="End Date"
                              className="curricular-field w-full px-3 py-2 border rounded-lg mt-2"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.duration.from`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.duration.to`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`communityService.${index}.impact`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Impact or Contribution:
                            </label>
                            <Field
                              as="textarea"
                              name={`communityService.${index}.impact`}
                              placeholder="Impact or Contribution"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.impact`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`communityService.${index}.csDocumentation`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Upload Documentation:
                            </label>
                            <input
                              type="file"
                              id={`communityService.${index}.csDocumentation`}
                              name={`communityService.${index}.csDocumentation`}
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => {
                                const csDocumentation =
                                  e.currentTarget.files[0];
                                setFieldValue(
                                  `communityService.${index}.csDocumentation`,
                                  csDocumentation
                                );
                              }}
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`communityService.${index}.csDocumentation`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                            {activity.csDocumentation && (
                              <img
                                src={URL.createObjectURL(
                                  activity.csDocumentation
                                )}
                                alt="Uploaded"
                                className="mt-4 max-w-xs max-h-48"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            activityName: "",
                            organization: "",
                            description: "",
                            startDate: "",
                            endDate: "",
                            impact: "",
                            yearParticipated: "",
                            csDocumentation: null,
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
                      >
                        Add Community Service
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
              <div className="card-body">
                <FieldArray name="workshops">
                  {(arrayHelpers) => (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-4 text-red-400">
                        Section 4: Workshop & Training Details
                      </h2>
                      {values.workshops.map((workshop, index) => (
                        <div key={index} className="mb-6">
                          <div className="mb-4">
                            <label
                              htmlFor={`workshops.${index}.title`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Workshop/Training Program Title:
                            </label>
                            <Field
                              type="text"
                              name={`workshops.${index}.title`}
                              placeholder="Workshop/Training Program Title"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.title`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`workshops.${index}.organizer`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Organizer/Host:
                            </label>
                            <Field
                              type="text"
                              name={`workshops.${index}.organizer`}
                              placeholder="Organizer/Host"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.organizer`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`workshops.${index}.description`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Description:
                            </label>
                            <Field
                              as="textarea"
                              name={`workshops.${index}.description`}
                              placeholder="Description"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.description`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`workshops.${index}.dates.from`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Date(s) of Participation:
                            </label>
                            <Field
                              type="date"
                              name={`workshops.${index}.dates.from`}
                              placeholder="Start Date"
                              className="curricular-field"
                            />
                            <Field
                              type="date"
                              name={`workshops.${index}.dates.to`}
                              placeholder="End Date"
                              className="curricular-field w-full px-3 py-2 border rounded-lg mt-2"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.dates.from`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.dates.to`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`workshops.${index}.skillsGained`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Skills/Knowledge Gained:
                            </label>
                            <Field
                              as="textarea"
                              name={`workshops.${index}.skillsGained`}
                              placeholder="Skills/Knowledge Gained"
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.skillsGained`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`workshops.${index}.workshopDocumentation`}
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Upload Documentation:
                            </label>
                            <input
                              type="file"
                              id={`workshops.${index}.workshopDocumentation`}
                              name={`workshops.${index}.workshopDocumentation`}
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => {
                                const workshopDocumentation =
                                  e.currentTarget.files[0];
                                setFieldValue(
                                  `workshops.${index}.workshopDocumentation`,
                                  workshopDocumentation
                                );
                              }}
                              className="curricular-field"
                            />
                            <ErrorMessage
                              name={`workshops.${index}.workshopDocumentation`}
                              component="div"
                              className="text-red-400 text-sm mt-1"
                            />
                            {workshop.workshopDocumentation && (
                              <img
                                src={URL.createObjectURL(
                                  workshop.workshopDocumentation
                                )}
                                alt="Uploaded"
                                className="mt-4 max-w-xs max-h-48"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            title: "",
                            organizer: "",
                            description: "",
                            dates: { from: "", to: "" },
                            skillsGained: "",
                            workshopDocumentation: null,
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 "
                      >
                        Add Workshop/Training Program
                      </button>
                    </div>
                  )}
                </FieldArray>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 "
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ExtraCurricular;
