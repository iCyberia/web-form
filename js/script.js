// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', function () {
  sidebar.classList.toggle('active');
});

const submenuToggles = document.querySelectorAll('.has-submenu');
submenuToggles.forEach(function (toggle) {
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    const submenu = this.nextElementSibling;
    submenu.classList.toggle('open');
    const arrow = this.querySelector('.arrow');
    arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});

// Load templates dynamically
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const page = link.getAttribute('data-page');

    // Clear old script if needed
    const oldScript = document.getElementById('dynamic-script');
    if (oldScript) oldScript.remove();

    // Load new template JS
    const script = document.createElement('script');
    script.src = `templates/${page}.js?nocache=${Date.now()}`;
    script.id = 'dynamic-script';
    script.onload = () => {
      renderTemplateForm(); // After script loads, render form using shared logic
    };
    document.body.appendChild(script);
  });
});

// Auto-expand textareas
document.addEventListener('input', (e) => {
  if (e.target.tagName === 'TEXTAREA') {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
});

// Dark mode
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  const darkModeToggleLink = document.querySelector('#dark-mode-toggle .menu-item');
  if (darkModeToggleLink) {
    darkModeToggleLink.textContent = 'Light Mode';
  }
}

const darkModeToggleLink = document.querySelector('#dark-mode-toggle .menu-item');
darkModeToggleLink.addEventListener('click', function (e) {
  e.preventDefault();
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggleLink.textContent = 'Light Mode';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggleLink.textContent = 'Dark Mode';
  }
});

// Shared form renderer (centralized logic)
function renderTemplateForm() {
  if (!window.templateQuestions || !document.getElementById('main-content')) return;

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  const formContainer = document.createElement('div');
  formContainer.classList.add('modern-form');

  const title = document.createElement('h2');
  title.textContent = window.templateTitle || 'Form';
  formContainer.appendChild(title);

  window.templateQuestions.forEach(q => {
    const group = document.createElement('div');
    group.classList.add('form-group');
    group.id = `group-${q.id}`;

    const label = document.createElement('label');
    label.textContent = q.label;
    label.setAttribute('for', q.id);

    let input;

    if (q.type === 'textarea') {
      input = document.createElement('textarea');
    } else if (q.type === 'radio' && q.options) {
      input = document.createElement('div');
      q.options.forEach(option => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = q.id;
        radio.value = option;
        radio.id = `${q.id}_${option}`;

        const radioLabel = document.createElement('label');
        radioLabel.setAttribute('for', radio.id);
        radioLabel.textContent = option;
        radioLabel.style.marginRight = '1rem';

        input.appendChild(radio);
        input.appendChild(radioLabel);
      });
    } else if (q.type === 'select' && q.options) {
      input = document.createElement('select');
      q.options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        input.appendChild(opt);
      });
    } else {
      input = document.createElement('input');
      input.type = q.type;
    }

    input.id = q.id;
    input.name = q.id;
    input.classList.add('form-control');
    if (q.type !== 'radio' && q.type !== 'select') {
      input.placeholder = q.label;
    }

    group.appendChild(label);
    group.appendChild(input);
    formContainer.appendChild(group);
  });

  mainContent.appendChild(formContainer);
  window.form = formContainer;

  if (typeof window.initCopyButton === 'function') {
    window.initCopyButton();
  }
  if (typeof window.initDynamicFollowups === 'function') {
    window.initDynamicFollowups(window.templateQuestions, formContainer);
  }
  if (typeof window.initDynamicRepeats === 'function') {
    window.initDynamicRepeats(window.templateQuestions, formContainer);
  }
}
