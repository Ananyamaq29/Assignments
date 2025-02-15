document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDescriptionInput = document.getElementById('eventDescription');
    const eventDateInput = document.getElementById('eventDate');
    const eventsTableBody = document.getElementById('eventsTable').querySelector('tbody');

    let events = JSON.parse(localStorage.getItem('events')) || [];

    let editingIndex = null;

    function renderEvents() {
        eventsTableBody.innerHTML = '';
        events.forEach((event, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.name}</td>
                <td>${event.description}</td>
                <td>${new Date(event.date).toLocaleString()}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            eventsTableBody.appendChild(row);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const eventName = eventNameInput.value.trim();
        const eventDescription = eventDescriptionInput.value.trim();
        const eventDate = eventDateInput.value;

        if (!eventName || !eventDescription || !eventDate) {
            alert('All fields are required!');
            return;
        }

        const newEvent = {
            name: eventName,
            description: eventDescription,
            date: new Date(eventDate).toISOString(),
        };

        if (editingIndex !== null) {
            events[editingIndex] = newEvent;
            editingIndex = null; 
        } else {
            events.push(newEvent);
        }

        localStorage.setItem('events', JSON.stringify(events));
        form.reset();
        renderEvents();
    });

    eventsTableBody.addEventListener('click', function (e) {
        const index = e.target.dataset.index;

        if (e.target.classList.contains('delete')) {
            events.splice(index, 1);
            localStorage.setItem('events', JSON.stringify(events));
            renderEvents();
        }

        if (e.target.classList.contains('edit')) {
            const event = events[index];
            eventNameInput.value = event.name;
            eventDescriptionInput.value = event.description;
            eventDateInput.value = event.date.substring(0, 16);  // Format to match datetime-local

            editingIndex = index;  // Set the index of the event being edited
        }
    });

    renderEvents();
});
