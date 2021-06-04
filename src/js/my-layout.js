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

  let checkSidebarHeigth = () => {
    const aside_area = document.querySelector('.page_layout > aside');
    const sidebar = document.querySelector('[data-sidebar]');
    const fixed_panel_top = document.querySelector('[data-fixed-panels="top"]');
    
    let height_fixed_top_panel = 0;
    
    if (fixed_panel_top) {
      height_fixed_top_panel = fixed_panel_top.offsetHeight;
    }
    
    if (sidebar.offsetHeight > (document.documentElement.clientHeight - height_fixed_top_panel)) {
      aside_area.classList.add('is-large');
    }
    else {
      aside_area.classList.remove('is-large');
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
              checkSidebarHeigth();
            }
          });
        });

        fixedPanelsObserver.observe(panel); 
      }
    });
  }

  if (sidebar) {
    checkSidebarHeigth();
    window.addEventListener('resize', checkSidebarHeigth);

    if (window.ResizeObserver) {
      let sidebarObserver = new ResizeObserver(entries => {
        checkSidebarHeigth();
      });

      sidebarObserver.observe(sidebar);
    }
  }
});