// main.js — the site's router. Hash routes lazy-load one view module
// per section on first visit, set the page title, scroll to the top and
// signal window.__shotReady once the view has rendered.

const ROUTES = {
  overview: {
    title: 'Indonesia in Numbers — Overview',
    load: () => import('./view-overview.js'),
  },
  people: {
    title: 'Indonesia in Numbers — People & society',
    load: () => import('./view-people.js'),
  },
  economy: {
    title: 'Indonesia in Numbers — The economy',
    load: () => import('./view-economy.js'),
  },
  regions: {
    title: 'Indonesia in Numbers — Regions & provinces',
    load: () => import('./view-regions.js'),
  },
  sources: {
    title: 'Indonesia in Numbers — Sources & methods',
    load: () => import('./view-sources.js'),
  },
};

/** Chart redraw callbacks registered by the current view; run on resize. */
let redrawCallbacks = [];

export function onResizeRedraw(draw) {
  redrawCallbacks.push(draw);
}

window.addEventListener('resize', () => {
  window.clearTimeout(window.__resizeTimer);
  window.__resizeTimer = window.setTimeout(() => {
    redrawCallbacks.forEach((draw) => {
      try { draw(); } catch (err) { /* a hidden view redraws nothing */ }
    });
  }, 160);
});

function routeName() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : 'overview';
}

function markNav(name) {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('data-nav') === name) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

async function render() {
  const name = routeName();
  const route = ROUTES[name];
  window.__shotReady = false;
  redrawCallbacks = [];
  const main = document.getElementById('main');
  try {
    const view = await route.load();
    main.innerHTML = '';
    view.render(main);
  } catch (err) {
    main.innerHTML = '<section class="panel"><h1>Something went wrong</h1>'
      + '<p>This section could not be loaded. Please try another section from the navigation above.</p></section>';
  }
  document.title = route.title;
  markNav(name);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
