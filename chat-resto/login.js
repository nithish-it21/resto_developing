// Get the login form element
const loginForm = document.getElementById('login-form');

// Add event listener for form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission
  
  // Get input values
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;

  // Perform login request (you can modify this part to suit your needs)
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    // Handle response
    if (data.success) {
      // Redirect to home page or perform desired action
      window.location.href = '/home.html';
    } else {
      // Display error message
      alert('Login failed. Please check your credentials and try again.');
    }
  })
  .catch(error => {
    console.error('Login request failed:', error);
    alert('An error occurred. Please try again later.');
  });
});
