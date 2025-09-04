// index.js
// init project
const express = require('express');
const app = express();

// para CORS (que freeCodeCamp pueda probar tu API)
const cors = require('cors');
app.use(cors());

// servir la página en views/index.html
app.use(express.static('public'));
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// RUTA API principal
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // sin parámetro -> fecha actual
    parsedDate = new Date();
  } else {
    // si solo tiene números -> timestamp
    if (/^\d+$/.test(date)) {
      parsedDate =
        date.length === 10
          ? new Date(Number(date) * 1000) // segundos
          : new Date(Number(date)); // milisegundos
    } else {
      parsedDate = new Date(date);
    }
  }

  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// escuchar puerto (importante usar process.env.PORT para los tests online)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
