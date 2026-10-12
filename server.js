// JOSE, Adrian Meldrich C.
// WD - 303

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const menu = [
  { id: 1, name: 'Barako Espresso', category: 'espresso', price: 110, image: 'espresso.svg',
    description: 'A short, bold shot of Batangas barako. Dark, earthy, and a little wild.' },
  { id: 2, name: 'Americano', category: 'espresso', price: 120, image: 'espresso.svg',
    description: 'Two shots of espresso lengthened with hot water for a clean, long cup.' },
  { id: 3, name: 'Don Mel Latte', category: 'milk', price: 165, image: 'latte.svg',
    description: 'Our house latte: espresso, steamed milk, and a spoon of muscovado.' },
  { id: 4, name: 'Spanish Latte', category: 'milk', price: 160, image: 'latte.svg',
    description: 'Espresso with milk and sweetened condensed milk. Rich and round.' },
  { id: 5, name: 'Cappuccino', category: 'milk', price: 150, image: 'latte.svg',
    description: 'Equal parts espresso, steamed milk, and thick foam.' },
  { id: 6, name: 'Salted Caramel Iced Latte', category: 'cold', price: 170, image: 'iced.svg',
    description: 'Iced espresso and milk with house caramel and a pinch of sea salt.' },
  { id: 7, name: 'Cold Brew', category: 'cold', price: 150, image: 'iced.svg',
    description: 'Steeped for 18 hours. Smooth, low acid, served over ice.' },
  { id: 8, name: 'Ensaymada', category: 'pastry', price: 95, image: 'pastry.svg',
    description: 'Soft buttery brioche coiled with sugar and grated cheese.' },
  { id: 9, name: 'Burnt Cheesecake Slice', category: 'pastry', price: 185, image: 'pastry.svg',
    description: 'Basque-style, caramelized on top and creamy in the center.' },
  { id: 10, name: 'Pandesal and Butter', category: 'pastry', price: 80, image: 'pastry.svg',
    description: 'Warm pandesal with salted butter. Pairs well with the barako.' }
];

app.get('/', (req, res) => {
  console.log('Rendering index.html');
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/menu', (req, res) => {
  console.log('Rendering menu.html');
  res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});

app.get('/about', (req, res) => {
  console.log('Rendering about.html');
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  console.log('Rendering contact.html');
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  const items = category ? menu.filter(item => item.category === category) : menu;
  res.json(items);
});

app.get('/api/menu/:id', (req, res) => {
  const item = menu.find(m => m.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  res.json(item);
});

app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
