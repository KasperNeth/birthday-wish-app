document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscription-form');
    const successPopup = document.getElementById('success-popup');
    const overlay = document.getElementById('overlay');
    const closePopupBtn = document.getElementById('close-popup');
    const successMessage = document.getElementById('success-message');
  
    // Error message elements
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const dobError = document.getElementById('dob-error');
    const generalError = document.getElementById('general-error');
    const generalErrorContainer = document.querySelector('.general-error-container');
  
    // Input elements
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dateOfBirth');
    
    // Constants
    const ERROR_DISPLAY_DURATION = 5000; // 5 seconds for error messages
    
    // Validation functions
    const validateUsername = (username) => {
        if (!username) {
            showError(usernameInput, usernameError, 'Username is required');
            return false;
        } else if (username.length < 5) {
            showError(usernameInput, usernameError, 'Username must be at least 5 characters long');
            return false;
        }
        clearError(usernameInput, usernameError);
        return true;
    };
  
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    };
  
    const validateDateOfBirth = (dob) => {
        if (!dob) {
            showError(dobInput, dobError, 'Date of birth is required');
            return false;
        }
        
        const dobDate = new Date(dob);
        const today = new Date();
        
        if (isNaN(dobDate.getTime())) {
            showError(dobInput, dobError, 'Please enter a valid date');
            return false;
        } else if (dobDate > today) {
            showError(dobInput, dobError, 'Date of birth must be in the past');
            return false;
        }
        
        clearError(dobInput, dobError);
        return true;
    };
  
    // Helper functions for showing/clearing errors with auto-clear timer
    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
        
        // Auto-clear the error after set duration
        setTimeout(() => {
            clearError(inputElement, errorElement);
        }, ERROR_DISPLAY_DURATION);
    };
  
    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    };
  
    const showGeneralError = (message) => {
        generalError.textContent = message;
        generalError.classList.add('visible');
        generalErrorContainer.classList.add('visible');
        
        // Scroll to the top of the form to see the error
        form.scrollIntoView({ behavior: 'smooth' });
        
        // Auto-clear general error after set duration
        setTimeout(() => {
            generalError.textContent = '';
            generalError.classList.remove('visible');
            generalErrorContainer.classList.remove('visible');
        }, ERROR_DISPLAY_DURATION);
    };
  
    const clearAllErrors = () => {
        clearError(usernameInput, usernameError);
        clearError(emailInput, emailError);
        clearError(dobInput, dobError);
        generalError.textContent = '';
        generalError.classList.remove('visible');
        generalErrorContainer.classList.remove('visible');
    };
  
    // Format date to DD-MM-YYYY as required by the backend
    const formatDate = (date) => {
        // Create a new date object from the input date string
        const d = new Date(date);
        
        // Check if the date is valid
        if (isNaN(d.getTime())) {
            console.error('Invalid date input:', date);
            return null;
        }
        
        // Format to DD-MM-YYYY
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = d.getFullYear();
        
        return `${day}-${month}-${year}`;
    };
  
    // Add input event listeners for real-time validation
    usernameInput.addEventListener('input', () => validateUsername(usernameInput.value));
    emailInput.addEventListener('input', () => validateEmail(emailInput.value));
    dobInput.addEventListener('input', () => validateDateOfBirth(dobInput.value));
  
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const dateOfBirth = dobInput.value;
        
        // Validate all fields
        const isUsernameValid = validateUsername(username);
        const isEmailValid = validateEmail(email);
        const isDobValid = validateDateOfBirth(dateOfBirth);
        
        if (!isUsernameValid || !isEmailValid || !isDobValid) {
            showGeneralError('Please correct the errors in the form');
            return;
        }
        
        try {
            // Format the date to DD-MM-YYYY as required by backend
            const formattedDob = formatDate(dateOfBirth);
            
            // Check if date formatting was successful
            if (!formattedDob) {
                showError(dobInput, dobError, 'Invalid date format');
                return;
            }
            
            console.log('Sending data with formatted date:', formattedDob);
            
            const response = await fetch('http://localhost:8080/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    dateOfBirth: formattedDob
                })
            });
            
            const rawResponse = await response.text();
            console.log('Raw server response:', rawResponse);
            
            let responseData;
            try {
                responseData = JSON.parse(rawResponse);
                console.log('Parsed response data:', responseData);
            } catch (e) {
                console.error('Failed to parse JSON response:', e);
                showGeneralError('Received invalid JSON response from server');
                return;
            }
            
            if (response.ok) {
                // Extract the success message, handling potential nested structure
                const result = responseData.serviceResponse || responseData;
                const successMsg = result.data || 'Subscription successful!';
                
                // Show success popup
                successMessage.textContent = successMsg;
                successPopup.style.display = 'block';
                overlay.style.display = 'block';
                overlay.style.opacity = '1';
                form.style.opacity = '0.3'; // Dim the form in the background
                form.reset();
            } else {
                // Extract error message, handling potential nested structure
                const result = responseData.serviceResponse || responseData;
                let errorMsg = result.message || result.data || 'An error occurred';
                
                // Handle validation errors from express-validator
                if (responseData.errors && Array.isArray(responseData.errors)) {
                    // Map field-specific validation errors to their respective fields
                    responseData.errors.forEach(err => {
                        const field = err.path || err.field;
                        const message = err.msg || err.message;
                        
                        if (field === 'username') {
                            showError(usernameInput, usernameError, message);
                        } else if (field === 'email') {
                            showError(emailInput, emailError, message);
                        } else if (field === 'dateOfBirth') {
                            showError(dobInput, dobError, message);
                        }
                    });
                    
                    // Combine all error messages for the general error display
                    const errorMessages = responseData.errors.map(err => err.msg || err.message || err);
                    errorMsg = errorMessages.join('. ');
                }
                
                // For rate limit errors (429)
                if (response.status === 429) {
                    errorMsg = result.message || `Yo! Too many requests 😅 Please try again later!`;
                }
                
                // For duplicate subscriber errors (409)
                if (response.status === 409) {
                    errorMsg = result.data || result.message || `Yo! be calm 😅! You are already a subscriber!`;
                }
                
                showGeneralError(errorMsg);
            }
        } catch (error) {
            console.error('Network Error:', error);
            showGeneralError('Network error. Could not connect to the server.');
        }
    });

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            successPopup.style.display = 'none';
            overlay.style.display = 'none';
            form.style.opacity = '1';
        });
    }
});