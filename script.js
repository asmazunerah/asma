// Enhanced Portfolio Interactive Features with Modern Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeSkillBars();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeInteractiveElements();
    initializeTypingEffect();
    initializePrintFunctionality();
    initializeFloatingElements();
    initializeParticleBackground();
    initializeProgressiveImageLoading();
    initializeTextRevealAnimations();
    initializeMorphingShapes();
    initializeInteractiveHoverEffects();
    initializeCountUpAnimations();
    initializeWaveAnimations();
});

// Animate skill bars with enhanced effects
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            
            // Add pulse effect when skill bar completes
            setTimeout(() => {
                bar.style.animation = 'skillPulse 0.5s ease-in-out';
            }, 800);
        }, index * 200);
    });
}

// Enhanced scroll animations with multiple effects
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation') || 'fadeInUp';
                
                element.style.opacity = '1';
                element.classList.add(`animate-${animationType}`);
                
                // Add stagger effect for multiple elements
                if (element.classList.contains('stagger-item')) {
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;
                    element.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe all sections with enhanced animations
    const sections = document.querySelectorAll('.section, .experience-item, .skill-card, .education-item, .cert-item');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.classList.add('animate-ready');
        section.setAttribute('data-animation', getRandomAnimation());
        section.setAttribute('data-delay', index * 100);
        observer.observe(section);
    });
}

// Random animation selector
function getRandomAnimation() {
    const animations = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'zoomIn', 'bounceIn', 'slideInUp'];
    return animations[Math.floor(Math.random() * animations.length)];
}

// Enhanced smooth scrolling with easing
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target, 1000);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(target, duration) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.offsetTop - 80;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced interactive elements with advanced hover effects
function initializeInteractiveElements() {
    // Magnetic hover effect for cards
    const cards = document.querySelectorAll('.skill-card, .cert-item, .experience-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });

        // Mouse follow effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
    });

    // Enhanced contact item interactions
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.style.color = 'white';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = '';
            this.style.color = '';
        });
    });

    // Enhanced click to copy functionality
    const emailElement = document.querySelector('.contact-item span:contains("asmazunerah@gmail.com")');
    const phoneElement = document.querySelector('.contact-item span:contains("+971 50 569 5888")');
    
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showEnhancedNotification('Email copied to clipboard!', 'success');
            this.style.animation = 'copySuccess 0.5s ease-in-out';
        });
    }
    
    if (phoneElement) {
        phoneElement.style.cursor = 'pointer';
        phoneElement.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showEnhancedNotification('Phone number copied to clipboard!', 'success');
            this.style.animation = 'copySuccess 0.5s ease-in-out';
        });
    }
}

// Enhanced typing effect with cursor
function initializeTypingEffect() {
    const titleElement = document.querySelector('.title');
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    titleElement.appendChild(cursor);
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleElement.insertBefore(document.createTextNode(originalText.charAt(i)), cursor);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                cursor.style.opacity = '0';
            }, 2000);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Floating elements animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = 2 + Math.random() * 3;
        const amplitude = 20 + Math.random() * 30;
        const phase = Math.random() * Math.PI * 2;
        
        function animate() {
            const time = Date.now() * 0.001;
            const y = Math.sin(time * speed + phase) * amplitude;
            element.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Particle background animation
function initializeParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.6;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 152, 219, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(52, 152, 219, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
}

// Progressive image loading with fade-in effect
function initializeProgressiveImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Text reveal animations
function initializeTextRevealAnimations() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 50}ms`;
            span.className = 'reveal-char';
            element.appendChild(span);
        });
    });
}

// Morphing shapes animation
function initializeMorphingShapes() {
    const shapes = document.querySelectorAll('.morphing-shape');
    
    shapes.forEach(shape => {
        let morphState = 0;
        
        setInterval(() => {
            morphState = (morphState + 1) % 4;
            const borderRadius = [
                '50% 50% 50% 50%',
                '30% 70% 70% 30%',
                '70% 30% 30% 70%',
                '40% 60% 60% 40%'
            ][morphState];
            
            shape.style.borderRadius = borderRadius;
            shape.style.transform = `rotate(${morphState * 90}deg)`;
        }, 2000);
    });
}

// Interactive hover effects with mouse tracking
function initializeInteractiveHoverEffects() {
    const interactiveElements = document.querySelectorAll('.interactive-element');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const tiltX = deltaY * 20;
            const tiltY = deltaX * -20;
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Count up animations for numbers
function initializeCountUpAnimations() {
    const countElements = document.querySelectorAll('.count-up');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.target);
                let current = 0;
                const increment = target / 100;
                const duration = 2000;
                const stepTime = duration / 100;
                
                const counter = setInterval(() => {
                    current += increment;
                    element.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(counter);
                    }
                }, stepTime);
                
                countObserver.unobserve(element);
            }
        });
    });
    
    countElements.forEach(element => countObserver.observe(element));
}

// Wave animations for backgrounds
function initializeWaveAnimations() {
    const waveContainers = document.querySelectorAll('.wave-container');
    
    waveContainers.forEach(container => {
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = `wave wave-${i + 1}`;
            wave.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 200%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                animation: wave${i + 1} ${4 + i}s infinite linear;
                transform: translateX(-50%);
            `;
            container.appendChild(wave);
        }
    });
}

// Enhanced notification system
function showEnhancedNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        error: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        warning: 'linear-gradient(135deg, #ffa726 0%, #ffcc02 100%)',
        info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(400px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Enhanced parallax effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize all enhanced features
initializeParallaxEffect();

// Enhanced CSS animations
const enhancedStyles = `
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes bounceIn {
            0%, 20%, 40%, 60%, 80%, 100% {
                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }
            0% {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
            20% {
                transform: scale3d(1.1, 1.1, 1.1);
            }
            40% {
                transform: scale3d(.9, .9, .9);
            }
            60% {
                opacity: 1;
                transform: scale3d(1.03, 1.03, 1.03);
            }
            80% {
                transform: scale3d(.97, .97, .97);
            }
            100% {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes skillPulse {
            0%, 100% {
                transform: scaleY(1);
            }
            50% {
                transform: scaleY(1.1);
            }
        }
        
        @keyframes copySuccess {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            }
        }
        
        @keyframes wave1 {
            0% {
                transform: translateX(-50%) translateY(0);
            }
            100% {
                transform: translateX(-50%) translateY(-100px);
            }
        }
        
        @keyframes wave2 {
            0% {
                transform: translateX(-50%) translateY(0);
            }
            100% {
                transform: translateX(-50%) translateY(-120px);
            }
        }
        
        @keyframes wave3 {
            0% {
                transform: translateX(-50%) translateY(0);
            }
            100% {
                transform: translateX(-50%) translateY(-140px);
            }
        }
        
        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
            animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
            animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-zoomIn {
            animation: zoomIn 0.8s ease-out forwards;
        }
        
        .animate-bounceIn {
            animation: bounceIn 1s ease-out forwards;
        }
        
        .animate-slideInUp {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        .typing-cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% {
                opacity: 1;
            }
            51%, 100% {
                opacity: 0;
            }
        }
        
        .reveal-char {
            display: inline-block;
            opacity: 0;
            animation: revealChar 0.6s ease-out forwards;
        }
        
        @keyframes revealChar {
            from {
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
            }
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                filter: blur(5px);
            }
            to {
                opacity: 1;
                filter: blur(0);
            }
        }
        
        .morphing-shape {
            transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .interactive-element {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-icon {
            font-size: 18px;
            font-weight: bold;
        }
        
        body {
            overflow-x: hidden;
        }
        
        .animate-ready {
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', enhancedStyles);

// Enhanced loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add entrance animation for main elements
    setTimeout(() => {
        const mainElements = document.querySelectorAll('header, main, footer');
        mainElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Performance monitoring with enhanced metrics
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            console.log(`DOM content loaded: ${domContentLoaded}ms`);
            
            // Show performance notification for development
            if (loadTime > 3000) {
                showEnhancedNotification('Page load time is slow. Consider optimizing assets.', 'warning');
            }
        });
    }
}

monitorPerformance();

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            document.querySelector('.print-button').click();
        }
    }
    
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(400px) scale(0.8)';
                setTimeout(() => {
                    notification.parentNode.removeChild(notification);
                }, 400);
            }
        });
    }
    
    // Add scroll to top on Home key
    if (e.key === 'Home') {
        e.preventDefault();
        smoothScrollTo(document.body, 1000);
    }
    
    // Add scroll to bottom on End key
    if (e.key === 'End') {
        e.preventDefault();
        smoothScrollTo(document.body, 1000, document.body.scrollHeight);
    }
});

// Enhanced right-click prevention with animation
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    // Create ripple effect at cursor position
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: ${e.clientY - 25}px;
        left: ${e.clientX - 25}px;
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: rippleEffect 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    showEnhancedNotification('Right-click disabled for professional presentation', 'info');
});

// Add ripple effect keyframes
const rippleStyles = `
    <style>
        @keyframes rippleEffect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    </style>
`;
document.head.insertAdjacentHTML('beforeend', rippleStyles);

// Enhanced social media handlers
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const icon = this.querySelector('i');
            if (icon && !icon.classList.contains('fa-envelope')) {
                e.preventDefault();
                showEnhancedNotification('Social media links can be customized in the code', 'info');
            }
        });
    });
});

// Dynamic year update with animation
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.textContent = `© ${currentYear} Asma Zunerah Nizami. All rights reserved.`;
        copyrightText.style.animation = 'fadeInUp 0.8s ease-out';
    }
}

updateCopyrightYear();

// Advanced mouse trail effect
function initializeMouseTrail() {
    const trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
            size: Math.random() * 10 + 5
        });
        
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(trail => trail.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                top: ${point.y - point.size/2}px;
                left: ${point.x - point.size/2}px;
                width: ${point.size}px;
                height: ${point.size}px;
                background: radial-gradient(circle, rgba(52, 152, 219, ${point.opacity * 0.6}) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: all 0.3s ease-out;
            `;
            
            document.body.appendChild(trailElement);
            
            // Fade out trail points
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.style.opacity = '0';
                    trailElement.style.transform = 'scale(0)';
                    setTimeout(() => {
                        trailElement.remove();
                    }, 300);
                }
            }, 50);
        });
    }
}

// Initialize mouse trail (optional - can be enabled/disabled)
// initializeMouseTrail();

// Advanced section transitions
function initializeSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
            this.style.backdropFilter = 'blur(10px)';
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.backdropFilter = '';
            this.style.transform = 'translateY(0)';
        });
    });
}

// Magnetic buttons effect
function initializeMagneticButtons() {
    const buttons = document.querySelectorAll('button, .btn, .print-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
}

// Glitch effect for special elements
function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-effect');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// 3D card flip effect
function initialize3DCardFlip() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// Liquid cursor effect
function initializeLiquidCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'liquid-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(52, 152, 219, 0.8) 0%, rgba(52, 152, 219, 0.2) 50%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: all 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
}

// Scroll-triggered animations with intersection observer
function initializeScrollTriggerAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.scrollAnimation;
                
                switch(animationType) {
                    case 'slideInLeft':
                        element.style.transform = 'translateX(0)';
                        element.style.opacity = '1';
                        break;
                    case 'slideInRight':
                        element.style.transform = 'translateX(0)';
                        element.style.opacity = '1';
                        break;
                    case 'fadeInScale':
                        element.style.transform = 'scale(1)';
                        element.style.opacity = '1';
                        break;
                    case 'rotateIn':
                        element.style.transform = 'rotate(0deg)';
                        element.style.opacity = '1';
                        break;
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Add elements to observe
    const animatedElements = document.querySelectorAll('[data-scroll-animation]');
    animatedElements.forEach(element => {
        const animationType = element.dataset.scrollAnimation;
        
        // Set initial states
        switch(animationType) {
            case 'slideInLeft':
                element.style.transform = 'translateX(-100px)';
                element.style.opacity = '0';
                break;
            case 'slideInRight':
                element.style.transform = 'translateX(100px)';
                element.style.opacity = '0';
                break;
            case 'fadeInScale':
                element.style.transform = 'scale(0.8)';
                element.style.opacity = '0';
                break;
            case 'rotateIn':
                element.style.transform = 'rotate(45deg)';
                element.style.opacity = '0';
                break;
        }
        
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(element);
    });
}

// Advanced text animations
function initializeAdvancedTextAnimations() {
    const textElements = document.querySelectorAll('.animated-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.marginRight = '0.3em';
            
            word.split('').forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = 'char';
                charSpan.style.display = 'inline-block';
                charSpan.style.opacity = '0';
                charSpan.style.transform = 'translateY(50px) rotateX(90deg)';
                charSpan.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(wordIndex * 0.1) + (charIndex * 0.05)}s`;
                
                wordSpan.appendChild(charSpan);
            });
            
            element.appendChild(wordSpan);
        });
        
        // Trigger animation
        setTimeout(() => {
            element.querySelectorAll('.char').forEach(char => {
                char.style.opacity = '1';
                char.style.transform = 'translateY(0) rotateX(0deg)';
            });
        }, 100);
    });
}

// Breathing animation for elements
function initializeBreathingAnimation() {
    const breathingElements = document.querySelectorAll('.breathing-element');
    
    breathingElements.forEach(element => {
        element.style.animation = 'breathe 4s ease-in-out infinite';
    });
}

// Initialize all advanced animations
function initializeAdvancedAnimations() {
    initializeSectionTransitions();
    initializeMagneticButtons();
    initializeGlitchEffect();
    initialize3DCardFlip();
    initializeLiquidCursor();
    initializeScrollTriggerAnimations();
    initializeAdvancedTextAnimations();
    initializeBreathingAnimation();
}

// Call advanced animations
initializeAdvancedAnimations();

// Add advanced CSS animations
const advancedAnimationStyles = `
    <style>
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .flip-card {
            perspective: 1000px;
            cursor: pointer;
        }
        
        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
            transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .flip-card-back {
            transform: rotateY(180deg);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .section {
            position: relative;
            overflow: hidden;
        }
        
        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s;
        }
        
        .section:hover::before {
            left: 100%;
        }
        
        .word {
            overflow: hidden;
        }
        
        .char {
            transform-origin: bottom center;
        }
        
        .breathing-element {
            transform-origin: center center;
        }
        
        /* Responsive animations */
        @media (max-width: 768px) {
            .animate-fadeInUp,
            .animate-fadeInLeft,
            .animate-fadeInRight,
            .animate-zoomIn,
            .animate-bounceIn,
            .animate-slideInUp {
                animation-duration: 0.6s;
            }
            
            .liquid-cursor {
                display: none;
            }
            
            body {
                cursor: auto !important;
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .particle-canvas {
                display: none;
            }
            
            .mouse-trail {
                display: none;
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .particle-canvas,
            .mouse-trail,
            .liquid-cursor {
                display: none;
            }
        }
        
        /* Focus indicators for accessibility */
        .skill-card:focus,
        .cert-item:focus,
        .experience-item:focus {
            outline: 2px solid #3498db;
            outline-offset: 2px;
        }
        
        /* Loading states */
        .loading {
            position: relative;
            opacity: 0.6;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid #3498db;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Print optimizations */
        @media print {
            .particle-canvas,
            .mouse-trail,
            .liquid-cursor,
            .notification {
                display: none !important;
            }
            
            * {
                animation: none !important;
                transition: none !important;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', advancedAnimationStyles);

// Initialize utility functions
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
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

// Initialize print functionality
function initializePrintFunctionality() {
    const printButton = document.querySelector('.print-button');
    
    if (printButton) {
        printButton.addEventListener('click', function() {
            document.body.classList.add('printing');
            
            setTimeout(() => {
                window.print();
                document.body.classList.remove('printing');
            }, 100);
        });
    }
}

// Performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
    
    if (isLowEndDevice) {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
            
            .particle-canvas {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimization
optimizeAnimations();

// Final initialization
console.log('🎨 Enhanced portfolio animations loaded successfully!');
console.log('✨ Features include: scroll animations, particle effects, 3D transforms, and more!');
console.log('🚀 Optimized for performance and accessibility');
