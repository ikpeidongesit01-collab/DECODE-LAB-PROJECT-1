
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('audit-contact-form');
    const successBox = document.getElementById('form-success-box');
    const submitBtn = document.getElementById('submit-audit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic HTML5 validation pass check
        if (!form.checkValidity()) {
            return;
        }

        submitBtn.innerText = "SUBMITTING TICKET...";
        submitBtn.disabled = true;

        setTimeout(() => {
            successBox.style.display = 'flex';
            form.reset();
            submitBtn.innerText = "SUBMIT AUDIT REQUEST";
            submitBtn.disabled = false;
            
            // Smooth scroll up to success box
            successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const chartPath = document.getElementById('chart-path');
    const monthlyBtn = document.getElementById('btn-monthly');
    const weeklyBtn = document.getElementById('btn-weekly');
    const applyBtn = document.getElementById('apply-filters-btn');
    const filterAsset = document.getElementById('filter-asset');
    
    // Path data definitions
    const monthlyPath = "M 50 160 Q 120 120 190 140 T 330 90 T 470 110 T 610 50 T 750 40";
    const weeklyPath = "M 50 80 Q 120 150 190 110 T 330 180 T 470 60 T 610 90 T 750 120";

    // Monthly vs Weekly toggles
    monthlyBtn.addEventListener('click', () => {
        monthlyBtn.classList.add('chart-toggle--active');
        weeklyBtn.classList.remove('chart-toggle--active');
        chartPath.setAttribute('d', monthlyPath);
        updateChartPoints(monthlyPath);
    });

    weeklyBtn.addEventListener('click', () => {
        weeklyBtn.classList.add('chart-toggle--active');
        monthlyBtn.classList.remove('chart-toggle--active');
        chartPath.setAttribute('d', weeklyPath);
        updateChartPoints(weeklyPath);
    });

    function updateChartPoints(pathStr) {
        // Smoothly update points
        const svg = document.getElementById('chart-svg');
        const circles = svg.querySelectorAll('circle');
        
        // Set fixed mock coordinates based on the paths above
        const coords = pathStr === monthlyPath 
            ? [{x: 50, y: 160}, {x: 190, y: 140}, {x: 330, y: 90}, {x: 470, y: 110}, {x: 610, y: 50}, {x: 750, y: 40}]
            : [{x: 50, y: 80}, {x: 190, y: 110}, {x: 330, y: 180}, {x: 470, y: 60}, {x: 610, y: 90}, {x: 750, y: 120}];

        circles.forEach((circle, idx) => {
            if (coords[idx]) {
                circle.setAttribute('cx', coords[idx].x);
                circle.setAttribute('cy', coords[idx].y);
            }
        });
    }

    // Apply filters interaction
    applyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        applyBtn.innerText = "REFRESHING...";
        applyBtn.disabled = true;

        setTimeout(() => {
            // Update stats randomly to show dynamic feedback
            const randomDom = Math.floor(Math.random() * 5) + 95; // 95 - 99%
            const randomBem = Math.floor(Math.random() * 8) + 90; // 90 - 97%
            const randomLighthouse = Math.floor(Math.random() * 7) + 93; // 93 - 99%

            document.getElementById('val-dom').innerText = `${randomDom}%`;
            document.getElementById('val-bem').innerText = `${randomBem}%`;
            document.getElementById('val-lighthouse').innerText = `${randomLighthouse}%`;

            // Update lighthouse bar
            const lighthouseBar = document.getElementById('bar-lighthouse');
            lighthouseBar.style.width = `${randomLighthouse}%`;
            if (randomLighthouse >= 95) {
                lighthouseBar.className = "status-indicator__bar status-indicator__bar--success";
            } else {
                lighthouseBar.className = "status-indicator__bar status-indicator__bar--warning";
            }

            // Add log item to activity log
            const activityList = document.getElementById('activity-list');
            const newItem = document.createElement('li');
            newItem.className = "activity-item";
            
            const assetName = filterAsset.options[filterAsset.selectedIndex].text;
            newItem.innerHTML = `
                <span class="activity-item__status activity-item__status--success"></span>
                <div class="activity-item__details">
                    <p class="activity-item__desc">Filters applied for: ${assetName}</p>
                    <span class="activity-item__time">Just now</span>
                </div>
            `;
            activityList.insertBefore(newItem, activityList.firstChild);
            if (activityList.children.length > 5) {
                activityList.removeChild(activityList.lastChild);
            }

            applyBtn.innerText = "APPLY FILTERS";
            applyBtn.disabled = false;
        }, 800);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const headerNav = document.getElementById('header-nav');

    // Open mobile slide menu
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            headerNav.classList.add('header__nav--open');
            if (menuOverlay) menuOverlay.classList.add('header__overlay--visible');
            menuToggle.setAttribute('aria-expanded', 'true');
        });
    }

    // Close mobile slide menu
    const closeMenu = () => {
        if (headerNav) {
            headerNav.classList.remove('header__nav--open');
            if (menuOverlay) menuOverlay.classList.remove('header__overlay--visible');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Close mobile menu when links are clicked (useful for sitemap links & contact hash anchors)
    const links = document.querySelectorAll('.header__link');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
