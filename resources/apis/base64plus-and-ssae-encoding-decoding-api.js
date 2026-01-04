
// Base64 Encoding and Decoding Functions
       function generateSecretCode(input) {
           const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
           return btoa(unescape(encodeURIComponent(input + '|' + randomString))); // Encode original input with a random string
       }

       function decodeSecretCode(secretCode) {
           const decoded = decodeURIComponent(escape(atob(secretCode)));
           const parts = decoded.split('|');
           return parts[0]; // Return the original input
       }

       // Generate a random character mapping for custom encoding
       function generateCharMap() {
           const originalChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:\'",.<>?`~ 😊';
           const shuffledChars = originalChars.split('').sort(() => Math.random() - 0.5).join('');
           const charMap = {};
           for (let i = 0; i < originalChars.length; i++) {
               charMap[originalChars[i]] = shuffledChars[i];
           }
           return charMap;
       }

       const charMap = generateCharMap();
       
       function encode(input) {
           return input.split('').map(char => charMap[char] || char).join('');
       }

       function decode(encoded) {
           const reversedMap = Object.fromEntries(Object.entries(charMap).map(([key, value]) => [value, key]));
           return encoded.split('').map(char => reversedMap[char] || char).join('');
       }

       function formatOutput(text) {
           return text.match(/.{1,15}/g).join('\n'); // Split into chunks of up to 15 characters without HTML tags
       }

       function escapeHtml(unsafe) {
           return unsafe
               .replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
       }

       document.getElementById('generate-btn').addEventListener('click', function() {
           const inputText = document.getElementById('input-text').value;

           if (!inputText) {
               alert("Please enter some text or a URL.");
               return;
           }

           const mode = document.querySelector('input[name="mode"]:checked').value;

           if (mode === 'base64') {
               const secretCode = generateSecretCode(inputText);
               
               // Display the generated secret code
               document.getElementById('output').innerHTML = 'Generated Secret Code:<br><br>' + formatOutput(secretCode) + '<br><br>';

               // Show the copy button for the secret code
               document.getElementById('copy-secret-btn').style.display = 'inline-block';

               // Clear the decode output
               document.getElementById('decoded-output').innerText = '';
               
               // Hide the copy button for decoded input
               document.getElementById('copy-decoded-btn').style.display = 'none';
           } else if (mode === 'custom') {
               const secretCode = encode(inputText);
               
               // Display the generated secret code
               document.getElementById('output').innerHTML = 'Generated Secret Code:<br><br>' + formatOutput(secretCode) + '<br><br>';

               // Show the copy button for the secret code
               document.getElementById('copy-secret-btn').style.display = 'inline-block';

               // Clear the decode output
               document.getElementById('decoded-output').innerText = '';
               
               // Hide the copy button for decoded input
               document.getElementById('copy-decoded-btn').style.display = 'none';
           }
       });

       document.getElementById('clear-btn').addEventListener('click', function() {
           document.getElementById('input-text').value = '';
           document.getElementById('output').innerHTML = '';
           
           // Clear decode fields
           document.getElementById('decode-input').value = '';
           document.getElementById('decoded-output').innerText = '';

           // Hide both copy buttons
           document.getElementById('copy-secret-btn').style.display = 'none';
           document.getElementById('copy-decoded-btn').style.display = 'none';
       });

       document.getElementById('decode-btn').addEventListener('click', function() {
           const secretCode = document.getElementById('decode-input').value;

           if (!secretCode) {
               alert("Please enter a secret code.");
               return;
           }

           const mode = document.querySelector('input[name="mode"]:checked').value;

           if (mode === 'base64') {
               try {
                   const originalInput = decodeSecretCode(secretCode);
                   document.getElementById('decoded-output').innerHTML = 'Original Input:<br><br>' + escapeHtml(formatOutput(originalInput)) + '<br><br>';

                   // Show the copy button for the decoded input
                   document.getElementById('copy-decoded-btn').style.display = 'inline-block';
                   document.getElementById('copy-secret-btn').style.display = 'none';
               } catch (error) {
                   alert("Invalid secret code.");
                   document.getElementById('decoded-output').innerText = '';
                   // Hide the copy button for decoded input
                   document.getElementById('copy-decoded-btn').style.display = 'none';
               }
           } else if (mode === 'custom') {
               try {
                   const originalInput = decode(secretCode);
                   document.getElementById('decoded-output').innerHTML = 'Original Input:<br><br>' + escapeHtml(formatOutput(originalInput)) + '<br><br>';

                   // Show the copy button for the decoded input
                   document.getElementById('copy-decoded-btn').style.display = 'inline-block';
                   document.getElementById('copy-secret-btn').style.display = 'none';
               } catch (error) {
                   alert("Invalid secret code.");
                   document.getElementById('decoded-output').innerText = '';
                   // Hide the copy button for decoded input
                   document.getElementById('copy-decoded-btn').style.display = 'none';
               }
           }
       });

       // Copy Secret Code to Clipboard (only the code)
       document.getElementById('copy-secret-btn').addEventListener('click', function() {
           const secretCodeTextArray = document.getElementById('output')
              .innerHTML.split('<small>')[0]; // Get only the code part without hint

          navigator.clipboard.writeText(secretCodeTextArray.replace("Generated Secret Code:<br>", "").replace(/<br>/g, "\n")).then(() => { 
              alert("Secret code copied to clipboard!"); 
          });
       });

       // Copy Decoded Input to Clipboard (only the original input)
       document.getElementById('copy-decoded-btn').addEventListener('click', function() {
          const decodedInputTextArray = document.getElementById('decoded-output')
              .innerText.replace("Original Input:\n", ""); // Remove label

          navigator.clipboard.writeText(decodedInputTextArray).then(() => {
              alert("Decoded input copied to clipboard!");
          });
       });

       // Clear Decode Section
       document.getElementById('clear-decode-btn').addEventListener('click', function() {
          document.getElementById('decode-input').value = '';
          document.getElementById('decoded-output').innerText = '';
          
          // Hide the copy button for decoded input
          document.getElementById('copy-decoded-btn').style.display = 'none';
      });
