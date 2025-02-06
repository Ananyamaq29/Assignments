document.addEventListener('DOMContentLoaded', () => {
    // Sample data for blog posts
    const blogPosts = [
        {
            title: 'The Rise of Quantum Computing',
            author: 'Alice Walker',
            date: 'February 3, 2025',
            category: 'Technology',
            summary: 'Discover how quantum computing could revolutionize technology and solve complex problems beyond the reach of classical computers.'
        },
        {
            title: 'The Future of AI in Healthcare',
            author: 'Mark Davis',
            date: 'January 29, 2025',
            category: 'Technology',
            summary: 'Explore the advancements in AI technology that are transforming the healthcare industry, from diagnostics to patient care.'
        },
        {
            title: 'How to Achieve Work-Life Balance',
            author: 'Sarah Lee',
            date: 'January 20, 2025',
            category: 'Lifestyle',
            summary: 'Learn the importance of maintaining a healthy work-life balance and practical tips to achieve it in a busy world.'
        },
        {
            title: '10 Simple Ways to Improve Mental Health',
            author: 'Michael Brown',
            date: 'January 18, 2025',
            category: 'Lifestyle',
            summary: 'Mental health is crucial to our well-being. Discover 10 simple lifestyle changes that can help you feel better every day.'
        },
        {
            title: 'Top Destinations for Solo Travelers',
            author: 'Emily White',
            date: 'January 22, 2025',
            category: 'Travel',
            summary: 'Looking for a solo adventure? Check out these amazing travel destinations perfect for solo travelers seeking adventure and culture.'
        },
        {
            title: 'Sustainable Travel Tips for 2025',
            author: 'David Green',
            date: 'January 10, 2025',
            category: 'Travel',
            summary: 'Learn how to travel sustainably in 2025, from eco-friendly accommodations to reducing your carbon footprint while exploring the world.'
        },
        {
            title: 'The Evolution of Online Education',
            author: 'Linda Scott',
            date: 'January 5, 2025',
            category: 'Education',
            summary: 'Discover how online education is transforming learning, from virtual classrooms to interactive learning tools and resources.'
        },
        {
            title: 'How to Stay Motivated in Online Classes',
            author: 'James Williams',
            date: 'December 30, 2024',
            category: 'Education',
            summary: 'Online learning can be tough, but staying motivated is key. Here are strategies to help you succeed and stay focused throughout your courses.'
        },
        {
            title: 'The Importance of STEM Education',
            author: 'Olivia Taylor',
            date: 'December 15, 2024',
            category: 'Education',
            summary: 'STEM education (Science, Technology, Engineering, and Mathematics) is more important than ever. Find out how it shapes the future of industries worldwide.'
        }
    ];

    // Load blog posts dynamically
    const blogContainer = document.querySelector('#blog-posts');
    const categoryLinks = document.querySelectorAll('#categories a');
    const searchInput = document.querySelector('#search-bar');
    const subscribeForm = document.querySelector('#subscribe');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');

    // Function to render blog posts
    function renderPosts(posts) {
        blogContainer.innerHTML = '';  // Clear current posts
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('blog-post');
            postDiv.innerHTML = `
                <h4>${post.title}</h4>
                <p>Author: ${post.author}</p>
                <p>Publish Date: ${post.date}</p>
                <p>Summary: ${post.summary}</p>
            `;
            blogContainer.appendChild(postDiv);
        });
    }
    
    // Initial render
    renderPosts(blogPosts);
    

    // Function to filter posts based on search
    function filterPosts(query) {
        const filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.author.toLowerCase().includes(query.toLowerCase())
        );
        console.log(filteredPosts); // Log filtered posts to debug
        renderPosts(filteredPosts);
    }
    

    // Function to filter posts by category
    function filterByCategory(category) {
        if (category === 'All') {
            renderPosts(blogPosts);  // Show all posts if 'All' category is selected
        } else {
            const filteredPosts = blogPosts.filter(post => 
                post.category === category
            );
            renderPosts(filteredPosts);
        }
    }

    // Function to validate subscription form
    function validateForm(e) {
        e.preventDefault();
    
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !emailRegex.test(email)) {
            alert("Please fill out the form correctly.");
            return false;
        }
    
        alert("Subscription successful!");
        subscribeForm.reset();
        return true;
    }
    

    // Event listener for search bar input
    searchInput.addEventListener('input', (e) => {
        filterPosts(e.target.value);
    });
    

    // Event listeners for category filtering
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            filterByCategory(category);
            // Smooth scroll functionality
            window.scrollTo({
                top: blogContainer.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });
    

    // Event listener for subscription form submission
    subscribeForm.addEventListener('submit', validateForm);

    // Initial render of all blog posts
    renderPosts(blogPosts);
});
