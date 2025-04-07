(function () {
    window.templateTitle = 'Involved Parties Statement';
  
    window.templateQuestions = [
      { id: 'question1', label: 'Question one?', type: 'text' },
      { id: 'question2', label: 'Question two?', type: 'textarea' },
      { id: 'question3', label: 'Were you injured?', type: 'radio', options: ['Yes', 'No'], 
        followup: { when: 'Yes', questions: [
            { id: 'injuryLocation', label: 'What was injured?', type: 'text' },
            { id: 'treated', label: 'Did you receive medical treatment?', type: 'radio', options: ['Yes', 'No'] }]}},
      { id: 'question4', label: 'Select a number:', type: 'select', options: ['0', '1', '2', '3', '4', '5'],
        repeat: { questions: [
            { id: 'childName', label: 'Child Name', type: 'text' },
            { id: 'childAge', label: 'Child Age', type: 'text' }]}}
    ];
  })();
  