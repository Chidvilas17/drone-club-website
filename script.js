// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function moveCarousel(n) {
    currentSlide += n;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateCarousel();
}

function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const offset = -currentSlide * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Update active class
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Auto-rotate carousel
let carouselInterval = setInterval(() => {
    moveCarousel(1);
}, 5000);

// Pause carousel on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
});

// Modal functionality
function openModal(title, description) {
    const modal = document.getElementById('roleModal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');

    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modal.style.display = 'block';

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

function closeModal() {
    document.getElementById('roleModal').style.display = 'none';
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                behavior: 'smooth'
            }); 

            // Close dropdown if open
            const dropdown = document.querySelector('.dropdown-menu');
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        }
    });
});

// Close dropdown when clicking elsewhere
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        if (!event.target.closest('.dropdown') && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    });
});

// Initialize carousel
updateCarousel();