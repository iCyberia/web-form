(function () {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
  
    mainContent.innerHTML = '';
  
    const formContainer = document.createElement('div');
    formContainer.classList.add('modern-form');
  
    const title = document.createElement('h2');
    title.textContent = 'Involved Parties Statement';
    formContainer.appendChild(title);
  
    const questions = [
      { id: 'question1', label: 'eclidrsa one?', type: 'text' },
      { id: 'question2', label: 'Question two?', type: 'textarea' }
    ];
  
    questions.forEach(q => {
      const group = document.createElement('div');
      group.classList.add('form-group');
  
      const label = document.createElement('label');
      label.textContent = q.label;
      label.setAttribute('for', q.id);
  
      const input = q.type === 'textarea'
        ? document.createElement('textarea')
        : document.createElement('input');
  
      input.id = q.id;
      input.name = q.id;
      input.placeholder = q.label;
      input.classList.add('form-control');
  
      group.appendChild(label);
      group.appendChild(input);
      formContainer.appendChild(group);
    });
  
    mainContent.appendChild(formContainer);
  
    window.form = formContainer;
    window.templateQuestions = questions;
  
    if (typeof window.initCopyButton === 'function') {
      window.initCopyButton();
    }
  })();
  