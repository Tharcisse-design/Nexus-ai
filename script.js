/* ===== NEXUS AI ENHANCED SCRIPT ===== */

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupContactForm();
    setupScrollAnimations();
    setupSmoothScroll();
    setupLiveChat();
    setupAnalytics();
    setupSEO();
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.style.display = 'none';
                hamburger.classList.remove('active');
            });
        });
    }
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            // Store in localStorage for demo
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            // Send email notification
            sendEmailNotification(formData);

            // Show success message
            showNotification('Message envoyé avec succès! ✅', 'success');
            form.reset();

            // Track event
            trackEvent('contact_form_submitted', formData);
        });
    }
}

// Send Email Notification
async function sendEmailNotification(formData) {
    try {
        // Utiliser EmailJS ou un service backend
        const emailData = {
            to_email: 'contact@nexus-ai.com',
            from_email: formData.email,
            from_name: formData.name,
            subject: `Nouveau message de ${formData.name}`,
            message: `
                Nom: ${formData.name}
                Email: ${formData.email}
                Entreprise: ${formData.company}
                Téléphone: ${formData.phone}
                Service: ${formData.service}
                Message: ${formData.message}
            `
        };

        // Note: À intégrer avec EmailJS ou backend
        console.log('Email notification:', emailData);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .blog-card, .why-card, .pricing-card, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scroll
function setupSmoothScroll() {
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
}

// WhatsApp Button
function openWhatsApp() {
    const phoneNumber = '243853981699';
    const message = 'Bonjour, je souhaite discuter des services de Nexus AI.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Live Chat
function setupLiveChat() {
    const chatButton = document.querySelector('.chat-button');
    const liveChatWidget = document.getElementById('liveChatWidget');

    if (chatButton) {
        chatButton.addEventListener('click', toggleChat);
    }

    // Auto-show chat after 5 seconds
    setTimeout(() => {
        if (!sessionStorage.getItem('chatShown')) {
            toggleChat();
            sessionStorage.setItem('chatShown', 'true');
        }
    }, 5000);
}

function toggleChat() {
    const widget = document.getElementById('liveChatWidget');
    const button = document.querySelector('.chat-button');
    
    if (widget.classList.contains('open')) {
        widget.classList.remove('open');
        button.innerHTML = '<i class="fas fa-comments"></i>';
    } else {
        widget.classList.add('open');
        button.innerHTML = '<i class="fas fa-times"></i>';
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    const messagesContainer = document.getElementById('chatMessages');
    const userMessageEl = document.createElement('div');
    userMessageEl.className = 'chat-message user-message';
    userMessageEl.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(userMessageEl);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        const botMessageEl = document.createElement('div');
        botMessageEl.className = 'chat-message bot-message';
        botMessageEl.innerHTML = `<p>Merci pour votre message! Notre équipe vous répondra bientôt. 👋</p>`;
        messagesContainer.appendChild(botMessageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        trackEvent('chat_message_sent', { message });
    }, 1000);
}

// Stripe Checkout
function openStripeCheckout(plan) {
    const prices = {
        starter: 'price_starter_123', // Replace with actual Stripe price ID
        growth: 'price_growth_456'
    };

    const stripe = Stripe('pk_test_YOUR_STRIPE_KEY'); // Replace with actual key
    stripe.redirectToCheckout({
        lineItems: [{ price: prices[plan], quantity: 1 }],
        mode: 'subscription',
        successUrl: window.location.href + '?success=true',
        cancelUrl: window.location.href
    });

    trackEvent('checkout_initiated', { plan });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = 5 + index * 2;
        blob.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const number = parseInt(entry.target.textContent);
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
});

// Active Link Highlight on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Notification System
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInNotification 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Export Functions for Global Use
window.App = {
    openWhatsApp,
    toggleChat,
    sendChatMessage,
    openStripeCheckout,
    showNotification,
    validateForm
};

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + ? for help
    if ((e.ctrlKey || e.metaKey) && e.key === '?') {
        e.preventDefault();
        console.log('Help: Press Ctrl+M for mobile menu toggle');
    }

    // Escape to close chat
    if (e.key === 'Escape') {
        const widget = document.getElementById('liveChatWidget');
        if (widget && widget.classList.contains('open')) {
            toggleChat();
        }
    }
});

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ANALYTICS =====
function setupAnalytics() {
    // Google Analytics
    if (window.location.hostname !== 'localhost') {
        setupGoogleAnalytics();
    }

    // Track page views
    trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title
    });

    // Track user interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-primary')) {
            trackEvent('cta_click', {
                text: e.target.textContent,
                location: e.target.parentElement.className
            });
        }
    });
}

function setupGoogleAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID'); // Replace with actual ID

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);
}

function trackEvent(eventName, eventData = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Local tracking
    const events = JSON.parse(localStorage.getItem('userEvents') || '[]');
    events.push({
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('userEvents', JSON.stringify(events.slice(-100)));

    console.log('Event tracked:', eventName, eventData);
}

// ===== SEO OPTIMIZATION =====
function setupSEO() {
    // Structured Data (Schema.org)
    addStructuredData();

    // Dynamic meta tags
    updateMetaTags();

    // Sitemap reference
    addSitemapReference();

    // Robots.txt reference
    addRobotsReference();
}

function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Nexus AI',
        'url': window.location.href,
        'logo': 'https://nexus-ai.netlify.app/logo.png',
        'description': 'Solutions IA révolutionnaires pour transformer votre business',
        'sameAs': [
            'https://linkedin.com/company/nexus-ai',
            'https://twitter.com/nexus-ai'
        ],
        'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Customer Service',
            'telephone': '+243853981699',
            'email': 'contact@nexus-ai.com'
        }
    });
    document.head.appendChild(script);
}

function updateMetaTags() {
    const metas = {
        'og:image': 'https://nexus-ai.netlify.app/og-image.png',
        'twitter:card': 'summary_large_image',
        'twitter:title': 'Nexus AI - Solutions IA Premium',
        'twitter:description': 'Transformez votre business avec l\'IA',
        'twitter:image': 'https://nexus-ai.netlify.app/og-image.png'
    };

    for (const [name, content] of Object.entries(metas)) {
        const meta = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
        if (meta) {
            meta.content = content;
        }
    }
}

function addSitemapReference() {
    const link = document.createElement('link');
    link.rel = 'sitemap';
    link.type = 'application/xml';
    link.href = '/sitemap.xml';
    document.head.appendChild(link);
}

function addRobotsReference() {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    document.head.appendChild(meta);
}

// Performance monitoring
function setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log(`${entry.name}: ${entry.duration}ms`);
                trackEvent('performance_metric', {
                    name: entry.name,
                    duration: entry.duration
                });
            });
        });

        observer.observe({ entryTypes: ['measure'] });
    }
}

// Initialize on load
setupPerformanceMonitoring();

// Service Worker Registration
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

// Console message
console.log('%cNexus AI - IA Premium Solutions 🚀', 'color: #00d4ff; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(0,212,255,0.5);');
console.log('%cContactez-nous: +243 853 981 699', 'color: #10b981; font-size: 14px;');
console.log('%cEmail: contact@nexus-ai.com', 'color: #10b981; font-size: 14px;');