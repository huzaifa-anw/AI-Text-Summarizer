const textInput = document.getElementById('textInput');
const summaryOutput = document.getElementById('summaryOutput');
const summarizerForm = document.getElementById('summarizerForm');

summarizerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textToSummarize = textInput.value;

    if (!textToSummarize) {
        summaryOutput.style.color = 'red';
        summaryOutput.textContent = 'Please enter some text before summarizing.'
    }

    summaryOutput.style.color = '#616569';
    summaryOutput.textContent = 'Loading...'

    const payload = {
        textToSummarize,
    }

    const url = 'http://localhost:3000/summary';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        summaryOutput.style.color = 'green';
        summaryOutput.textContent = data.summary;
    } catch (e) {
        console.log(e);
    }

})




