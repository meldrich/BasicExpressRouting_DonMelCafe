const list = document.getElementById('menu-list');
const chips = document.querySelectorAll('.chip');

async function loadMenu(category = '') {
  list.innerHTML = '<p class="status">Loading the menu...</p>';
  try {
    const url = category ? `/api/menu?category=${encodeURIComponent(category)}` : '/api/menu';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const items = await res.json();

    list.innerHTML = items.map(item => `
      <article class="menu-item">
        <img src="/images/${item.image}" alt="${item.name}">
        <div>
          <div class="row">
            <h3>${item.name}</h3>
            <span class="price">&#8369;${item.price}</span>
          </div>
          <p>${item.description}</p>
        </div>
      </article>`).join('');
  } catch (err) {
    list.innerHTML = '<p class="status">The menu could not load. Refresh the page to try again.</p>';
    console.error(err);
  }
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    loadMenu(chip.dataset.category);
  });
});

loadMenu();
