// Show/hide sections based on hash
function showSection() {
    const hash = window.location.hash;
    const sections = document.querySelectorAll('.tool-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    if (hash) {
        const currentSection = document.querySelector(hash);
        currentSection.style.display = 'block';
    }
}

// Cookie consent
function checkCookieConsent() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').classList.add('active');
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').classList.remove('active');
}

// Toggle credits popup
function toggleCredits() {
    document.querySelector('.popup').classList.toggle('active');
}

// BMI Calculator
function calculateBMI() {
    const height = document.getElementById("height").value / 100;
    const weight = document.getElementById("weight").value;
    const bmi = (weight / (height * height)).toFixed(2);
    const bmiResult = document.getElementById("bmiResult");

    let message;
    if (bmi < 18.5) {
        message = `Ditt BMI är ${bmi}. Du är underviktig.`;
        bmiResult.className = "alert";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        message = `Ditt BMI är ${bmi}. Du har normalvikt.`;
        bmiResult.className = "normal";
    } else {
        message = `Ditt BMI är ${bmi}. Du är överviktig.`;
        bmiResult.className = "alert";
    }

    bmiResult.innerHTML = message;
}

// Track Steps
function trackSteps() {
    const stepsInput = document.getElementById("steps");
    const steps = parseInt(stepsInput.value);
    const stepsList = document.getElementById("stepsList");

    if (!steps) {
        alert("Vänligen ange antalet steg.");
        return;
    }

    let stepsData = JSON.parse(localStorage.getItem("stepsData") || "[]");
    stepsData.push({ date: new Date().toLocaleDateString(), steps });
    localStorage.setItem("stepsData", JSON.stringify(stepsData));

    stepsInput.value = "";
    displaySteps(stepsData);
}

// Display Steps
function displaySteps(stepsData) {
    const stepsList = document.getElementById("stepsList");
    stepsList.innerHTML = stepsData.map(entry => `
        <p>${entry.date}: ${entry.steps} steg. ${entry.steps < 10000 ? "Försök att öka din dagliga aktivitet." : "Bra jobbat, du har nått ditt steg-mål för dagen!"}</p>
    `).join("");
}

// Track Calories
function trackCalories() {
    const caloriesInput = document.getElementById("calories");
    const calories = parseInt(caloriesInput.value);
    const caloriesList = document.getElementById("caloriesList");

    if (!calories) {
        alert("Vänligen ange kalorier.");
        return;
    }

    let caloriesData = JSON.parse(localStorage.getItem("caloriesData") || "[]");
    caloriesData.push({ date: new Date().toLocaleDateString(), calories });
    localStorage.setItem("caloriesData", JSON.stringify(caloriesData));

    caloriesInput.value = "";
    displayCalories(caloriesData);
}

// Display Calories
function displayCalories(caloriesData) {
    const caloriesList = document.getElementById("caloriesList");
    caloriesList.innerHTML = caloriesData.map(entry => `
        <p>${entry.date}: ${entry.calories} kalorier.</p>
    `).join("");
}

// Load saved data
function loadSteps() {
    const stepsData = JSON.parse(localStorage.getItem("stepsData") || "[]");
    displaySteps(stepsData);
}

function loadCalories() {
    const caloriesData = JSON.parse(localStorage.getItem("caloriesData") || "[]");
    displayCalories(caloriesData);
}

// Event Listeners
window.addEventListener('load', () => {
    showSection();
    checkCookieConsent();
    loadSteps();
    loadCalories();
});

window.addEventListener('hashchange', showSection);

document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
