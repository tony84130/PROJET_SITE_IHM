const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// Liste des origines autorisées
const allowedOrigins = [
  'http://127.0.0.1:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://127.0.0.1:3003',
  'http://127.0.0.1:3004',
  'http://127.0.0.1:3005',
  'http://127.0.0.1:3006',
  'http://127.0.0.1:3007',
  'http://127.0.0.1:3008',
  'http://127.0.0.1:3009',
  'http://127.0.0.1:3010',
  'http://127.0.0.1:3011',
  'http://127.0.0.1:3012',
  'http://127.0.0.1:3013',
  'http://127.0.0.1:3014',
  'http://127.0.0.1:3015',
  'http://127.0.0.1:3016',
  'http://127.0.0.1:3017',
  'http://127.0.0.1:3018',
  'http://127.0.0.1:3019',
  'http://127.0.0.1:3020',
  'http://127.0.0.1:3021',
  'http://127.0.0.1:3022',
  'http://127.0.0.1:3023',
  'http://127.0.0.1:3024',
  'http://127.0.0.1:3025',
  'http://127.0.0.1:3026',
  'http://127.0.0.1:3027',
  'http://127.0.0.1:3028',
  'http://127.0.0.1:3029',
  'http://127.0.0.1:3030',
  'http://127.0.0.1:3031'
];

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    // Autoriser les requêtes sans origine (comme Postman ou cURL)
    if (!origin) return callback(null, true);
    // Vérifier si l'origine est dans la liste des origines autorisées
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ajout de OPTIONS pour les requêtes CORS préflight
  allowedHeaders: ['Content-Type', 'User-Id'], // Ajout de User-Id
}));

app.use(express.json());

// Route par défaut pour tester
app.get('/', (req, res) => {
  res.send('Serveur backend en marche !');
});

// Routes
app.use('/api/auth', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});