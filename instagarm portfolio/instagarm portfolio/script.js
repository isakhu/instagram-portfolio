// Sample project data - you can modify this with your actual projects
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
        category: "web",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        liveDemo: "https://your-demo-link.com",
        sourceCode: "https://github.com/yishaktule/ecommerce-platform"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
        category: "web",
        tags: ["Vue.js", "Firebase", "Socket.io", "CSS3"],
        liveDemo: "https://your-demo-link.com",
        sourceCode: "https://github.com/yishaktule/task-manager"
    },
    {
        id: 3,
        title: "Mobile Banking App UI",
        description: "Modern and intuitive mobile banking application interface design with focus on user experience and accessibility.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",
        category: "design",
        tags: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
        liveDemo: "https://your-figma-link.com",
        sourceCode: "#"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        description: "Real-time weather dashboard with interactive maps, forecasts, and weather alerts using OpenWeather API.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=400&fit=crop",
        category: "web",
        tags: ["JavaScript", "API Integration", "Chart.js", "CSS Grid"],
        liveDemo: "https://your-demo-link.com",
        sourceCode: "https://github.com/yishaktule/weather-dashboard"
    },
    {
        id: 5,
        title: "Brand Identity Design",
        description: "Complete brand identity package including logo design, color palette, typography, and brand guidelines for a tech startup.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
        category: "design",
        tags: ["Branding", "Logo Design", "Adobe Illustrator", "Brand Guidelines"],
        liveDemo: "https://your-behance-link.com",
        sourceCode: "#"
    },
    {
        id: 6,
        title: "Social Media Analytics",
        description: "Analytics dashboard for social media metrics with data visualization, reporting features, and automated insights.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
        category: "web",
        tags: ["Python", "Django", "D3.js", "PostgreSQL"],
        liveDemo: "https://your-demo-link.com",
        sourceCode: "https://github.com/yishaktule/social-analytics"
    }
];

// DOM Elements
const themeToggle = document.getElementById('theme-icon');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('project-modal');
const closeBtn = document.querySelector('.close-btn');
const tabBtns = document.querySelectorAll('.tab-btn');

// Theme Management
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        themeToggle.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Gallery Functions
function createProjectCard(project) {
    return `
        <div class="gallery-item" data-category="${project.category}" onclick="openModal(${project.id})">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x400/f0f0f0/999999?text=Project+Image'">
            <div class="gallery-overlay">
                <div class="overlay-content">
                    <h3 class="overlay-title">${project.title}</h3>
                    <p class="overlay-description">${project.description.substring(0, 80)}...</p>
                </div>
            </div>
        </div>
    `;
}

function renderGallery(filter = 'all') {
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    gallery.innerHTML = filteredProjects.map(createProjectCard).join('');
    
    // Add animation to gallery items
    const items = gallery.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        setTimeout(() => {
            item.style.transition = 'all 0.2s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 30);
    });
}

// Modal Functions
function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalTags = modal.querySelector('.modal-tags');
    const liveDemo = modal.querySelector('.live-demo');
    const sourceCode = modal.querySelector('.source-code');
    
    modalImage.src = project.image;
    modalImage.onerror = function() {
        this.src = 'https://via.placeholder.com/800x300/f0f0f0/999999?text=Project+Image';
    };
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    modalTags.innerHTML = project.tags.map(tag => 
        `<span class="modal-tag">${tag}</span>`
    ).join('');
    
    liveDemo.href = project.liveDemo;
    sourceCode.href = project.sourceCode;
    
    // Hide source code button if no link provided
    if (project.sourceCode === '#') {
        sourceCode.style.display = 'none';
    } else {
        sourceCode.style.display = 'inline-flex';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Tab Functions
function switchTab(filter) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${filter}"]`).classList.add('active');
    renderGallery(filter);
}

// Smooth Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.profile-section, .gallery-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'all 0.3s ease';
        observer.observe(el);
    });
}

// Button Interactions
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .social-icon, .tab-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Profile Picture Click Effect
function addProfileEffects() {
    const profileImg = document.getElementById('profile-img');
    
    profileImg.addEventListener('click', function() {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    renderGallery();
    addScrollAnimations();
    addButtonEffects();
    addProfileEffects();
});

themeToggle.addEventListener('click', toggleTheme);

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-tab');
        switchTab(filter);
    });
});

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Contact button functionality
document.querySelector('.message-btn').addEventListener('click', function() {
    // You can customize this with your preferred contact method
    window.location.href = 'mailto:yishak.tule@example.com?subject=Hello Yishak!';
});

// Follow button functionality
document.querySelector('.follow-btn').addEventListener('click', function() {
    const btn = this;
    const icon = btn.querySelector('i');
    const text = btn.childNodes[2];
    
    if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        icon.className = 'fas fa-user-plus';
        text.textContent = ' Follow';
        btn.style.background = 'var(--bg-secondary)';
        btn.style.color = 'var(--text-primary)';
    } else {
        btn.classList.add('following');
        icon.className = 'fas fa-user-check';
        text.textContent = ' Following';
        btn.style.background = 'var(--gradient)';
        btn.style.color = 'white';
    }
});

// No typing animation - text appears immediately

// Modern Interactive Features

// Floating Action Button
const floatingBtn = document.getElementById('floating-btn');
const fabItems = document.querySelectorAll('.fab-item');

floatingBtn.addEventListener('click', function() {
    this.classList.toggle('active');
});

// FAB Menu Actions
fabItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const action = this.getAttribute('data-action');
        handleFabAction(action);
        floatingBtn.classList.remove('active');
    });
});

function handleFabAction(action) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        switch(action) {
            case 'upload':
                showToast('📸 Photo upload feature coming soon!');
                break;
            case 'story':
                showToast('📱 Story feature coming soon!');
                break;
            case 'live':
                showToast('🔴 Live streaming feature coming soon!');
                break;
        }
    }, 1500);
}

// Toast Notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Loading Overlay
function showLoading() {
    document.getElementById('loading-overlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('show');
}

// Story Highlights Interaction
document.querySelectorAll('.story-highlight').forEach(story => {
    story.addEventListener('click', function() {
        const label = this.querySelector('.story-label').textContent;
        showToast(`📖 Opening ${label} story highlights...`);
        
        // Add ripple effect
        const ring = this.querySelector('.story-ring');
        ring.style.transform = 'scale(1.1)';
        setTimeout(() => {
            ring.style.transform = 'scale(1)';
        }, 200);
    });
});

// Enhanced Profile Picture Interaction
const profileImg = document.getElementById('profile-img');
let clickCount = 0;

profileImg.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 1) {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    } else if (clickCount === 3) {
        // Easter egg - triple click
        showToast('🎉 You found the easter egg! Triple click master!');
        this.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            this.style.filter = 'none';
        }, 1000);
        clickCount = 0;
    }
    
    // Reset click count after 1 second
    setTimeout(() => {
        if (clickCount < 3) clickCount = 0;
    }, 1000);
});

// Parallax Effect on Mouse Move
document.addEventListener('mousemove', function(e) {
    const profileSection = document.querySelector('.profile-section');
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const y = (e.clientY / window.innerHeight) * 10 - 5;
    
    profileSection.style.transform = `perspective(1000px) rotateY(${x * 0.5}deg) rotateX(${y * 0.5}deg)`;
});

// Enhanced Button Interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Verification Badge Click
document.querySelector('.verified-badge').addEventListener('click', function() {
    showToast('✅ Verified by Instagram as a Professional Photographer!');
    this.style.animation = 'none';
    setTimeout(() => {
        this.style.animation = 'pulse 2s infinite';
    }, 100);
});

// Enhanced Gallery Interactions
function enhanceGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach((item, index) => {
        // Add hover sound effect (visual feedback)
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Double-click to like
        let lastClick = 0;
        item.addEventListener('click', function(e) {
            const now = Date.now();
            if (now - lastClick < 300) {
                e.preventDefault();
                // Double click detected
                showLikeAnimation(this);
                showToast('❤️ Photo liked!');
            }
            lastClick = now;
        });
    });
}

// Like Animation
function showLikeAnimation(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 3rem;
        pointer-events: none;
        z-index: 1000;
        animation: likeAnimation 0.8s ease forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 800);
}

// Add like animation CSS
const likeAnimationCSS = `
@keyframes likeAnimation {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
}
`;

const style = document.createElement('style');
style.textContent = likeAnimationCSS;
document.head.appendChild(style);

// Close FAB menu when clicking outside
document.addEventListener('click', function(e) {
    if (!floatingBtn.contains(e.target)) {
        floatingBtn.classList.remove('active');
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'L' to toggle theme
    if (e.key.toLowerCase() === 'l') {
        toggleTheme();
        showToast('🌓 Theme toggled!');
    }
    
    // Press 'F' to open FAB menu
    if (e.key.toLowerCase() === 'f') {
        floatingBtn.classList.toggle('active');
    }
    
    // Press 'Escape' to close everything
    if (e.key === 'Escape') {
        floatingBtn.classList.remove('active');
        closeModal();
    }
});

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceGalleryItems();
    
    // Show welcome message
    setTimeout(() => {
        showToast('👋 Welcome to Yishak\'s Photography Portfolio!');
    }, 1000);
});

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization - Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.gallery-item, .story-highlight, .social-icon').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    animationObserver.observe(el);
});

// Professional Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll progress bar
    addScrollProgress();
    
    // Add smooth scrolling for navigation
    addSmoothScrolling();
    
    // Add navbar scroll effects
    addNavbarEffects();
    
    // Add floating action button functionality
    addFloatingButtonFeatures();
    
    // Add form validation
    addFormValidation();
    
    // Add loading animations
    addLoadingAnimations();
    
    // Add parallax effects
    addParallaxEffects();
});

// Scroll Progress Bar
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Smooth Scrolling Navigation
function addSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Navbar Scroll Effects
function addNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced Floating Action Button
function addFloatingButtonFeatures() {
    const floatingBtn = document.getElementById('floating-btn');
    const fabItems = document.querySelectorAll('.fab-item');
    
    floatingBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Add functionality to fab items
    fabItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleFabAction(action);
            floatingBtn.classList.remove('active');
        });
    });
}

function handleFabAction(action) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    switch(action) {
        case 'upload':
            toastMessage.textContent = 'Photo upload feature coming soon!';
            showToast();
            break;
        case 'story':
            toastMessage.textContent = 'Story creation feature coming soon!';
            showToast();
            break;
        case 'live':
            toastMessage.textContent = 'Live streaming feature coming soon!';
            showToast();
            break;
    }
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form Validation (Frontend Only)
function addFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('input[placeholder="Your Name"]').value;
            const email = form.querySelector('input[placeholder="Your Email"]').value;
            const service = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            // Validation
            if (!name || !email || !service || !message) {
                showToastMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToastMessage('Please enter a valid email address', 'error');
                return;
            }
            
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('show');
            
            // Simulate form submission (since backend isn't working)
            setTimeout(() => {
                loadingOverlay.classList.remove('show');
                
                // Create mailto link to open email client
                const subject = `Photography Inquiry - ${service}`;
                const body = `Hello Yishak,

I'm interested in your ${service} service.

Name: ${name}
Email: ${email}
Service: ${service}

Message:
${message}

Please get back to me at your earliest convenience.

Best regards,
${name}`;
                
                const mailtoLink = `mailto:yishakhak@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoLink;
                
                showToastMessage('Opening your email client... If it doesn\'t work, please email me directly at yishakhak@gmail.com', 'success');
                form.reset();
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced toast message function
function showToastMessage(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-content i');
    
    toastMessage.textContent = message;
    
    // Update icon and color based on type
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#ef4444';
        toast.style.borderLeft = '4px solid #ef4444';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#10b981';
        toast.style.borderLeft = '4px solid #10b981';
    }
    
    showToast();
}

// Portfolio works with static data (no backend needed)
function loadPortfolio() {
    // Portfolio already loaded with static data in projects array
    renderGallery();
}

// Services work with static HTML (no backend needed)
function loadServices() {
    // Services are already in the HTML, no backend needed
    console.log('Services loaded from HTML');
}

// Loading Animations
function addLoadingAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate children with delay
                const children = entry.target.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.services-section, .testimonials-section, .gallery-section').forEach(section => {
        observer.observe(section);
        
        // Initially hide elements
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        
        // Hide children initially
        section.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.5s ease';
        });
    });
}

// Parallax Effects
function addParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced Story Highlights
document.querySelectorAll('.story-highlight').forEach(story => {
    story.addEventListener('click', function() {
        const storyLabel = this.querySelector('.story-label').textContent;
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = `Viewing ${storyLabel} story highlights`;
        showToast();
    });
});

// Professional Button Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Auto-update copyright year
const currentYear = new Date().getFullYear();
document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = currentYear;
});

// Professional typing effect for hero subtitle
function typeWriterPro(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    setTimeout(type, 1000);
}

// Initialize professional features
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriterPro(heroSubtitle, originalText, 60);
    }
    
    // Load static data (no backend needed)
    loadPortfolio();
    loadServices();
}, 2000);

// Initialize everything when page loads (Frontend Only)
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    renderGallery();
    addScrollAnimations();
    addButtonEffects();
    addProfileEffects();
    
    // Add scroll progress bar
    addScrollProgress();
    
    // Add smooth scrolling for navigation
    addSmoothScrolling();
    
    // Add navbar scroll effects
    addNavbarEffects();
    
    // Add floating action button functionality
    addFloatingButtonFeatures();
    
    // Add form validation (frontend only)
    addFormValidation();
    
    // Add loading animations
    addLoadingAnimations();
    
    // Add parallax effects
    addParallaxEffects();
});