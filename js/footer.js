document.addEventListener('DOMContentLoaded', () => {
    const footer = document.createElement('footer');
    footer.className = 'app-footer';
  
    footer.innerHTML = `
      <p>
        <a href="#">Send Email</a><br>
        <a href="#" onclick="document.querySelector('li[data-tab=\'help\']')?.click(); return false;">Change Log</a>
      </p>
    `;
  
    document.body.appendChild(footer);
  });
  