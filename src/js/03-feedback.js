import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onSubmit);
refs.input.addEventListener('input', throttle(getUserData, 500));
refs.textarea.addEventListener('input', throttle(getUserData, 500));

function onSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill all fields');
  }

  const inputData = {
    email: email.value,
    message: message.value,
  };
  console.log('inputData', inputData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

const userData = {};

function getUserData(e) {
  userData['email'] = refs.input.value;
  userData['message'] = refs.textarea.value;

  saveData();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function fillFormFromStorage() {
  const savedDataText = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedDataText);

  if (parsedData) {
    refs.input.value = parsedData.email;
    refs.textarea.value = parsedData.message;
  }
}

fillFormFromStorage();