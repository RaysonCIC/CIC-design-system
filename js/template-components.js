(function() {
  async function loadTemplateComponents() {
    try {
      const [headerRes, footerRes] = await Promise.all([
        fetch('/components/templates-global-header.html'),
        fetch('/components/templates-global-footer.html')
      ]);

      const headerHtml = await headerRes.text();
      const footerHtml = await footerRes.text();

      const tplHeader = document.getElementById('tpl-header');
      const tplFooter = document.getElementById('tpl-footer');

      if (tplHeader) {
        tplHeader.innerHTML = headerHtml;
      }
      if (tplFooter) {
        tplFooter.innerHTML = footerHtml;
        const yearSpan = tplFooter.querySelector('#global-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
      }

      if (window.CIC && typeof window.CIC.initSite === 'function') {
        window.CIC.initSite();
      }
    } catch (e) {
      console.error('Failed to load template components:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTemplateComponents);
  } else {
    loadTemplateComponents();
  }
})();
