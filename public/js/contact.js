const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  status.textContent = `Thanks, ${name}. We got your message and will reply soon.`;
  form.reset();
});
