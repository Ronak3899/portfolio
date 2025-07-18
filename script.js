
// Global variables
let projects = [
  {
    id: '1',
    name: 'Buy The Bundle',
    description: 'A custom digital subscription platform built on WordPress and integrated with WooCommerce, offering access to multiple premium tools under a single membership.',
    image: './images/btb.png',
    link: 'https://example.com/project1',
    technologies: ['WordPress', 'Elementor', 'Payment Gateway', 'WooCommerce']
  },
  {
    id: '2',
    name: 'NSP',
    description: 'A managed IT and cybersecurity services provider based in New Zealand, delivering solutions like cloud infrastructure, secure email, incident response, and modern workplace integration.',
    image: './images/nsp.png',
    link: 'https://nsp.co.nz/',
    technologies: ['WordPress', 'ACF', 'Custom Theme', 'CPT']
  },
  {
    id: '3',
    name: 'Finesse Direct',
    description: 'A digital transformation and AI-enabled software integration partner serving enterprise clients in BFSI, government, healthcare, and energy sectors, with a global presence and a team of 400+ professionals.',
    image: './images/finaese.png',
    link: 'https://finessedirect.com',
    technologies: ['WordPress', 'ACF', 'Custom Theme', 'CPT']
  },
  {
    id: '4',
    name: 'Total Ninja',
    description: 'Africa’s largest inflatable and obstacle course park brand, offering indoor activity zones, parties, team-building events, and merchandise across multiple cities in South Africa.',
    image: './images/totalninja.png',
    link: 'https://totalninja.co.za/',
    technologies: ['WordPress', 'Divi', 'CPT']
  },
  {
    id: '5',
    name: 'AAdvantage Laundry Systems',
    description: 'A commercial and industrial laundry equipment provider in the US, offering equipment sales, leasing (CleanCare program), spare parts, service, and technical support.',
    image: './images/aadvantages.png',
    link: 'https://aadvantagelaundry.spynrtech.com',
    technologies: ['WordPress', 'Elementor', 'CPT']
  },
  {
    id: '6',
    name: 'ABE’S Electric Inc.',
    description: 'A licensed electrical contractor based in Florida, offering residential, commercial, and industrial electrical services, including generators, financing options, and special discounts.',
    image: './images/abes.png',
    link: 'https://abeselectric.com/',
    technologies: ['WordPress', 'Elementor', 'CPT']
  },
  {
    id: '7',
    name: 'ContactSync – Google Contacts Integration for WooCommerce',
    description: 'A WordPress plugin that syncs WooCommerce customer data with Google Contacts in real time, streamlining contact management and CRM workflows.',
    image: './images/contact-sync.png',
    link: 'https://wordpress.org/plugins/contactsync-integration-of-google-contacts-for-woocommerce/',
    technologies: ['WordPress Plugin', 'WooCommerce', 'Google Contacts API', 'CRM Sync']
  },
  {
    id: '8',
    name: 'Post Porter',
    description: 'A developer-focused WordPress plugin to transfer posts and custom post types between sites using the REST API, with secure key-based authentication and background processing support.',
    image: './images/post-porter.png',
    link: 'https://wordpress.org/plugins/post-porter/',
    technologies: ['WordPress Plugin', 'REST API', 'Background Processing']
  },
  {
    id: '9',
    name: 'Wot Elementor Widgets',
    description: 'A lightweight Elementor plugin that adds flexible widgets like TabFlex, Tab Slider, Post Slider, and Testimonials Slider to enhance site design and interactivity.',
    image: './images/wot-widget.png',
    link: 'https://wordpress.org/plugins/wot-elementor-widgets/',
    technologies: ['WordPress Plugin', 'Elementor', 'Custom Widgets']
  }
];


let editingProjectId = null;

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme + '-theme';
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.className = newTheme + '-theme';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling and active section highlighting
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set active section
    handleScroll();
    
    // Initialize projects
    renderProjects();
});

// Handle scroll for navigation
function handleScroll() {
    const sections = ['hero', 'experience', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (section && navLink) {
            const { offsetTop, offsetHeight } = section;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to current link
                navLink.classList.add('active');
            }
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Project click handler
function handleProjectClick(project) {
    if (project.link) {
        window.open(project.link, '_blank');
    }
}


function renderProjects() {
    const projectsContainer = document.getElementById('projects-grid');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" data-id="${project.id}" onclick="handleProjectClick(${JSON.stringify(project).replace(/"/g, '&quot;')})">
            <div class="project-image">
                <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

