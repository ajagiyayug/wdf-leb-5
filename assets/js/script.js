document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // Form Validation & Real-Time Listeners
  // ==========================================
  const form = document.getElementById('register-form');

  if (form) {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const course = document.getElementById('course');
    const year = document.getElementById('year');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Error Display Helpers
    function showError(input, errorId) {
      const errElem = document.getElementById(errorId);
      if (errElem) errElem.style.display = 'block';
      if (input) input.classList.add('is-invalid');
    }

    function hideError(input, errorId) {
      const errElem = document.getElementById(errorId);
      if (errElem) errElem.style.display = 'none';
      if (input) input.classList.remove('is-invalid');
    }

    // Validation Regex Rules
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // ==========================================
    // Real-Time Validation Listeners
    // ==========================================
    if (fullName) {
      fullName.addEventListener('input', () => {
        if (nameRegex.test(fullName.value.trim())) hideError(fullName, 'nameError');
      });
    }

    if (email) {
      email.addEventListener('input', () => {
        if (emailRegex.test(email.value.trim())) hideError(email, 'emailError');
      });
    }

    if (mobile) {
      mobile.addEventListener('input', () => {
        if (mobileRegex.test(mobile.value.trim())) hideError(mobile, 'mobileError');
      });
    }

    if (course) {
      course.addEventListener('change', () => {
        if (course.value !== '') hideError(course, 'courseError');
      });
    }

    if (year) {
      year.addEventListener('change', () => {
        if (year.value !== '') hideError(year, 'yearError');
      });
    }

    if (password) {
      password.addEventListener('input', () => {
        if (passwordRegex.test(password.value)) hideError(password, 'passwordError');
        if (confirmPassword.value && confirmPassword.value === password.value) {
          hideError(confirmPassword, 'confirmPasswordError');
        }
      });
    }

    if (confirmPassword) {
      confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== '' && confirmPassword.value === password.value) {
          hideError(confirmPassword, 'confirmPasswordError');
        }
      });
    }

    if (terms) {
      terms.addEventListener('change', () => {
        if (terms.checked) hideError(terms, 'termsError');
      });
    }

    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        hideError(null, 'genderError');
      });
    });

    // Live Password Strength Indicator
    if (password && strengthBar && strengthText) {
      password.addEventListener('input', () => {
        const val = password.value;
        let strength = 0;

        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;

        switch (strength) {
          case 0:
          case 1:
            strengthBar.style.width = '25%';
            strengthBar.style.backgroundColor = 'red';
            strengthText.innerText = 'Weak';
            break;
          case 2:
          case 3:
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = 'orange';
            strengthText.innerText = 'Medium';
            break;
          case 4:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = 'green';
            strengthText.innerText = 'Strong';
            break;
        }
      });
    }

    // Submit Validation
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // 1. Full Name
      if (!nameRegex.test(fullName.value.trim())) {
        showError(fullName, 'nameError');
        isValid = false;
      } else {
        hideError(fullName, 'nameError');
      }

      // 2. Email Address
      if (!emailRegex.test(email.value.trim())) {
        showError(email, 'emailError');
        isValid = false;
      } else {
        hideError(email, 'emailError');
      }

      // 3. Mobile Number
      if (!mobileRegex.test(mobile.value.trim())) {
        showError(mobile, 'mobileError');
        isValid = false;
      } else {
        hideError(mobile, 'mobileError');
      }

      // 4. Gender Selection
      const selectedGender = document.querySelector('input[name="gender"]:checked');
      if (!selectedGender) {
        showError(null, 'genderError');
        isValid = false;
      } else {
        hideError(null, 'genderError');
      }

      // 5. Course Dropdown
      if (course.value === '') {
        showError(course, 'courseError');
        isValid = false;
      } else {
        hideError(course, 'courseError');
      }

      // 6. Year Dropdown
      if (year.value === '') {
        showError(year, 'yearError');
        isValid = false;
      } else {
        hideError(year, 'yearError');
      }

      // 7. Password
      if (!passwordRegex.test(password.value)) {
        showError(password, 'passwordError');
        isValid = false;
      } else {
        hideError(password, 'passwordError');
      }

      // 8. Confirm Password
      if (confirmPassword.value === '' || confirmPassword.value !== password.value) {
        showError(confirmPassword, 'confirmPasswordError');
        isValid = false;
      } else {
        hideError(confirmPassword, 'confirmPasswordError');
      }

      // 9. Terms Acceptance
      if (!terms.checked) {
        showError(terms, 'termsError');
        isValid = false;
      } else {
        hideError(terms, 'termsError');
      }

      // Final Success
      if (isValid) {
        alert('Form Submitted successfully!');
        form.reset();
        if (strengthBar) strengthBar.style.width = '0%';
        if (strengthText) strengthText.innerText = '';
      }
    });
  }
});