document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDescriptionInput = document.getElementById('eventDescription');
    const eventDateInput = document.getElementById('eventDate');
    const eventsTableBody = document.getElementById('eventsTable').querySelector('tbody');

    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Function to render events from the array to the table
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

    // Event handler for form submission
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

        // Add new event to the events array and local storage
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // Clear form fields and re-render the events
        form.reset();
        renderEvents();
    });

    // Event delegation for Edit and Delete actions
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
            events.splice(index, 1);
            localStorage.setItem('events', JSON.stringify(events));
            renderEvents();
        }
    });

    // Initial rendering of events
    renderEvents();
});
