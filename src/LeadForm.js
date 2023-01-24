import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import intlTelInput from 'intl-tel-input';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const LeadForm = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const [iti, setIti] = React.useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmTerm = urlParams.get('utm_term');

    localStorage.setItem('utmSource', utmSource);
    localStorage.setItem('utmMedium', utmMedium);
    localStorage.setItem('utmTerm', utmTerm);

    const phoneInput = document.querySelector("#phone");
    const iti = intlTelInput(phoneInput, {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
    });
    setIti(iti);
  }, []);

  return (
    <Formik
      initialValues={{
        fullname: '',
        email: '',
        phone: ''
      }}
      validate={values => {
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
          errors.phone = 'Phone number is required'
        } else if (!iti.isValidNumber()) {
          errors.phone = 'Invalid phone number';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          navigate('/thank-you');
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label>
            Full Name:
            <Field type="text" name="fullname" id='fullname' placeholder="Full Name" />
          </label>
          <br />
          <label>
            Email:
            <Field type="email" name="email" id='email' placeholder="Email" />
          </label>
          <br />
          <label>
            Phone:
            <Field type="tel" name="phone" id='phone' placeholder="Phone" />
          </label>
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LeadForm;