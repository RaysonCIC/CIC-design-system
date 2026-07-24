(function() {
  async function loadGlobalComponents() {
    try {
      const [headerRes, footerRes, navRes] = await Promise.all([
        fetch('/components/global-header.html'),
        fetch('/components/global-footer.html'),
        fetch('/components/global-nav.html')
      ]);

      const headerHtml = await headerRes.text();
      const footerHtml = await footerRes.text();
      const navHtml = await navRes.text();

      const gheader = document.getElementById('gheader');
      const gfooter = document.getElementById('gfooter');
      const gnav = document.getElementById('gnav');

      if (gheader) gheader.innerHTML = headerHtml;
      if (gfooter) {
        gfooter.innerHTML = footerHtml;
        const yearSpan = gfooter.querySelector('#global-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
      }
      if (gnav) gnav.innerHTML = navHtml;

      if (window.CIC && typeof window.CIC.initSite === 'function') {
        window.CIC.initSite();
      }
    } catch (e) {
      console.error('Failed to load global components:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGlobalComponents);
  } else {
    loadGlobalComponents();
  }
})();
