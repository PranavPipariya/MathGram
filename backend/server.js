// const express = require('express');
// const cors = require('cors');
// const cardsRouter = require('./cards');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/health', (_req, res) => res.json({ ok: true }));

// app.use('/cards', cardsRouter); // GET /cards?topics=Calculus,IO%20Econ,...

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Backend listening on http://localhost:${PORT}`);
// });



// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cards = require('./cards');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // adjust if your FE origin differs
app.use(express.json());

app.use('/cards', cards);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
