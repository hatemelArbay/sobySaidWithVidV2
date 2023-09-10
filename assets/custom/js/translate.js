// Function to toggle the language
function toggleLanguage() {
    console.log('toggleLanguage function called');
    const englishElements = document.querySelectorAll('.en');
    const arabicElements = document.querySelectorAll('.ar');

    // Check the state of the checkbox
    const checkbox = document.getElementById('language-toggle');
    const isEnglish = checkbox.checked;

    // Update text based on the selected language
    if (isEnglish) {
        englishElements.forEach((element) => {
            element.style.display = 'inline'; // Show English elements
        });
        arabicElements.forEach((element) => {
            element.style.display = 'none'; // Hide Arabic elements
        });
    } else {
        englishElements.forEach((element) => {
            element.style.display = 'none'; // Hide English elements
        });
        arabicElements.forEach((element) => {
            element.style.display = 'inline'; // Show Arabic elements
        });
    }
}

// Add event listener to the checkbox
const languageToggle = document.getElementById('language-toggle');
languageToggle.addEventListener('change', toggleLanguage);

// Initially, set the language based on the initial state of the checkbox
toggleLanguage();
