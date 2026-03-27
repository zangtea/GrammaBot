require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const vocabRoutes = require('./routes/vocabRoutes');
const grammarRoutes = require('./routes/grammarRoutes');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/vocab', vocabRoutes);
app.use('/grammar', grammarRoutes);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on port ${port}`);
});

module.exports = app;

