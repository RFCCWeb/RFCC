// ===== VISTA VISUAL EFFECTS =====
class VistaEffects {
    constructor() {
        this.initEffects();
    }
    
    initEffects() {
        this.createGlassReflections();
        this.createVistaTrails();
        this.initParallax();
        this.initHoverEffects();
    }
    
    createGlassReflections() {
        const style = document.createElement('style');
        style.textContent = `
            .vista-glass {
                position: relative;
                overflow: hidden;
            }
            .vista-glass::after {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(
                    to bottom right,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.1) 50%,
                    rgba(255, 255, 255, 0) 100%
                );
                transform: rotate(30deg);
                pointer-events: none;
            }
            .vista-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            }
        `;
        document.head.appendChild(style);
    }
    
    createVistaTrails() {
        document.addEventListener('mousemove', (e) => {
            const trail = document.createElement('div');
            trail.className = 'vista-trail';
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                background: rgba(0, 120, 215, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(trail);
            
            // Animate trail
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'translate(-50%, -50%) scale(2)';
                trail.style.transition = 'all 0.5s ease';
            }, 10);
            
            // Remove trail
            setTimeout(() => {
                trail.remove();
            }, 600);
        });
    }
    
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.vista-parallax');
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    initHoverEffects() {
        document.querySelectorAll('.vista-hover').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                e.target.style.setProperty('--mouse-x', `${x}px`);
                e.target.style.setProperty('--mouse-y', `${y}px`);
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'vista-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                `;
                e.target.appendChild(ripple);
                
                // Animate ripple
                setTimeout(() => {
                    ripple.style.width = '200px';
                    ripple.style.height = '200px';
                    ripple.style.opacity = '0';
                    ripple.style.transition = 'all 0.6s ease';
                }, 10);
                
                // Remove ripple
                setTimeout(() => ripple.remove(), 700);
            });
        });
    }
}

// Initialize Vista Effects
document.addEventListener('DOMContentLoaded', () => {
    window.vistaEffects = new VistaEffects();
});
