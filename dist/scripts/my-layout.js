window.addEventListener("load", (event) => {
  let setWindowHeightVariable = () => {
    let vh = window.innerHeight;
    document.querySelector('html').style.setProperty('--vh', `${vh}px`);
  }

  if (typeof EventBus != 'undefined') {
    EventBus.subscribe('errors:insales:quick_checkout', function () {
      if ($('.m-modal-heading').length > 0) {
        $('.m-modal-heading')[0].scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
  }

  let setFixedPanelOffsetVariable = (panelPosition, value) => {
    let css_variable = '';

    if (panelPosition == 'top') {
      css_variable = '--fixed-panels-top-offset';
    }

    if (panelPosition == 'bottom') {
      css_variable = '--fixed-panels-bottom-offset';
    }

    document.querySelector('html').style.setProperty(css_variable, `${value}px`);
  }

  let isEmptyFixedPanel = (panel) => {
    const layouts = panel.querySelectorAll(".layout");
    return (layouts.length == 0) ? true : false;
  }

  let checkSidebarHeight = () => {
    const asideArea = document.querySelector('.page_layout > aside');
    const sidebar = document.querySelector('[data-sidebar]');
    const fixedPanelTop = document.querySelector('[data-fixed-panels="top"]');

    if (!asideArea) {
      return;
    }

    const heightFixedTopPanel = fixedPanelTop ? fixedPanelTop.offsetHeight : 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const sidebarHeight = sidebar?.offsetHeight;

    if (sidebarHeight > viewportHeight - heightFixedTopPanel) {
      asideArea.classList.add('is-large');
    } else {
      asideArea.classList.remove('is-large');
    }
  }

  setWindowHeightVariable();
  window.addEventListener('resize', setWindowHeightVariable);

  const fixed_panels = document.querySelectorAll('[data-fixed-panels]');
  const sidebar = document.querySelector('[data-sidebar]');

  if (fixed_panels.length > 0) {
    fixed_panels.forEach(panel => {
      if (isEmptyFixedPanel(panel)) {
        panel.classList.add('is-no-layouts');
      }
      else {
        setFixedPanelOffsetVariable(panel.dataset.fixedPanels, panel.offsetHeight);
      }

      if (window.ResizeObserver) {
        let fixedPanelsObserver = new ResizeObserver(entries => {
          entries.forEach(entry => {
            const height = Math.floor(entry.contentRect.height);
            const position = entry.target.dataset.fixedPanels;

            if (isEmptyFixedPanel(entry.target)) {
              entry.target.classList.add('is-no-layouts');
              setFixedPanelOffsetVariable(position, 0);
            } else {
              entry.target.classList.remove('is-no-layouts');
              setFixedPanelOffsetVariable(position, height);
            }

            if (sidebar) {
              checkSidebarHeight();
            }
          });
        });

        fixedPanelsObserver.observe(panel);
      }
    });
  }

  if (sidebar) {
    checkSidebarHeight();
    window.addEventListener('resize', checkSidebarHeight);

    if (window.ResizeObserver) {
      let sidebarObserver = new ResizeObserver(entries => {
        checkSidebarHeight();
      });

      sidebarObserver.observe(sidebar);
    }
  }

  document.body.classList.add('settings_loaded');
});
