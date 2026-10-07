function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach(tabs => {
    const buttons = [...tabs.querySelectorAll("[data-tab]")];
    const panels = [...tabs.querySelectorAll("[data-panel]")];
    function activate(button, focus = false) {
      buttons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(panel => {
        const selected = panel.dataset.panel === button.dataset.tab;
        panel.classList.toggle("active", selected);
        panel.hidden = !selected;
      });
      if (focus) button.focus();
    }
    buttons.forEach(button => {
      const id = button.dataset.tab;
      button.id = `tab-${id}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", `panel-${id}`);
      const panel = panels.find(item => item.dataset.panel === id);
      panel.id = `panel-${id}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", button.id);
      panel.tabIndex = 0;
      button.addEventListener("click", () => activate(button));
      button.addEventListener("keydown", event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let index = buttons.indexOf(button);
        if (event.key === "ArrowRight") index = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft") index = (index + buttons.length - 1) % buttons.length;
        if (event.key === "Home") index = 0;
        if (event.key === "End") index = buttons.length - 1;
        activate(buttons[index], true);
      });
    });
    tabs.classList.add("enhanced");
    activate(buttons[0]);
  });
}

function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;
  nav.classList.add("enhanced");
  const close = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) { close(); toggle.focus(); }
  });
  document.addEventListener("click", event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) close();
  });
}
initTabs();
initMenu();
