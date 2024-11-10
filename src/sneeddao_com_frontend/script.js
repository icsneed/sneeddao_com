// Mobile Navigation Toggle Function
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');

    navbar.classList.toggle('show');
    menuToggle.classList.toggle('active');
}

// Smooth Scrolling for Dropdown Menu Links
document.querySelectorAll('.dropdown-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            // Close the menu after clicking
            const navbar = document.getElementById('navbar');
            navbar.classList.remove('show');
            document.querySelector('.menu-toggle').classList.remove('active');
        }
    });
});

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = document.querySelector('header').contains(event.target);
    if (!isClickInside) {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    }
});

// Fetch data for the ticker
function fetchTickerData() {
    fetch('https://suemn-5aaaa-aaaap-qb62q-cai.icp0.io/sneed-lock')
        .then(response => response.json())
        .then(data => {
            // Assuming the data contains 'icpTreasury', 'tvlSneedLock', and 'projectsSneedLocked' fields
            document.getElementById('icpTreasury').textContent = data.icpTreasury || 'N/A';
            document.getElementById('tvlSneedLock').textContent = data.tvlSneedLock || 'N/A';
            document.getElementById('projectsSneedLocked').textContent = data.projectsSneedLocked || 'N/A';
        })
        .catch(error => {
            //console.error('Error fetching ticker data:', error);
            //document.getElementById('ticker').innerHTML = 'Unable to load data at this time.';
        });
}

function startAnimation() {
    var canvas = document.getElementById('blankCanvas');
    var ctx = canvas.getContext('2d');
    var code = [
        'actor ReplyToPost {',
        '  public query func reply() : async Text {',
        '    return "Sneed";',
        '  };',
        '};',
        '// written by the community'
    ];
    var lineIndex = 0;
    var charIndex = 0;
    var x = 50;
    var y = 100;
    var lineHeight = 30;

    // Ensure the font is loaded before using it
    document.fonts.load('24px Roboto').then(function() {
        ctx.font = '24px Roboto';
        ctx.fillStyle = '#333';
        writeCode();
    });

    var imageDisplayed = false; // Flag to check if image has been displayed

    function writeCode() {
        if (lineIndex < code.length) {
            if (charIndex < code[lineIndex].length) {
                ctx.fillText(code[lineIndex][charIndex], x, y);
                x += ctx.measureText(code[lineIndex][charIndex]).width;
                charIndex++;
                setTimeout(writeCode, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                x = 50;
                y += lineHeight;
                setTimeout(writeCode, 200);
            }
        } else if (!imageDisplayed) {
            displayImage();
        } else {
            // Loop the animation
            setTimeout(clearCanvas, 1500);
        }
    }

    function displayImage() {
        var img = new Image();
        img.onload = function() {
            // Scale image down to 5% of its original size
            var imgWidth = img.width * 0.05; // 5% of original width
            var imgHeight = img.height * 0.05; // 5% of original height
            ctx.drawImage(img, 50, y - 10, imgWidth, imgHeight);
            imageDisplayed = true;
            setTimeout(writeCode, 2000); // Pause before restarting animation
        };
        img.onerror = function() {
            console.error('Error loading image.');
            imageDisplayed = true;
            setTimeout(writeCode, 2000);
        };
        img.src = 'placeholder-animation.png';
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Reset variables
        lineIndex = 0;
        charIndex = 0;
        x = 50;
        y = 100;
        imageDisplayed = false;
        writeCode();
    }
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('disclaimer-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Call the function to fetch data when the page loads
window.onload = function() {
    fetchTickerData();
    startAnimation();
};

