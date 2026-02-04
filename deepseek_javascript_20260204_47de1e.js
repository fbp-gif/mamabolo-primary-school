// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const bookingModal = document.getElementById('bookingModal');
const donationModal = document.getElementById('donationModal');
const bookTourBtn = document.getElementById('bookTourBtn');
const donateBtn = document.getElementById('donateBtn');
const closeModalButtons = document.querySelectorAll('.close-modal');
const amountOptions = document.querySelectorAll('.amount-option');
const donationAmountInput = document.getElementById('donationAmount');
const tourForm = document.getElementById('tourForm');
const donationForm = document.getElementById('donationForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Modal Functions
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners for Modals
bookTourBtn.addEventListener('click', () => openModal(bookingModal));
donateBtn.addEventListener('click', () => openModal(donationModal));

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Donation amount buttons
amountOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        amountOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update donation amount input
        const amount = option.getAttribute('data-amount');
        donationAmountInput.value = amount;
    });
});

// Form Submissions
tourForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        purpose: document.getElementById('purpose').value,
        message: document.getElementById('message').value
    };
    
    // In a real application, you would send this data to a server
    console.log('Tour booking submitted:', formData);
    
    // Show success message
    alert('Thank you for booking a school tour! We will contact you within 24 hours to confirm your visit.');
    
    // Close modal and reset form
    closeModal(bookingModal);
    tourForm.reset();
});

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        amount: donationAmountInput.value,
        type: document.getElementById('donationType').value,
        payment: document.querySelector('input[name="payment"]:checked').value,
        receipt: document.getElementById('receipt').checked
    };
    
    // In a real application, you would process the payment here
    console.log('Donation submitted:', formData);
    
    // Show success message
    alert(`Thank you for your donation of R${formData.amount}! A ${formData.receipt ? 'receipt has been sent to your email' : 'confirmation will be sent to your email'}.`);
    
    // Close modal and reset form
    closeModal(donationModal);
    donationForm.reset();
    
    // Reset amount options
    amountOptions.forEach(opt => opt.classList.remove('active'));
});

// Set minimum date for tour booking to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').min = today;

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Dynamic quote of the day (in a real app, this would come from a server)
const quotes = [
    "Optimism, positivity, and amazing can lead to bloom and passionate.",
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Education is not preparation for life; education is life itself. - John Dewey",
    "The roots of education are bitter, but the fruit is sweet. - Aristotle"
];

// Update quote every day
function updateDailyQuote() {
    const quoteText = document.querySelector('.quote-text');
    const quoteDate = document.querySelector('.quote-date');
    
    // Use day of year to get a consistent quote per day
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const quoteIndex = dayOfYear % quotes.length;
    quoteText.textContent = quotes[quoteIndex];
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    quoteDate.textContent = `Positive words of the day - ${now.toLocaleDateString('en-ZA', options)}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDailyQuote();
    
    // Set current year in footer if needed
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Initialize first nav link as active
    if (window.location.hash) {
        const activeLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        }
    } else {
        navLinks[0].classList.add('active');
    }
});

// Weather simulation (in a real app, this would come from a weather API)
function updateWeather() {
    const weatherTemp = document.querySelector('.weather-temp');
    const weatherDesc = document.querySelector('.weather-desc');
    const weatherTime = document.querySelector('.weather-time');
    
    // Simulate different temperatures throughout the day
    const now = new Date();
    const hour = now.getHours();
    
    // Base temperature for Polokwane area
    let baseTemp = 23;
    
    // Adjust based on time of day
    if (hour < 6) baseTemp = 15; // Early morning
    else if (hour < 12) baseTemp = 22; // Morning
    else if (hour < 15) baseTemp = 28; // Afternoon
    else if (hour < 18) baseTemp = 25; // Late afternoon
    else if (hour < 21) baseTemp = 20; // Evening
    else baseTemp = 17; // Night
    
    // Add some random variation
    const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const currentTemp = baseTemp + variation;
    
    // Weather descriptions based on temperature
    let description = "Overcast Clouds";
    if (currentTemp > 25) description = "Sunny";
    else if (currentTemp > 20) description = "Partly Cloudy";
    else if (currentTemp > 15) description = "Overcast Clouds";
    else description = "Cool and Clear";
    
    // Update DOM
    weatherTemp.textContent = `${currentTemp}°C`;
    weatherDesc.textContent = description;
    
    // Update time
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeString = now.toLocaleTimeString('en-ZA', timeOptions);
    const dateString = now.toLocaleDateString('en-ZA', dateOptions);
    weatherTime.textContent = `${timeString}, ${dateString}`;
}

// Update weather every 30 minutes
updateWeather();
setInterval(updateWeather, 30 * 60 * 1000);

// Interactive features for teacher cards
document.querySelectorAll('.staff-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.phase-card, .staff-card, .about-card, .term-card, .sgb-card, .donation-card, .resource-card').forEach(el => {
    observer.observe(el);
});