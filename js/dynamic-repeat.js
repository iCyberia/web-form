(function () {
    window.initDynamicRepeats = function (questions, formContainer) {
      questions.forEach(mainQ => {
        if (mainQ.type === 'select' && mainQ.repeat && Array.isArray(mainQ.repeat.questions)) {
          const controller = formContainer.querySelector(`#${mainQ.id}`);
          const parentGroup = formContainer.querySelector(`#group-${mainQ.id}`);
          const repeatWrapper = document.createElement('div');
          repeatWrapper.classList.add('repeat-wrapper');
          parentGroup.appendChild(repeatWrapper);
  
          controller.addEventListener('change', () => {
            repeatWrapper.innerHTML = ''; // Clear previous
  
            const count = parseInt(controller.value);
            if (isNaN(count) || count < 1) return;
  
            for (let i = 0; i < count; i++) {
              const setContainer = document.createElement('div');
              setContainer.classList.add('repeat-set');
              repeatWrapper.appendChild(setContainer);
              
              // Trigger animation after DOM render
              requestAnimationFrame(() => {
                setContainer.classList.add('show');
              });
                            setContainer.setAttribute('data-index', i);
  
              const heading = document.createElement('h4');
              heading.textContent = `Entry ${i + 1}`;
              heading.classList.add('repeat-heading');
              setContainer.appendChild(heading);
  
              mainQ.repeat.questions.forEach(template => {
                const qId = `${template.id}_${i}`;
                const group = document.createElement('div');
                group.classList.add('form-group');
                group.id = `group-${qId}`;
  
                const label = document.createElement('label');
                label.setAttribute('for', qId);
                label.textContent = template.label;
  
                let input;
                if (template.type === 'textarea') {
                  input = document.createElement('textarea');
                } else if (template.type === 'select' && template.options) {
                  input = document.createElement('select');
                  template.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    input.appendChild(option);
                  });
                } else {
                  input = document.createElement('input');
                  input.type = template.type;
                }
  
                input.id = qId;
                input.name = qId;
                input.classList.add('form-control');
                if (template.type !== 'select') input.placeholder = template.label;
  
                group.appendChild(label);
                group.appendChild(input);
                setContainer.appendChild(group);
              });
  
              repeatWrapper.appendChild(setContainer);
            }
          });
        }
      });
    };
  })();
  