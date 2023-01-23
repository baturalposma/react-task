import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const LeadForm = () => {
const navigate = useNavigate();
  let history = navigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    axios.post('/api/submit-form', formData)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

    history.push("/thank-you");
  };

  return (
    <div className="app">
        <Formik
            initialValues={{ fullName: '', email: '', phoneNumber: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                <Field type="text" name="fullName" placeholder="Full Name" />
                <Field type="email" name="email" placeholder="Email Address" />
                <Field type="tel" name="phoneNumber" placeholder="Phone Number" />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
        </Formik>
    </div>
  );
};

export default LeadForm;