async function simulateDecision() {
  const input = document.getElementById('decisionInput').value;
  if (!input) {
    alert('Please enter a decision!');
    return;
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.classList.remove('hidden');

  try {
    const response = await fetch('http://localhost:3000/simulate-decision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision: input })
    });

    const data = await response.json();

    // Populate comparison cards (simplified: MBA vs Job based on input)
    const cardsDiv = document.querySelector('.comparison-cards');
    cardsDiv.innerHTML = `
      <div class="card">
        <h3>5-Year Projection</h3>
        <p>${data.short_term}</p>
        <p>Finance: $${data.finance.toFixed(1)}/10</p>
        <p>Happiness: ${data.happiness.toFixed(1)}/10</p>
      </div>
      <div class="card">
        <h3>10-Year Projection</h3>
        <p>${data.long_term}</p>
        <p>Risk: ${data.risk}</p>
      </div>
    `;

    // Agent steps
    const agentList = document.getElementById('agentList');
    agentList.innerHTML = data.agent_steps.map(step => `<li>${step}</li>`).join('');

    // Timeline visualization (simple canvas bar chart for projections)
    drawTimeline(data);

  } catch (error) {
    alert('Error: Make sure backend is running on port 3000!');
    console.error(error);
  }
}

function drawTimeline(data) {
  const canvas = document.getElementById('timelineCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 200;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Simple bars for short/long term
  const barWidth = canvas.width / 4;
  const maxHeight = 150;

  // Short term finance
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(20, canvas.height - (data.finance * 15), barWidth - 20, maxHeight * (data.finance / 10));

  // Long term happiness
  ctx.fillStyle = '#2196F3';
  ctx.fillRect(20 + barWidth, canvas.height - (data.happiness * 15), barWidth - 20, maxHeight * (data.happiness / 10));

  // Labels
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText('5Y Finance', 25, 30);
  ctx.fillText('10Y Happiness', 25 + barWidth, 30);
}

// Simulate on Enter key
document.getElementById('decisionInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') simulateDecision();
});

