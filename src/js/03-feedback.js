import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', throttle(onFormSubmit, 500));
refs.input.addEventListener('input', throttle(onTextareaInput, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));


function onFormSubmit(e) {
  e.preventDefault();

  const { elements: { email, message } } = e.target;

  if (email.value === '' || message.value === '') {
    return alert('All fields must be filled!!!');
  }
  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log('formData', formData);

  e.target.reset()
  localStorage.removeItem(STORAGE_KEY)
}

const userFormData = {};

function onTextareaInput(e) {
  userData['email'] = refs.input.value;
  userData['message'] = refs.textarea.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFormData))
}


function populateFormData() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);

  if (parsedMessage) {
    refs.input.value = parsedMessage.email;
    refs.textarea.value = parsedMessage.message;
  }
}
populateFormData()