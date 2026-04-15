(function () {
    var STORAGE_KEY = 'vercel_analytics_consent';
    var ANALYTICS_SCRIPT_ID = 'vercel-analytics-script';
    var banner = document.getElementById('analytics-consent-banner');
    var acceptBtn = document.getElementById('analytics-accept-btn');
    var declineBtn = document.getElementById('analytics-decline-btn');

    if (!banner || !acceptBtn || !declineBtn) {
        return;
    }

    function loadAnalytics() {
        if (document.getElementById(ANALYTICS_SCRIPT_ID)) {
            return;
        }

        var script = document.createElement('script');
        script.id = ANALYTICS_SCRIPT_ID;
        script.async = true;
        script.src = 'https://cdn.vercel-insights.com/v1/script.js';
        document.head.appendChild(script);
    }

    function hideBanner() {
        banner.style.display = 'none';
    }

    function showBanner() {
        banner.style.display = 'flex';
    }

    var consent = localStorage.getItem(STORAGE_KEY);

    if (consent === 'accepted') {
        hideBanner();
        loadAnalytics();
    } else if (consent === 'declined') {
        hideBanner();
    } else {
        showBanner();
    }

    acceptBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        loadAnalytics();
        hideBanner();
    });

    declineBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'declined');
        hideBanner();
    });
})();
