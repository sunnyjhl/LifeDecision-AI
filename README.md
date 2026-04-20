# LifeDecision AI – Agentic Life Simulator 🚀

## Overview

LifeDecision AI is an agentic AI simulator that projects future outcomes based on user decisions (e.g., "Should I do MBA or job?"). It uses specialized agents to analyze career, finance, and mental health impacts, providing 5-year and 10-year projections.

**Live Demo:** Open `frontend/index.html` in browser after starting backend.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JS (dashboard, timeline viz, decision cards)
- **Backend:** Node.js + Express (REST API)

## Decision Simulation Logic 🎯

1. **Career Agent:** Evaluates education vs experience paths.
   - MBA: High long-term potential, short-term debt/stress.
   - Job: Steady growth, lower risk.
2. **Finance Agent:** Projects net worth, cashflow.
   - Mock calcs: MBA ($2.5M 10Y, debt hit), Job ($1.8M, steady).
3. **Mental Health Agent:** Scores satisfaction (1-10).
   - Balances stress/reward.

**Risk Analysis:** Probabilistic (e.g., 30% no ROI on MBA).

Agents collaborate for holistic projection.

## Setup & Run 🛠️

1. Backend:

   ```
   cd life-decision-ai/backend
   npm install
   npm start
   ```

   Server: `http://localhost:3000`

2. Frontend:

   ```
   # From project root
   start life-decision-ai/frontend/index.html
   ```

3. Test:
   - Input: "Should I do MBA or job?"
   - See projections, timeline chart, agent reasoning.

## API

```
POST /simulate-decision
Body: { "decision": "Should I do MBA or job?" }
Response:
{
  "short_term": "...",
  "long_term": "...",
  "finance": 7.5,
  "happiness": 7.0,
  "risk": "...",
  "agent_steps": [...]
}
```

## Features

- ✅ Interactive dashboard
- ✅ Timeline visualization (canvas charts)
- ✅ Decision comparison cards
- ✅ Agentic reasoning (3 agents)
- ✅ Responsive UI


## Future Enhancements

- ML integration (real predictions)
- More agents (relationships, health)
- User auth, save simulations

# Dev by Jayaditya Malviya

