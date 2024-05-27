import React, { useEffect ,useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../styles/styles.css";
import * as Yup from "yup";

const PersonalDetails = ({ handleFormSubmit }) => {
  const initialValues = {
    studentName: "",
    photoGraph: "",
    dob: "",
    gender: "",
    phoneNo: "",
    bloodGroup: "",
    email1: "",
    email2: "",
    tempAddress: "",
    sameAsTempAddress: false,
    permAddress: "",
    state: "",
    district: "",
    pincode: "",
    nationality: "",
    religion: "",
  };

  const [buttonText, setButtonText] = useState('Save');
  
  const validationSchema = Yup.object({});

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Values:", values);

    // Call the handleFormSubmit prop to update the form completion status
    handleFormSubmit();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="mx-auto max-w-lg">
          {/* Personal Details */}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl text-lime-500 font-bold mb-4">
              Personal Details
            </h2>

            <fieldset className="mb-4">
              <legend className="text-xl text-lime-500 font-bold mb-2">
                Student Details
              </legend>

              <div className="mb-4">
                <label
                  htmlFor="studentName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name of the Student:
                </label>
                <Field
                  type="text"
                  id="studentName"
                  name="studentName"
                  placeholder="Enter Student's Name"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="photoGraph"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  PhotoGraph:
                </label>
                <Field
                  type="file"
                  name="photoGraph"
                  id="photoGraph"
                  accept=".pdf,.jpg,.jpeg"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Date of Birth:
                </label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder="Select Date of Birth"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Gender:
                </label>
                <div id="gender-radio-buttons" className="flex space-x-4">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      className="form-radio"
                    />
                    <label htmlFor="male" className="ml-2">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      className="form-radio"
                    />
                    <label htmlFor="female" className="ml-2">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="other"
                      name="gender"
                      value="Other"
                      className="form-radio"
                    />
                    <label htmlFor="other" className="ml-2">
                      Other
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone Number:
                </label>
                <Field
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter Phone Number"
                  autoComplete="off"
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bloodGroup"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Blood Group:
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  placeholder="Select Blood Group"
                  className="input-field"
                >
                  <option value="">-Select Blood Group-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email1"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Personal Email:
                </label>
                <Field
                  type="email"
                  id="email1"
                  name="email1"
                  placeholder="Enter Personal Email"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email2"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Official Email:
                </label>
                <Field
                  type="email"
                  id="email2"
                  name="email2"
                  placeholder="Enter Official Email"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tempAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Permanent Address:
                </label>
                <Field
                  type="text"
                  id="tempAddress"
                  name="tempAddress"
                  placeholder="Enter Permanent Address"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="sameAsTempAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Is Correspondence Address Same as Permanent Address
                </label>
                <Field
                  type="checkbox"
                  id="sameAsTempAddress"
                  name="sameAsTempAddress"
                  onChange={(event) =>
                    handleCheckboxChange(event, setFieldValue, values)
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="permAddress"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Correspondence Address:
                </label>
                <Field
                  type="text"
                  id="permAddress"
                  name="permAddress"
                  placeholder="Enter Correspondence Address"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  State:
                </label>
                <select
                  id="state"
                  name="state"
                  placeholder="Select State"
                  className="input-field"
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="district"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  District:
                </label>
                <Field
                  type="text"
                  id="district"
                  name="district"
                  placeholder="Enter District"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Pincode:
                </label>
                <Field
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter Pincode"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nationality"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nationality:
                </label>
                <Field
                  type="text"
                  id="nationality"
                  name="nationality"
                  placeholder="Enter Nationality"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="religion"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Religion:
                </label>
                <Field
                  type="text"
                  id="religion"
                  name="religion"
                  placeholder="Enter Religion"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              {/* Add other form fields similarly */}
            </fieldset>
          </div>

          {/* Family Details */}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <fieldset className="mb-4">
              <legend className="text-xl font-bold mb-2 text-lime-500">
                Family Details
              </legend>

              <div className="mb-4">
                <label
                  htmlFor="fatherName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Father Name:
                </label>
                <Field
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  placeholder="Enter Father's Name"
                  autoComplete="off"
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fatherPhone"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Father Phone:
                </label>
                <Field
                  type="text"
                  id="fatherPhone"
                  name="fatherPhone"
                  placeholder="Enter Father's Phone"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fatherEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Father Email:
                </label>
                <Field
                  type="email"
                  id="fatherEmail"
                  name="fatherEmail"
                  placeholder="Enter Father's Email"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fatherOccupation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Father Occupation:
                </label>
                <Field
                  type="text"
                  id="fatherOccupation"
                  name="fatherOccupation"
                  placeholder="Enter Father's Occupation"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="motherName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mother Name:
                </label>
                <Field
                  type="text"
                  id="motherName"
                  name="motherName"
                  placeholder="Enter Mother's Name"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="motherPhone"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mother Phone:
                </label>
                <Field
                  type="text"
                  id="motherPhone"
                  name="motherPhone"
                  placeholder="Enter Mother's Phone"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="motherEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mother Email:
                </label>
                <Field
                  type="email"
                  id="motherEmail"
                  name="motherEmail"
                  placeholder="Enter Mother's Email"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="motherOccupation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Mother Occupation:
                </label>
                <Field
                  type="text"
                  id="motherOccupation"
                  name="motherOccupation"
                  placeholder="Enter Mother's Occupation"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="siblingName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Sibling Name:
                </label>
                <Field
                  type="text"
                  id="siblingName"
                  name="siblingName"
                  placeholder="Enter Sibling's Name"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="siblingPhone"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Sibling Phone:
                </label>
                <Field
                  type="text"
                  id="siblingPhone"
                  name="siblingPhone"
                  placeholder="Enter Sibling's Phone"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="siblingEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Sibling Email:
                </label>
                <Field
                  type="email"
                  id="siblingEmail"
                  name="siblingEmail"
                  placeholder="Enter Sibling's Email"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="siblingOccupation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Sibling Occupation:
                </label>
                <Field
                  type="text"
                  id="siblingOccupation"
                  name="siblingOccupation"
                  placeholder="Enter Sibling's Occupation"
                  autoComplete="off"
                  className="input-field"
                />
              </div>

              {/* Add other form fields similarly */}
            </fieldset>

            <button
              type="submit"
              onClick={() => setButtonText('Saved')}
              className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
            >
                {buttonText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetails;
