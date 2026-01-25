// ===== VISTA CALENDAR SYSTEM =====
class VistaCalendar {
    constructor() {
        this.currentDate = new Date();
        this.events = [];
        this.init();
    }
    
    async init() {
        await this.loadEvents();
        this.renderCalendar();
        this.bindEvents();
        this.updateLiveDate();
    }
    
    async loadEvents() {
        try {
            const response = await fetch('config/events.json');
            const data = await response.json();
            this.events = data.upcoming;
        } catch (error) {
            console.log('Error loading events:', error);
            this.events = [];
        }
    }
    
    renderCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December"];
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month header
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Create calendar grid
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Empty cells for days before first day
        const startDay = firstDay.getDay();
        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Check for events on this day
            const eventDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = this.getEventsForDate(eventDate);
            
            if (dayEvents.length > 0) {
                dayCell.classList.add('has-event');
                dayCell.innerHTML = `
                    <div class="day-number">${day}</div>
                    <div class="event-indicator" title="${dayEvents[0].title}">
                        <i class="fas fa-circle"></i>
                    </div>
                `;
                
                dayCell.addEventListener('click', () => this.showEventModal(dayEvents));
            }
            
            // Highlight today
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayCell.classList.add('today');
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    getEventsForDate(dateString) {
        return this.events.filter(event => {
            return event.date === dateString || 
                   (event.date <= dateString && event.endDate >= dateString);
        });
    }
    
    showEventModal(events) {
        const modalHTML = `
        <div class="vista-modal-overlay">
            <div class="vista-modal vista-window">
                <div class="modal-header">
                    <h3><i class="fas fa-calendar-day"></i> Events</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${events.map(event => `
                        <div class="event-modal-card vista-card">
                            <h4>${event.title}</h4>
                            <p><i class="far fa-clock"></i> ${event.date} at ${event.time}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                            <p>${event.description}</p>
                            <div class="modal-actions">
                                <button class="vista-btn small" onclick="registerForEvent('${event.id}')">
                                    <i class="fas fa-user-plus"></i> Register
                                </button>
                                <button class="vista-btn small" onclick="window.location.href='contact.html#directions'">
                                    <i class="fas fa-directions"></i> Directions
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.querySelector('.vista-modal-overlay').remove();
            if (window.vistaSounds) vistaSounds.play('close');
        });
        
        if (window.vistaSounds) vistaSounds.play('open');
    }
    
    bindEvents() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
            if (window.vistaSounds) vistaSounds.play('click');
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
            if (window.vistaSounds) vistaSounds.play('click');
        });
    }
    
    updateLiveDate() {
        const update = () => {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateString = now.toLocaleDateString('en-US', options);
            
            const liveDate = document.getElementById('liveDate');
            if (liveDate) {
                liveDate.textContent = dateString;
            }
        };
        
        update();
        setInterval(update, 60000); // Update every minute
    }
}

// Initialize Calendar
document.addEventListener('DOMContentLoaded', () => {
    window.vistaCalendar = new VistaCalendar();
});
