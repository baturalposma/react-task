import React, { useEffect } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import intlTelInput from 'intl-tel-input';
import { useNavigate } from 'react-router-dom'

const LeadForm = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmTerm = urlParams.get('utm_term');

    localStorage.setItem('utmSource', utmSource);
    localStorage.setItem('utmMedium', utmMedium);
    localStorage.setItem('utmTerm', utmTerm);
  }, []);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: ''
    },
    validate: values => {
      const errors = {};
      if (!values.fullname) {
        errors.fullname = 'Full name is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.phone) {
        errors.phone = 'Phone number is required';
      } else if (!intlTelInput.validate(values.phone)) {
        errors.phone = 'Invalid phone number';
      }
      return errors;
    },
    
    onSubmit: (values, { setSubmitting }) => {
      // Add logic to submit the form
      // and navigate to the thank you page
      setTimeout(() => {
        setSubmitting(false);
        navigate('/thank-you')
      }, 2000);
    }
  });

  return (
    <Formik {...formik}>
      <Form>
        <div>
          <Field name="fullname" placeholder="Full Name" />
          {formik.errors.fullname && formik.touched.fullname && (
            <div>{formik.errors.fullname}</div>
          )}
        </div>
        <div>
          <Field name="email" placeholder="Email" type="email" />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <Field name="phone" placeholder="Phone" type="tel" />
          {formik.errors.phone && formik.touched.phone && (
            <div>{formik.errors.phone}</div>
          )}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default LeadForm;
