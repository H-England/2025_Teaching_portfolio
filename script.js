document.addEventListener('DOMContentLoaded', function() {
 const darkModeToggle = document.getElementById('dark-mode-toggle');
 const body = document.body;

 function updateButtonIcon() {
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? "☀️" : "🌙"
 }

 // Check for saved user preference, if any, and apply it
 const userPrefersDark = localStorage.getItem('darkMode') === 'true';
 if (userPrefersDark) {
     body.classList.add('dark-mode');
 }

 updateButtonIcon();

 darkModeToggle.addEventListener('click', function() {
     body.classList.toggle('dark-mode');

     // Save the user preference to local storage
     const isDarkMode = body.classList.contains('dark-mode');
     localStorage.setItem('darkMode', isDarkMode)

     updateButtonIcon();
 });
});

