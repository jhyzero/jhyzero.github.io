(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton) menuButton.addEventListener('click', () => {
    const open = menu ? menu.classList.toggle('open') : false;
    menuButton.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (!menu || !menu.classList.contains('open')) return;
    if (menu.contains(event.target) || (menuButton && menuButton.contains(event.target))) return;
    menu.classList.remove('open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  });

  const searchInput = document.querySelector('[data-search-input]');
  const searchItems = [...document.querySelectorAll('[data-search-item]')];
  const tagButtons = [...document.querySelectorAll('[data-tag]')];
  const yearSections = [...document.querySelectorAll('[data-year-section]')];
  const noResults = document.querySelector('[data-no-results]');
  let activeTag = 'all';

  const normalize = (value) => value.trim().toLocaleLowerCase();

  const filterPosts = () => {
    const query = normalize(searchInput ? searchInput.value : '');
    let visibleCount = 0;

    searchItems.forEach((item) => {
      const text = `${item.dataset.title} ${item.dataset.description} ${item.dataset.tags}`;
      const tags = normalize(item.dataset.tags || '').split(',');
      const matchesText = !query || normalize(text).includes(query);
      const matchesTag = activeTag === 'all' || tags.includes(normalize(activeTag));
      const visible = matchesText && matchesTag;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    yearSections.forEach((section) => {
      section.hidden = !section.querySelector('[data-search-item]:not([hidden])');
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  };

  if (searchInput) searchInput.addEventListener('input', filterPosts);

  tagButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeTag = button.dataset.tag || 'all';
      tagButtons.forEach((candidate) => candidate.classList.toggle('active', candidate === button));
      filterPosts();
    });
  });

  if (location.hash.startsWith('#tag-')) {
    const requestedTag = decodeURIComponent(location.hash.slice(5));
    const matchingButton = tagButtons.find((button) => button.dataset.tag === requestedTag);
    if (matchingButton) matchingButton.click();
  }

  document.querySelectorAll('.article-body pre').forEach((pre) => {
    const wrapper = pre.closest('.highlighter-rouge, .highlight') || pre.parentElement;
    if (!wrapper || wrapper.querySelector('.copy-code')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'COPY';
    button.setAttribute('aria-label', '复制代码');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        button.textContent = 'COPIED';
        window.setTimeout(() => { button.textContent = 'COPY'; }, 1600);
      } catch {
        button.textContent = 'FAILED';
      }
    });
    wrapper.appendChild(button);
  });
})();
