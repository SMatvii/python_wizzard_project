document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleButton');
    var sidebar = document.getElementById('sidebar');
    var gearPopup = document.getElementById('gearPopup');
    var overlay = document.getElementById('overlay');
    var gearIcon = document.getElementById('gearIcon');
    var gearIconElement = gearIcon.querySelector('.icon');
    var viewAssortmentBtn = document.getElementById('view-assortment-btn');
    var modeToggle = document.querySelector(".dark-light");

    function closeAll() {
        console.log("Closing all panels");

        if (sidebar.classList.contains('show')) {
            console.log("Closing sidebar");
            sidebar.classList.remove('show');
            setTimeout(() => {
                toggleButton.classList.remove('change');
            }, 300);
        }

        if (gearPopup.classList.contains('show')) {
            console.log("Closing gear popup");
            gearPopup.classList.remove('show');
            gearIconElement.classList.remove('rotate');
            gearIconElement.classList.add('reverse-rotate');
            setTimeout(() => {
                gearIconElement.classList.remove('reverse-rotate');
            }, 600);
        }

        console.log("Closing overlay");
        overlay.classList.remove('show');
    }

    toggleButton.addEventListener('click', function() {
        console.log("Toggle button clicked");
        this.classList.toggle('change');
        if (sidebar.classList.contains('show')) {
            closeAll();
        } else {
            closeAll();
            sidebar.classList.add('show');
            overlay.classList.add('show');
        }
        gearPopup.classList.remove('show');
        gearIconElement.classList.remove('rotate', 'reverse-rotate');
    });

    gearIcon.addEventListener('click', function() {
        console.log("Gear icon clicked");
        if (gearPopup.classList.contains('show')) {
            closeAll();
        } else {
            closeAll();
            gearPopup.classList.add('show');
            gearIconElement.classList.add('rotate');
            overlay.classList.add('show');
            sidebar.classList.remove('show');
            toggleButton.classList.remove('change');
        }
    });

    overlay.addEventListener('click', function() {
        console.log("Overlay clicked");
        closeAll();
    });

    viewAssortmentBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("View Assortment button clicked");
        closeAll();
        sidebar.classList.add('show');
        overlay.classList.add('show');
        toggleButton.classList.add('change');
    });
});