// main.js — the router. Each section is its own module, loaded lazily with
// import() the first time its link is followed, so the first load carries
// only the shell, the styles and this file. Hash routes keep every section
// reachable by a link and bookmarkable, with no server and no network.

const routes = {
  overview: () => import("./view-overview.js").then((m) => m.renderOverview),
  people: () => import("./view-people.js").then((m) => m.renderPeople),
  economy: () => import("./view-economy.js").then((m) => m.renderEconomy),
  regions: () => import("./view-regions.js").then((m) => m.renderRegions),
  sources: () => import("./view-sources.js").then((m) => m.renderSources),
};

const titles = {
  overview: "Indonesia in Numbers — National Statistics",
  people: "People & society — Indonesia in Numbers",
  economy: "The economy — Indonesia in Numbers",
  regions: "Regions & provinces — Indonesia in Numbers",
  sources: "Sources & methods — Indonesia in Numbers",
};

const main = document.querySelector("#main");
const loaded = {};

async function navigate() {
  const name = (location.hash.replace(/^#\//, "") || "overview").split("?")[0];
  const route = routes[name] ? name : "overview";
  document.querySelectorAll(".site-nav a").forEach((a) => {
    if (a.dataset.route === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (!loaded[route]) loaded[route] = await routes[route]();
  loaded[route](main);
  document.title = titles[route];
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener("hashchange", navigate);
navigate();
