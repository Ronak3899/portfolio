
// Global variables
let projects = [
    {
        id: '1',
        name: 'WooCommerce Google Contacts Sync',
        description: 'A WordPress plugin that automatically syncs WooCommerce customer contacts with Google Contacts using real-time updates, duplicate prevention, and embedded support videos.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
        link: 'https://example.com/project1',
        github: 'https://github.com/ronakhapaliya/woo-google-contacts-sync',
        technologies: ['WordPress', 'PHP', 'Google Contacts API', 'WooCommerce', 'JavaScript']
    },
    {
        id: '2',
        name: 'Dynamic PDF Generation System',
        description: 'A system that allows users to customize and download product datasheets on demand with real-time customization options and responsive design.',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
        link: 'https://example.com/project2',
        github: 'https://github.com/ronakhapaliya/dynamic-pdf-generator',
        technologies: ['PHP', 'JavaScript', 'PDF Generation', 'MySQL', 'CSS3']
    },
    {
        id: '3',
        name: 'Headless WordPress with React',
        description: 'A modern headless WordPress setup using React for frontend and WordPress as a backend CMS, providing fast performance and excellent user experience.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
        link: 'https://example.com/project3',
        github: 'https://github.com/ronakhapaliya/headless-wp-react',
        technologies: ['React', 'WordPress REST API', 'JavaScript', 'CSS3', 'Headless CMS']
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
                <div class="project-links">
                    ${project.link ? `<span style="font-size: 0.875rem; color: var(--text-muted);">Click to view project</span>` : ''}
                    ${project.github ? `<span style="font-size: 0.875rem; color: var(--text-muted);">GitHub available</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

