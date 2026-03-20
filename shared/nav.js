/**
 * Software DS — Shared Side Navigation
 * Include this script on any page to inject the design system sidebar.
 *
 * Usage:  <script src="../shared/nav.js"></script>   (relative path)
 *
 * The script auto-detects base path and current page, highlighting the active link.
 */
(function () {
  /* ---- Auto-detect base path (works on localhost and subdirectory deploys like GitHub Pages) ---- */
  var scriptSrc = document.currentScript && document.currentScript.src;
  var basePath = '/';
  if (scriptSrc) {
    // Script is at <base>/shared/nav.js — strip "/shared/nav.js" to get base
    var url = new URL(scriptSrc);
    basePath = url.pathname.replace(/\/shared\/nav\.js$/i, '') || '/';
    if (!basePath.endsWith('/')) basePath += '/';
  }

  /* ---- Load Material Symbols font globally ---- */
  if (!document.querySelector('link[href*="Material+Symbols"]')) {
    const msLink = document.createElement('link');
    msLink.rel = 'stylesheet';
    msLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
    document.head.appendChild(msLink);
  }

  /* ---- CSS ---- */
  const style = document.createElement('style');
  style.textContent = `
    /* Layout: sidebar + content side by side */
    body.has-ds-nav {
      margin: 0;
      padding: 0 !important;
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar */
    .ds-nav {
      position: sticky;
      top: 0;
      align-self: flex-start;
      z-index: 1000;
      width: 220px;
      min-width: 220px;
      height: 100vh;
      overflow-y: auto;
      background: var(--sds-nav-sidebar-bg);
      border-right: 1px solid var(--sds-border-default);
      font-family: var(--sds-font-sans);
      font-size: var(--sds-type-label);
      display: flex;
      flex-direction: column;
      padding: var(--sds-space-500) var(--sds-space-300) var(--sds-space-600);
      box-sizing: border-box;
    }

    /* Home / logo link */
    .ds-nav-home {
      display: flex;
      align-items: center;
      gap: var(--sds-space-250);
      text-decoration: none;
      padding: var(--sds-space-100) var(--sds-space-200);
      margin-bottom: var(--sds-space-600);
    }
    .ds-nav-logo {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: var(--sds-interactive-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ds-nav-logo svg {
      width: 14px;
      height: 14px;
      fill: var(--sds-text-on-primary);
    }
    .ds-nav-title {
      font-size: var(--sds-type-title);
      font-weight: var(--sds-weight-semibold);
      color: var(--sds-text-primary);
      white-space: nowrap;
    }

    /* Group label */
    .ds-nav-group {
      font-size: var(--sds-type-overline);
      font-weight: var(--sds-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: var(--sds-nav-section-header);
      padding: var(--sds-space-500) var(--sds-space-300) var(--sds-space-150);
      line-height: 1;
    }
    .ds-nav-group:first-of-type {
      padding-top: 0;
    }

    /* Nav links */
    .ds-nav-link {
      display: flex;
      align-items: center;
      gap: var(--sds-space-250);
      padding: var(--sds-space-200) var(--sds-space-300);
      border-radius: 8px;
      text-decoration: none;
      color: var(--sds-nav-item-text);
      font-size: var(--sds-type-body);
      font-weight: var(--sds-weight-regular);
      white-space: nowrap;
      margin: var(--sds-space-050) 0;
      line-height: 1.3;
      transition: background 0.12s ease, color 0.12s ease;
    }
    .ds-nav-link:hover {
      background: var(--sds-bg-subtle);
      color: var(--sds-text-primary);
    }
    .ds-nav-link.is-active {
      background: var(--sds-nav-item-active-bg);
      color: var(--sds-nav-item-active-text);
      font-weight: var(--sds-weight-medium);
    }
    .ds-nav-link .material-symbols-outlined {
      font-size: 20px;
      color: currentColor;
      flex-shrink: 0;
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
    }
    .ds-nav-link:hover .material-symbols-outlined {
      color: var(--sds-text-primary);
    }
    .ds-nav-link.is-active .material-symbols-outlined {
      color: var(--sds-nav-item-active-text);
    }

    /* Content wrapper */
    .ds-page-content {
      flex: 1;
      min-width: 0;
      padding: var(--sds-space-1200) var(--sds-space-1000);
      overflow-x: hidden;
    }
  `;
  document.head.appendChild(style);

  /* ---- Navigation items ---- */
  const items = [
    { group: 'Foundations', links: [
      { label: 'Colors',    href: '/docs/color-palette.html', icon: 'palette' },
      { label: 'Icons',     href: '/docs/icons.html',         icon: 'icons' },
      { label: 'Space',     href: '/docs/space-scale.html',   icon: 'space' },
      { label: 'Type',      href: '/docs/type-scale.html',    icon: 'type' },
    ]},
    { group: 'Components', links: [
      { label: 'Accordion',        href: '/components/accordion.html',        icon: 'accordion' },
      { label: 'Alerts',           href: '/components/alerts.html',           icon: 'alert' },
      { label: 'Avatars',          href: '/components/avatars.html',          icon: 'avatar' },
      { label: 'Badges',           href: '/components/badges.html',           icon: 'badge' },
      { label: 'Banner',           href: '/components/banner.html',           icon: 'banner' },
      { label: 'Breadcrumbs',      href: '/components/breadcrumbs.html',      icon: 'breadcrumb' },
      { label: 'Buttons',          href: '/components/buttons.html',          icon: 'button' },
      { label: 'Cards',            href: '/components/cards.html',            icon: 'card' },
      { label: 'Code Block',       href: '/components/code-block.html',       icon: 'codeblock' },
      { label: 'Command Palette',  href: '/components/command-palette.html',  icon: 'cmdpalette' },
      { label: 'Data Lists',       href: '/components/data-lists.html',       icon: 'datalist' },
      { label: 'Date Picker',      href: '/components/date-picker.html',      icon: 'datepicker' },
      { label: 'Dropdown Menus',   href: '/components/dropdown-menus.html',   icon: 'dropdown' },
      { label: 'Empty States',     href: '/components/empty-states.html',     icon: 'emptystate' },
      { label: 'File Upload',      href: '/components/file-upload.html',      icon: 'fileupload' },
      { label: 'Filter Bar',       href: '/components/filter-bar.html',       icon: 'filterbar' },
      { label: 'Form Inputs',      href: '/components/form-inputs.html',      icon: 'form' },
      { label: 'Header',           href: '/components/header.html',           icon: 'header' },
      { label: 'Inline Edit',      href: '/components/inline-edit.html',      icon: 'inlineedit' },
      { label: 'Modals',           href: '/components/modals.html',           icon: 'modal' },
      { label: 'Notification Center', href: '/components/notification-center.html', icon: 'notifcenter' },
      { label: 'Pagination',       href: '/components/pagination.html',       icon: 'pagination' },
      { label: 'Popover',          href: '/components/popover.html',          icon: 'popover' },
      { label: 'Progress',         href: '/components/progress.html',         icon: 'progress' },
      { label: 'Search',           href: '/components/search.html',           icon: 'search' },
      { label: 'Segmented Control', href: '/components/segmented-control.html', icon: 'segmented' },
      { label: 'Selection Controls', href: '/components/selection-controls.html', icon: 'selection' },
      { label: 'Side Navigation',  href: '/components/side-navigation.html',  icon: 'sidebar' },
      { label: 'Side Panel',       href: '/components/side-panel.html',       icon: 'sidepanel' },
      { label: 'Skeleton Loaders', href: '/components/skeleton-loaders.html', icon: 'skeleton' },
      { label: 'Split View',       href: '/components/split-view.html',       icon: 'splitview' },
      { label: 'Status Indicator', href: '/components/status-indicator.html', icon: 'statusindicator' },
      { label: 'Stepper',          href: '/components/stepper.html',          icon: 'stepper' },
      { label: 'Tables',           href: '/components/tables.html',           icon: 'table' },
      { label: 'Tabs',             href: '/components/tabs.html',             icon: 'tabs' },
      { label: 'Tags',             href: '/components/tags.html',             icon: 'tag' },
      { label: 'Timeline',         href: '/components/timeline.html',         icon: 'timeline' },
      { label: 'Toasts',           href: '/components/toasts.html',           icon: 'toast' },
      { label: 'Tooltips',         href: '/components/tooltips.html',         icon: 'tooltip' },
      { label: 'Tree View',        href: '/components/tree-view.html',        icon: 'treeview' },
    ]},
    { group: 'Data Display', links: [
      { label: 'Chart Cards',       href: '/components/chart-cards.html',     icon: 'chartcard' },
      { label: 'Info Visualization', href: '/components/info-viz-cards.html', icon: 'infoviz' },
      { label: 'Insight Cards',     href: '/components/insight-cards.html',   icon: 'insightcard' },
      { label: 'KPI & Metrics',     href: '/components/kpi-cards.html',      icon: 'kpimetric' },
      { label: 'Stat Cards',        href: '/components/stat-card.html',      icon: 'statcard' },
    ]},
    { group: 'Data Visualization', links: [
      { label: 'Area Chart',     href: '/data-viz/area-chart.html',     icon: 'area' },
      { label: 'Bar Chart',      href: '/data-viz/bar-chart.html',      icon: 'bar' },
      { label: 'Donut Chart',    href: '/data-viz/donut-chart.html',    icon: 'donut' },
      { label: 'Histogram',      href: '/data-viz/histogram.html',      icon: 'histogram' },
      { label: 'Line Chart',     href: '/data-viz/line-chart.html',     icon: 'line' },
      { label: 'Waterfall',      href: '/data-viz/waterfall-chart.html', icon: 'waterfall' },
    ]},
    { group: 'Tools', links: [
      { label: 'Color Sampler', href: '/docs/color-sampler.html', icon: 'sampler' },
    ]},
  ];

  /* ---- Icons (Material Symbols) ---- */
  const icons = {
    palette:    'palette',
    header:     'web_asset',
    button:     'smart_button',
    sidebar:    'view_sidebar',
    card:       'dashboard',
    tag:        'sell',
    tabs:       'tab',
    sampler:    'colorize',
    bar:        'bar_chart',
    line:       'show_chart',
    area:       'area_chart',
    donut:      'donut_large',
    waterfall:  'waterfall_chart',
    histogram:  'equalizer',
    space:      'space_bar',
    type:       'title',
    table:      'table_chart',
    toast:      'notifications',
    form:       'text_fields',
    modal:      'open_in_new',
    dropdown:   'menu',
    tooltip:    'chat_bubble_outline',
    avatar:     'account_circle',
    progress:   'progress_activity',
    selection:  'check_box',
    icons:      'grid_view',
    accordion:  'expand_circle_down',
    alert:      'campaign',
    badge:      'verified',
    breadcrumb: 'chevron_right',
    cmdpalette: 'terminal',
    datalist:   'list_alt',
    datepicker: 'calendar_today',
    emptystate: 'inbox',
    fileupload: 'cloud_upload',
    pagination: 'last_page',
    popover:    'picture_in_picture',
    search:     'search',
    sidepanel:  'side_navigation',
    skeleton:   'hourglass_empty',
    stepper:    'linear_scale',
    banner:     'flag',
    codeblock:  'code',
    filterbar:  'filter_alt',
    inlineedit: 'edit_note',
    infoviz:     'bubble_chart',
    insightcard: 'lightbulb',
    chartcard:   'insert_chart',
    kpimetric:   'speed',
    notifcenter:'notifications_active',
    segmented:  'toggle_on',
    splitview:  'vertical_split',
    statcard:   'analytics',
    statusindicator: 'circle',
    timeline:   'timeline',
    treeview:   'account_tree',
  };

  /* ---- Detect active page ---- */
  const path = window.location.pathname;
  const fullUrl = window.location.origin + path;
  const normPath = path.replace(/\/index$/, '/').replace(/\.html$/, '').replace(/\/$/, '');

  /* ---- Build sidebar HTML ---- */
  const nav = document.createElement('nav');
  nav.className = 'ds-nav';
  nav.setAttribute('aria-label', 'Design system');

  // Home link
  const homeLink = document.createElement('a');
  homeLink.className = 'ds-nav-home';
  homeLink.href = basePath + 'index.html';
  homeLink.innerHTML = `
    <span class="ds-nav-logo"><svg viewBox="0 0 16 16"><path d="M6 1v5.3L3.2 11a2.5 2.5 0 0 0 2.1 4h5.4a2.5 2.5 0 0 0 2.1-4L10 6.3V1H6zm1.5 1h1v5l3 5a1 1 0 0 1-.8 1.5H5.3A1 1 0 0 1 4.5 12l3-5V2z"/></svg></span>
    <span class="ds-nav-title">Design System Lab</span>
  `;
  nav.appendChild(homeLink);

  items.forEach(function (group) {
    const label = document.createElement('div');
    label.className = 'ds-nav-group';
    label.textContent = group.group;
    nav.appendChild(label);

    group.links.forEach(function (link) {
      const a = document.createElement('a');
      a.className = 'ds-nav-link';
      a.href = basePath + link.href.replace(/^\//, '');
      // Strip hash for page-level matching
      const hrefNoHash = a.href.replace(/#.*$/, '');
      const normHref = hrefNoHash.replace(/\.html$/, '').replace(/\/$/, '');
      var normFullUrl = fullUrl.replace(/\.html$/, '').replace(/\/$/, '');
      const linkPath = link.href.replace(/^\//, '').replace(/#.*$/, '');
      if (normFullUrl === normHref || normPath === normHref || path.endsWith(linkPath)) {
        a.classList.add('is-active');
      }
      a.innerHTML = '<span class="material-symbols-outlined">' + (icons[link.icon] || '') + '</span><span>' + link.label + '</span>';
      nav.appendChild(a);
    });
  });

  /* ---- Inject ---- */
  document.body.insertBefore(nav, document.body.firstChild);

  // Wrap existing body content in a container
  const children = Array.from(document.body.children).filter(function (el) {
    return el !== nav;
  });
  const wrapper = document.createElement('div');
  wrapper.className = 'ds-page-content';
  children.forEach(function (child) {
    wrapper.appendChild(child);
  });
  document.body.appendChild(wrapper);

  document.body.classList.add('has-ds-nav');
  document.body.style.padding = '0';
  document.body.style.margin = '0';

  /* ---- Persist nav scroll position across page loads ---- */
  const SCROLL_KEY = 'ds-nav-scroll';

  // Restore saved scroll position
  const saved = sessionStorage.getItem(SCROLL_KEY);
  if (saved !== null) {
    nav.scrollTop = parseInt(saved, 10);
  } else {
    // First visit — scroll active item into view
    const active = nav.querySelector('.is-active');
    if (active) {
      active.scrollIntoView({ block: 'center' });
    }
  }

  // Save scroll position before navigating away
  window.addEventListener('beforeunload', function () {
    sessionStorage.setItem(SCROLL_KEY, nav.scrollTop);
  });
})();
