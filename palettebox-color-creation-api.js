/*Generator function start*/

const colorPicker = document.getElementById('colorPicker');
    const colorDisplay = document.getElementById('colorDisplay');
    const addColorButton = document.getElementById('addColor');
    const resetColorButton = document.getElementById('resetColor'); // Reset button
    const randomColorButton = document.getElementById('randomColorButton'); // Random color button
    const clearPaletteButton = document.getElementById('clearPalette'); // Clear palette button
    const sharePaletteButton = document.getElementById('sharePalette'); // Share palette button
    const colorPalette = document.getElementById('colorPalette');
    const hexCodeInput = document.getElementById('hexCode');
    const paletteCanvas = document.getElementById('paletteCanvas');

    // Update the display box and hex code with the selected color
    colorPicker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        colorDisplay.style.backgroundColor = selectedColor;
        hexCodeInput.value = selectedColor; // Display hex code
    });

    // Update the color picker and display box when a valid hex code is entered
    hexCodeInput.addEventListener('input', () => {
        const hexValue = hexCodeInput.value;

        // Check if the entered value is a valid hex color
        if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hexValue)) {
            colorPicker.value = hexValue; // Update color picker
            colorDisplay.style.backgroundColor = hexValue; // Update display box
        }
    });

    // Add selected color to the palette
    addColorButton.addEventListener('click', () => {
        addColorToPalette();
    });

    // Reset the color picker to a specific default color when reset button is clicked
    resetColorButton.addEventListener('click', () => {
        const defaultColor = '#ffabdc'; // Define your default color here
        resetColorPicker(defaultColor);
    });

    // Function to add the current color to the palette
    function addColorToPalette() {
        const selectedColor = colorPicker.value;

        // Create a new div for the palette
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('palette-color');
        colorDiv.style.backgroundColor = selectedColor;

        // Add click event to remove color from palette
        colorDiv.addEventListener('click', () => {
            colorPalette.removeChild(colorDiv);
        });

        // Append the new color to the palette
        colorPalette.appendChild(colorDiv);
    }

    // Function to reset the color picker and related elements
    function resetColorPicker(defaultColor) {
        colorPicker.value = defaultColor; // Reset the picker
        colorDisplay.style.backgroundColor = defaultColor; // Update display box
        hexCodeInput.value = defaultColor; // Update hex code input
    }

   // Function to generate a random hex color and update the picker and display
   function generateRandomHexColor() {
       const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
       
       // Update the picker, display box, and hex code input with the random value
       colorPicker.value = randomHex;
       colorDisplay.style.backgroundColor = randomHex;
       hexCodeInput.value = randomHex;
   }

   // Event listener for random color button
   randomColorButton.addEventListener('click', generateRandomHexColor);

   // Function to clear all colors from the palette
   function clearPalette() {
       while (colorPalette.firstChild) {
           colorPalette.removeChild(colorPalette.firstChild);
       }
   }

   // Event listener for clear palette button
   clearPaletteButton.addEventListener('click', clearPalette);

   // Function to share the current palette as an image
   function sharePalette() {
       const colors = Array.from(colorPalette.children).map(div => div.style.backgroundColor);
       
       if (colors.length === 0) return alert("No colors in palette!");

       const canvasContext = paletteCanvas.getContext('2d');
       
       // Set canvas dimensions based on number of colors
       const boxSize = 50; // Size of each box in pixels
       paletteCanvas.width = boxSize * colors.length; 
       paletteCanvas.height = boxSize;

       colors.forEach((color, index) => {
           canvasContext.fillStyle = color;
           canvasContext.fillRect(index * boxSize, 0, boxSize, boxSize);
       });

       // Convert canvas to data URL and create a link for sharing
       const dataURL = paletteCanvas.toDataURL();
       
       const link = document.createElement('a');
       link.href = dataURL;
       link.download = 'palette.png'; // Name of the downloaded file
       link.click();
   }

   // Event listener for share palette button
   sharePaletteButton.addEventListener('click', sharePalette);

   // Keyboard shortcut (Ctrl + `) to add the current color to the palette
   document.addEventListener('keydown', (event) => {
       if (event.ctrlKey && event.key === '`') { // Ctrl + `
           event.preventDefault(); // Prevent default action if needed
           addColorToPalette();
       }
   });
