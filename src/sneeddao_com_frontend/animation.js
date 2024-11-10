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
