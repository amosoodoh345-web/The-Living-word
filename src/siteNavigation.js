export const SITE_NAVIGATION = [
  { id: 'home', label: 'Home', href: './index.html' },
  { id: 'daily', label: 'Daily Word', href: './church.html' },
  { id: 'bible', label: 'Bible Library', href: './Bible.html' },
  { id: 'spirit', label: 'Life in the Spirit', href: './Life%20in%20the%20spirit.html' },
  { id: 'reflection', label: 'Reflection', href: './reflection.html' }
];

function createNavigation(currentPage) {
  const navigation = document.createElement('nav');
  navigation.className = 'lifeos-site-nav';
  navigation.setAttribute('aria-label', 'The Living Word pages');

  const brand = document.createElement('a');
  brand.className = 'lifeos-site-brand';
  brand.href = './index.html';
  brand.innerHTML = '<span class="lifeos-site-mark" aria-hidden="true">✦</span><span>The Living Word</span>';
  navigation.append(brand);

  const links = document.createElement('div');
  links.className = 'lifeos-site-nav-links';

  for (const item of SITE_NAVIGATION) {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    if (item.id === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
    links.append(link);
  }

  navigation.append(links);
  return navigation;
}

export function mountSiteNavigation() {
  document.querySelectorAll('[data-site-navigation]').forEach((mount) => {
    mount.replaceChildren(createNavigation(mount.dataset.currentPage));
  });
}

if (typeof document !== 'undefined') {
  mountSiteNavigation();
}