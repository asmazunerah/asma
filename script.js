// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeSkillBars();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeInteractiveElements();
    initializeTypingEffect();
    initializePrintFunctionality();
});

// Animate skill bars on page load
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars with delay
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Scroll animations for elements
function initializeScrollAnimations() {
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

    // Observe all major sections
    const sections = document.querySelectorAll('.section, .experience-item, .skill-card, .education-item, .cert-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Interactive elements and hover effects
function initializeInteractiveElements() {
    // Add click effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add click effects to certification items
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add hover effect to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click to copy functionality for contact info
    const emailElement = document.querySelector('.contact-item span:contains("asmazunerah@gmail.com")');
    const phoneElement = document.querySelector('.contact-item span:contains("+971 50 569 5888")');
    
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showNotification('Email copied to clipboard!');
        });
    }
    
    if (phoneElement) {
        phoneElement.style.cursor = 'pointer';
        phoneElement.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showNotification('Phone number copied to clipboard!');
        });
    }
}

// Typing effect for the professional title
function initializeTypingEffect() {
    const titleElement = document.querySelector('.title');
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

// Enhanced print functionality
function initializePrintFunctionality() {
    const printButton = document.querySelector('.print-button');
    
    printButton.addEventListener('click', function() {
        // Add print-specific styling
        document.body.classList.add('printing');
        
        // Print with a slight delay to ensure styles are applied
        setTimeout(() => {
            window.print();
            document.body.classList.remove('printing');
        }, 100);
    });
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(52, 152, 219, 0.4);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Parallax effect for header
function initializeParallaxEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrollTop < header.offsetHeight) {
            header.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }
    });
}

// Initialize parallax effect
initializeParallaxEffect();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
    <style>
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .notification {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .printing {
            overflow: visible !important;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles);

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
}

monitorPerformance();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'P' to print
    if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            document.querySelector('.print-button').click();
        }
    }
    
    // Press 'Escape' to close any open modals or notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
});

// Add right-click context menu prevention for professional presentation
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Right-click disabled for professional presentation');
});

// Add social media link handlers
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-envelope')) {
                // Email link - already handled by href
                return;
            } else {
                e.preventDefault();
                showNotification('Social media links can be customized in the code');
            }
        });
    });
});

// Add dynamic year update for footer
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.textContent = `© ${currentYear} Asma Zunerah Nizami. All rights reserved.`;
    }
}

updateCopyrightYear();
