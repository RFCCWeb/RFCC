// ===== MINISTRIES LOADER =====
class MinistriesLoader {
    constructor() {
        this.ministries = [];
        this.init();
    }
    
    async init() {
        await this.loadMinistries();
        this.renderMinistries();
        this.initJoinForm();
    }
    
    async loadMinistries() {
        try {
            const response = await fetch('config/ministries.json');
            const data = await response.json();
            this.ministries = data.ministries;
        } catch (error) {
            console.log('Error loading ministries:', error);
            this.ministries = [];
        }
    }
    
    renderMinistries() {
        const grid = document.getElementById('ministriesGrid');
        if (!grid) return;
        
        grid.innerHTML = this.ministries.map(ministry => `
            <div class="ministry-card vista-card" data-id="${ministry.id}">
                <div class="ministry-icon" style="background: ${ministry.color};">
                    <i class="fas ${ministry.icon}"></i>
                </div>
                <div class="ministry-content">
                    <h3>${ministry.name}</h3>
                    <p class="ministry-aka">${ministry.aka || ''}</p>
                    <p class="ministry-desc">${ministry.description}</p>
                    
                    <div class="ministry-details">
                        <p><i class="fas fa-user-tie"></i> <strong>Leader:</strong> ${ministry.leader}</p>
                        <p><i class="far fa-clock"></i> <strong>Meets:</strong> ${ministry.meeting}</p>
                        <p><i class="fas fa-bible"></i> <strong>Key Verse:</strong> ${ministry.verse}</p>
                    </div>
                    
                    <div class="ministry-actions">
                        <button class="vista-btn small" onclick="viewMinistryDetails('${ministry.id}')">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="vista-btn small fire" onclick="joinMinistry('${ministry.id}')">
                            <i class="fas fa-user-plus"></i> Join
                        </button>
                        ${ministry.id === 'women' || ministry.id === 'youth' || ministry.id === 'children' ? 
                            `<a href="#" class="vista-btn small" style="margin-top: 10px;">
                                <i class="fas fa-external-link-alt"></i> Full Website (Coming Soon)
                            </a>` : ''
                        }
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    initJoinForm() {
        const form = document.getElementById('joinMinistryForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const ministrySelect = document.getElementById('ministrySelect');
            const selectedMinistry = ministrySelect.value;
            const ministryName = ministrySelect.options[ministrySelect.selectedIndex].text;
            
            if (!selectedMinistry) {
                alert('Please select a ministry to join.');
                return;
            }
            
            // Show confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'vista-card success-message';
            confirmation.innerHTML = `
                <h3><i class="fas fa-check-circle"></i> Application Submitted!</h3>
                <p>Thank you for your interest in joining <strong>${ministryName}</strong>.</p>
                <p>The ministry leader will contact you within 48 hours.</p>
            `;
            
            form.parentNode.insertBefore(confirmation, form.nextSibling);
            
            // Play success sound
            if (window.vistaSounds) vistaSounds.play('success');
            
            // Reset form
            form.reset();
            
            // Remove confirmation after 5 seconds
            setTimeout(() => {
                confirmation.style.opacity = '0';
                confirmation.style.transform = 'translateY(20px)';
                confirmation.style.transition = 'all 0.5s ease';
                setTimeout(() => confirmation.remove(), 500);
            }, 5000);
        });
    }
}

// Ministry functions
function viewMinistryDetails(ministryId) {
    // In future, this would redirect to individual ministry page
    alert(`Viewing details for ministry: ${ministryId}\n\nIndividual ministry websites are coming soon!`);
    if (window.vistaSounds) vistaSounds.play('click');
}

function joinMinistry(ministryId) {
    // Scroll to join form and pre-select ministry
    const joinForm = document.getElementById('joinMinistryForm');
    if (joinForm) {
        joinForm.scrollIntoView({ behavior: 'smooth' });
        
        const select = document.getElementById('ministrySelect');
        if (select) {
            select.value = ministryId;
        }
        
        if (window.vistaSounds) vistaSounds.play('hover');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.ministriesLoader = new MinistriesLoader();
});
