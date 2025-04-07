window.initCopyButton = function () {
  if (!window.form || !window.templateQuestions) {
    console.warn('Copy button init failed: window.form or window.templateQuestions is missing');
    return;
  }

  const oldButton = window.form.querySelector('.button-wrapper');
  if (oldButton) oldButton.remove();

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Copy Form Data';
  submitBtn.classList.add('btn');

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button-wrapper');
  buttonWrapper.appendChild(submitBtn);
  window.form.appendChild(buttonWrapper);

  submitBtn.addEventListener('click', () => {
    const mainContent = document.getElementById('main-content');
    const oldOutputs = mainContent.querySelectorAll('.form-output');
    oldOutputs.forEach(div => div.remove());

    const lineLimits = [15, 14];
    let currentLineCount = 0;
    let currentBlockLineLimit = lineLimits[0];

    let outputDiv = document.createElement('div');
    outputDiv.classList.add('form-output');

    const createCopyButton = (targetDiv) => {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.textContent = 'Copy to Clipboard';
      copyBtn.classList.add('btn');
      copyBtn.style.marginTop = '1rem';

      copyBtn.addEventListener('click', () => {
        const lines = Array.from(targetDiv.querySelectorAll('p')).map(p =>
          p.textContent
        );
        const fullText = lines.join('\n');

        navigator.clipboard.writeText(fullText).then(() => {
          targetDiv.classList.add('copied-block');
          const existingMsg = targetDiv.querySelector('.copy-confirm');
          if (existingMsg) existingMsg.remove();

          const confirmMsg = document.createElement('div');
          confirmMsg.textContent = '📋 Text Copied!';
          confirmMsg.classList.add('copy-confirm');
          targetDiv.appendChild(confirmMsg);
        }).catch(err => {
          alert('Failed to copy: ' + err);
        });
      });

      targetDiv.appendChild(copyBtn);
    };

    const addTextToOutput = (label, value) => {
      const fullText = `${label}: ${value}`;
      const wrappedLines = wrapText(fullText, 65).split('\n');

      wrappedLines.forEach(line => {
        if (currentLineCount >= currentBlockLineLimit) {
          createCopyButton(outputDiv);
          mainContent.appendChild(outputDiv);
          outputDiv = document.createElement('div');
          outputDiv.classList.add('form-output');
          currentBlockLineLimit = lineLimits[1];
          currentLineCount = 0;
        }

        const item = document.createElement('p');
        item.textContent = line;
        outputDiv.appendChild(item);
        currentLineCount++;
      });
    };

    window.templateQuestions.forEach(question => {
      let value = '';

      if (question.type === 'radio') {
        const selected = document.querySelector(`input[name="${question.id}"]:checked`);
        value = selected ? selected.value : 'Not answered';
      } else {
        const field = document.getElementById(question.id);
        value = field ? field.value : '';
      }

      addTextToOutput(question.label, value);

      // 🔁 Include follow-up answers
      if (
        question.type === 'radio' &&
        question.followup &&
        value === question.followup.when
      ) {
        question.followup.questions.forEach(fq => {
          let fqValue = '';
          if (fq.type === 'radio') {
            const fqSelected = document.querySelector(`input[name="${fq.id}"]:checked`);
            fqValue = fqSelected ? fqSelected.value : 'Not answered';
          } else {
            const fqField = document.getElementById(fq.id);
            fqValue = fqField ? fqField.value : '';
          }
          addTextToOutput(fq.label, fqValue);
        });
      }

      // 🔁 Include repeated question answers
      if (question.type === 'select' && question.repeat && Array.isArray(question.repeat.questions)) {
        const selectedNumber = parseInt(value);
        if (!isNaN(selectedNumber) && selectedNumber > 0) {
          for (let i = 0; i < selectedNumber; i++) {
            addTextToOutput(`Entry ${i + 1}`, ''); // Heading spacer

            question.repeat.questions.forEach(repeatQ => {
              const repeatId = `${repeatQ.id}_${i}`;
              let repeatValue = '';

              if (repeatQ.type === 'radio') {
                const selected = document.querySelector(`input[name="${repeatId}"]:checked`);
                repeatValue = selected ? selected.value : 'Not answered';
              } else {
                const field = document.getElementById(repeatId);
                repeatValue = field ? field.value : '';
              }

              addTextToOutput(repeatQ.label, repeatValue);
            });
          }
        }
      }
    });

    if (currentLineCount > 0) {
      createCopyButton(outputDiv);
      mainContent.appendChild(outputDiv);
    }
  });
};

function wrapText(text, maxLength) {
  let result = '';
  for (let i = 0; i < text.length; i += maxLength) {
    result += text.slice(i, i + maxLength) + '\n';
  }
  return result.trim();
}
