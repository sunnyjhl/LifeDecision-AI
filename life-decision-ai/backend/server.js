const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const careerAgent = {
  analyze: (decision) => {
    if (decision.toLowerCase().includes('mba')) {
      return {
        short_term: 'Intense study, networking. Moderate income start (~$60k).',
        long_term: 'High earning potential ($150k+), leadership roles.',
        risk: 'High debt, time investment. 30% risk of no ROI.'
      };
    } else if (decision.toLowerCase().includes('job')) {
      return {
        short_term: 'Immediate income (~$50k), practical experience.',
        long_term: 'Steady promotions ($120k), but slower ceiling.',
        risk: 'Low initial risk, but stagnation possible. 15% risk.'
      };
    }
    return { short_term: 'Balanced path.', long_term: 'Moderate growth.', risk: 'Medium risk.' };
  }
};

const financeAgent = {
  analyze: (decision, career) => {
    if (decision.toLowerCase().includes('mba')) {
      return {
        short_term: '$60k income - $80k debt = negative cashflow.',
        long_term: '$2.5M net worth projection.',
        score: 7.5
      };
    } else {
      return {
        short_term: '$50k savings start.',
        long_term: '$1.8M net worth projection.',
        score: 8.0
      };
    }
  }
};

const mentalHealthAgent = {
  analyze: (decision) => {
    if (decision.toLowerCase().includes('mba')) {
      return {
        short_term: 'Stressful, but purposeful (6/10 happiness).',
        long_term: 'Accomplishment high (8/10).'
      };
    } else {
      return {
        short_term: 'Stable routine (7/10).',
        long_term: 'Content but routine (7/10).'
      };
    }
  }
};

app.post('/simulate-decision', (req, res) => {
  const { decision } = req.body;
  
  const career = careerAgent.analyze(decision);
  const finance = financeAgent.analyze(decision, career);
  const mental = mentalHealthAgent.analyze(decision);
  
  const response = {
    short_term: career.short_term,
    long_term: career.long_term,
    finance: finance.score,
    happiness: (parseFloat(mental.short_term.match(/\\d+/)[0]) + parseFloat(mental.long_term.match(/\\d+/)[0])) / 2,
    risk: career.risk,
    agent_steps: [
      `Career Agent: ${career.short_term} ${career.long_term}`,
      `Finance Agent: ${finance.short_term} ${finance.long_term}`,
      `Mental Health Agent: ${mental.short_term} ${mental.long_term}`
    ]
  };
  
  res.json(response);
});

app.listen(port, () => {
  console.log(`LifeDecision AI Backend running at http://localhost:${port}`);
});

