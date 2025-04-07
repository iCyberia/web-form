(function () {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
  
    mainContent.innerHTML = '';
  
    const container = document.createElement('div');
    container.classList.add('modern-form');
  
    const heading = document.createElement('h2');
    heading.textContent = 'Welcome!';
    container.appendChild(heading);
  
    const paragraph = document.createElement('p');
    paragraph.innerHTML = '◀ Click the navigation menu to begin.';
    container.appendChild(paragraph);
  
    mainContent.appendChild(container);
  })();
  