(function () {
    window.initDynamicFollowups = function (questions, formContainer) {
      questions.forEach(mainQ => {
        if (mainQ.type === 'radio' && mainQ.followup) {
          const radioInputs = formContainer.querySelectorAll(`input[name="${mainQ.id}"]`);
          const container = formContainer.querySelector(`#group-${mainQ.id}`);
  
          radioInputs.forEach(input => {
            input.addEventListener('change', () => {
              // Remove any existing followup content
              const existing = container.querySelector(`.followup-group[data-parent="${mainQ.id}"]`);
              if (existing) existing.remove();
  
              // If the selected value matches the trigger, show follow-up
              if (input.value === mainQ.followup.when) {
                const followupGroup = document.createElement('div');
                followupGroup.classList.add('followup-group');
                followupGroup.setAttribute('data-parent', mainQ.id);
  
                mainQ.followup.questions.forEach(fq => {
                  const qDiv = document.createElement('div');
                  qDiv.classList.add('form-group');
                  qDiv.id = `group-${fq.id}`;
  
                  const label = document.createElement('label');
                  label.textContent = fq.label;
                  label.setAttribute('for', fq.id);
  
                  let inputElement;
  
                  if (fq.type === 'textarea') {
                    inputElement = document.createElement('textarea');
                  } else if (fq.type === 'radio' && fq.options) {
                    inputElement = document.createElement('div');
                    fq.options.forEach(opt => {
                      const radio = document.createElement('input');
                      radio.type = 'radio';
                      radio.name = fq.id;
                      radio.value = opt;
                      radio.id = `${fq.id}_${opt}`;
  
                      const radioLabel = document.createElement('label');
                      radioLabel.setAttribute('for', radio.id);
                      radioLabel.textContent = opt;
                      radioLabel.style.marginRight = '1rem';
  
                      inputElement.appendChild(radio);
                      inputElement.appendChild(radioLabel);
                    });
                  } else {
                    inputElement = document.createElement('input');
                    inputElement.type = fq.type;
                  }
  
                  inputElement.id = fq.id;
                  inputElement.name = fq.id;
                  inputElement.classList.add('form-control');
                  if (fq.type !== 'radio') {
                    inputElement.placeholder = fq.label;
                  }
  
                  qDiv.appendChild(label);
                  qDiv.appendChild(inputElement);
                  followupGroup.appendChild(qDiv);
                });
  
                container.appendChild(followupGroup);

                // Animate in
                requestAnimationFrame(() => {
                  followupGroup.classList.add('show');
                });
                              }
            });
          });
        }
      });
    };
  })();
  