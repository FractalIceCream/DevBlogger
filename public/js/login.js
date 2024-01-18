const title = document.querySelector('.card-title');
const signupLink = document.querySelector('#signup-link');
const loginBtn = document.querySelector('#login-btn');
let newUser = signupLink.getAttribute('data-newUser');
const buttonSwapHandler = (event) => {
  event.preventDefault();
  if (newUser == 'true') {
    newUser = 'false';
    signupLink.setAttribute('data-newUser', newUser);
    signupLink.innerHTML = 'Signup Instead';
    loginBtn.innerHTML = 'Login';
    title.innerHTML = 'LOGIN';
  } else {
    newUser = 'true';
    signupLink.setAttribute('data-newUser', newUser);
    signupLink.innerHTML = 'Login Instead';
    loginBtn.innerHTML = 'Signup';
    title.innerHTML = 'SIGNUP';
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#userName-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();
  if (name && password) {
    // Send a POST request to the API endpoint
    console.log(newUser + " " + password);
    if (newUser == 'false') {
      console.log('logging in');
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.body);
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    // } else {
    //   console.log(`${name} ${password}`);
    //   const newUserResponse = await fetch('/api/users', {
    //     method: 'POST',
    //     body: JSON.stringify({ name, password }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   console.log(newUserResponse.body);
    //   if (newUserResponse.ok) {
    //     document.location.replace('/dashboard');
    //   } else {
    //     alert(newUserResponse.statusText);
    //   }
    // }
  }
};

signupLink.addEventListener('click', buttonSwapHandler);

loginBtn.addEventListener('click', loginFormHandler);
