const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// --- เพิ่มส่วนนี้ ---
const portfolioDetails = document.querySelectorAll('.portfolio-detail'); // ต้องประกาศตรงนี้ด้วย
const imgSlide = document.querySelector('.portfolio-carousel .img-slide'); // ต้องประกาศตรงนี้ด้วย
// --- สิ้นสุดส่วนที่เพิ่ม ---

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 800);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 800);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// --- ส่วนที่แก้ไข/เพิ่ม สำหรับการจัดการหน้า ---
const activateSection = (sectionIndex) => {
    activePage(); // Clear all active states first

    // Activate the corresponding nav link
    if (navLinks[sectionIndex]) {
        navLinks[sectionIndex].classList.add('active');
    }

    // Activate the corresponding section
    if (sections[sectionIndex]) {
        setTimeout(() => {
            sections[sectionIndex].classList.add('active');
        }, 800);
    }

    // Update URL hash
    // Assumes navLinks text directly relates to section IDs or names
    // For example, if "Home" link points to "#home", "About" to "#about"
    if (navLinks[sectionIndex] && navLinks[sectionIndex].getAttribute('href')) {
        window.location.hash = navLinks[sectionIndex].getAttribute('href').substring(1); // Remove '#'
    }
};

navLinks.forEach((link, idx) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior (jumping to anchor)
        if (!link.classList.contains('active')) {
            activateSection(idx);
        }
    });
});

logoLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    // Logo always goes to the first page (index 0)
    if (!navLinks[0].classList.contains('active')) {
        activateSection(0);
    }
});

// --- ฟังก์ชันสำหรับโหลดหน้าเมื่อเริ่มต้นหรือเมื่อมีการเปลี่ยน Hash ---
const loadPageFromHash = () => {
    const hash = window.location.hash.substring(1); // Get hash without '#'

    if (hash) {
        // Find the index of the nav link that matches the hash
        let targetIndex = -1;
        navLinks.forEach((link, idx) => {
            if (link.getAttribute('href') && link.getAttribute('href').substring(1) === hash) {
                targetIndex = idx;
            }
        });

        if (targetIndex !== -1) {
            activateSection(targetIndex);
        } else {
            // If hash doesn't match any nav link, default to home
            activateSection(0);
        }
    } else {
        // If no hash, default to home page
        activateSection(0);
    }
};

// Call this function when the page loads
window.addEventListener('load', loadPageFromHash);

// Listen for hash changes (e.g., user clicks back/forward in browser)
window.addEventListener('hashchange', loadPageFromHash);
// --- สิ้นสุดส่วนที่แก้ไข/เพิ่ม ---

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn,idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;
const maxIndex = 10; // Assuming 11 portfolio items (0 to 10)

const activePortfolio = () => {
    if (imgSlide) { // Check if imgSlide exists
        imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    }
    else {
        console.error('Element ".portfolio-carousel .img-slide" not found');
    }

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
    if (index < maxIndex) { // Max index should be inclusive
        index++;
        arrowLeft.classList.remove('disabled');
    }
    if (index === maxIndex) { // Check if it's the very last item
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) { // Min index should be 0
        index--;
        arrowRight.classList.remove('disabled');
    }
    if (index === 0) { // Check if it's the very first item
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});

// --- เพิ่มโค้ดนี้ เพื่อให้ Portfolio Carousel ทำงานเมื่อโหลดหน้าครั้งแรก
// และถ้ามี Portfolio Section อยู่ในหน้าปัจจุบัน
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for arrow buttons state
    if (index === 0) {
        arrowLeft.classList.add('disabled');
    }
    if (index === maxIndex) {
        arrowRight.classList.add('disabled');
    }
    activePortfolio(); // Ensure initial portfolio item is active
});