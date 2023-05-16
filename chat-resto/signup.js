// Get the signup form element
const signupForm = document.getElementById('signup-form');

// Add event listener for form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Get input values
  const name = document.getElementById('name-input').value;
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;

  // Perform signup request (you can modify this part to suit your needs)
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(response => response.json())
  .then(data => {
    // Handle response
    if (data.success) {
      // Redirect to login page or perform desired action
      window.location.href = '/login.html';
    } else {
      // Display error message
      alert('Sign up failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Sign up request failed:', error);
    alert('An error occurred. Please try again later.');
  });
});
