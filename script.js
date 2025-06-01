
                
                // Main JavaScript for Indian History Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initParallaxScrolling();
    initScrollAnimations();
    initInteractiveMap();
    initModal();
    initSmoothScrolling();
    initTimelineAnimations();
    
    console.log('Indian History Website Loaded Successfully');
});

// Parallax Scrolling Effect
function initParallaxScrolling() {
    const parallaxLayers = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrollTop * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Scroll-triggered Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('event-card') || 
                    entry.target.classList.contains('achievement-card') ||
                    entry.target.classList.contains('leader-profile')) {
                    addStaggeredAnimation(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.era-title, .timeline-item, .event-card, .achievement-card, .leader-profile, .independence-moment, .fade-in, .slide-in-left, .slide-in-right, .zoom-in'
    );
    
    animatableElements.forEach(el => observer.observe(el));
}

// Staggered Animation for Grid Items
function addStaggeredAnimation(element) {
    const siblings = Array.from(element.parentElement.children);
    const index = siblings.indexOf(element);
    const delay = index * 100; // 100ms delay between each item
    
    setTimeout(() => {
        element.style.animationDelay = '0s';
    }, delay);
}

// Interactive Map Functionality
function initInteractiveMap() {
    const mapRegions = document.querySelectorAll('.map-region');
    const cities = document.querySelectorAll('.city');
    const tooltip = document.getElementById('mapTooltip');
    
    // Regional information
    const regionInfo = {
        north: {
            name: "Northern India",
            description: "Heart of Mughal Empire - Delhi, Agra",
            events: ["Mughal Capital", "Red Fort", "Taj Mahal"]
        },
        west: {
            name: "Western India",
            description: "Gateway of India - Mumbai, Rajasthan",
            events: ["Portuguese Trading Posts", "Maratha Empire", "British Bombay"]
        },
        central: {
            name: "Central India",
            description: "Cultural crossroads - Madhya Pradesh",
            events: ["Gwalior Fort", "Sanchi Stupa", "Freedom Fighters"]
        },
        south: {
            name: "Southern India",
            description: "Dravidian heritage - Tamil Nadu, Karnataka",
            events: ["Vijayanagara Empire", "Mysore Kingdom", "IT Revolution"]
        }
    };
    
    const cityInfo = {
        Delhi: "Capital of multiple empires - Mughal, British, Independent India",
        Mumbai: "Commercial capital and gateway to India",
        Kolkata: "Former British capital and cultural center",
        Chennai: "Gateway to South India and major port"
    };
    
    // Add hover effects for regions
    mapRegions.forEach(region => {
        region.addEventListener('mouseenter', (e) => {
            const regionName = e.target.dataset.region;
            const info = regionInfo[regionName];
            
            if (info) {
                showTooltip(e, `<strong>${info.name}</strong><br>${info.description}`);
                region.style.opacity = '0.8';
                region.style.transform = 'scale(1.02)';
            }
        });
        
        region.addEventListener('mouseleave', () => {
            hideTooltip();
            region.style.opacity = '0.3';
            region.style.transform = 'scale(1)';
        });
        
        region.addEventListener('click', (e) => {
            const regionName = e.target.dataset.region;
            const info = regionInfo[regionName];
            
            if (info) {
                showModal(`
                    <h2>${info.name}</h2>
                    <p>${info.description}</p>
                    <h3>Historical Significance:</h3>
                    <ul>
                        ${info.events.map(event => `<li>${event}</li>`).join('')}
                    </ul>
                `);
            }
        });
    });
    
    // Add hover effects for cities
    cities.forEach(city => {
        city.addEventListener('mouseenter', (e) => {
            const cityName = e.target.dataset.city;
            const info = cityInfo[cityName];
            
            if (info) {
                showTooltip(e, `<strong>${cityName}</strong><br>${info}`);
            }
        });
        
        city.addEventListener('mouseleave', hideTooltip);
        
        city.addEventListener('click', (e) => {
            const cityName = e.target.dataset.city;
            showCityDetails(cityName);
        });
    });
    
    function showTooltip(event, content) {
        tooltip.innerHTML = content;
        tooltip.style.opacity = '1';
        tooltip.style.left = event.clientX + 10 + 'px';
        tooltip.style.top = event.clientY - 10 + 'px';
    }
    
    function hideTooltip() {
        tooltip.style.opacity = '0';
    }
}

// Modal System
function initModal() {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    // Add click events for interactive elements
    addClickEvents();
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    window.showModal = function(content) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
}

// Add Click Events for Interactive Elements
function addClickEvents() {
    // Leader cards
    const leaderCards = document.querySelectorAll('.leader-card, .leader-profile');
    leaderCards.forEach(card => {
        card.addEventListener('click', () => {
            const leader = card.dataset.leader;
            showLeaderDetails(leader);
        });
    });
    
    // Event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            const event = card.dataset.event;
            showEventDetails(event);
        });
    });
    
    // Achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('click', () => {
            const achievement = card.dataset.achievement;
            showAchievementDetails(achievement);
        });
    });
}

// Detailed Information Functions
function showLeaderDetails(leader) {
    const leaderData = {
        babur: {
            name: "Babur (1483-1530)",
            title: "Founder of Mughal Empire",
            description: "Zahir-ud-din Muhammad Babur was a Timurid prince who founded the Mughal Empire in the Indian subcontinent.",
            achievements: [
                "Won the First Battle of Panipat (1526)",
                "Established Mughal dynasty in India",
                "Authored 'Baburnama' - his autobiography",
                "Introduced new military tactics and gunpowder"
            ],
            quote: "I have never been afraid of defeat, for I believe that every setback is a setup for a comeback."
        },
        akbar: {
            name: "Akbar the Great (1542-1605)",
            title: "Third Mughal Emperor",
            description: "Jalaluddin Muhammad Akbar was the greatest of the Mughal emperors who ruled from 1556 to 1605.",
            achievements: [
                "Expanded Mughal Empire across most of India",
                "Established Din-i Ilahi (Divine Faith)",
                "Built Fatehpur Sikri",
                "Promoted religious tolerance and cultural synthesis",
                "Abolished Jizya tax on non-Muslims"
            ],
            quote: "A monarch should be ever intent on conquest, otherwise his neighbors rise in arms against him."
        },
        gandhi: {
            name: "Mahatma Gandhi (1869-1948)",
            title: "Father of the Nation",
            description: "Mohandas Karamchand Gandhi was an Indian lawyer and political leader who led India's independence movement.",
            achievements: [
                "Led Salt March (Dandi March) in 1930",
                "Pioneered Satyagraha (non-violent resistance)",
                "Championed civil rights in South Africa",
                "Led Quit India Movement in 1942",
                "Promoted religious harmony and social reform"
            ],
            quote: "Be the change you wish to see in the world."
        },
        nehru: {
            name: "Jawaharlal Nehru (1889-1964)",
            title: "First Prime Minister of India",
            description: "Pandit Nehru was a freedom fighter and India's first Prime Minister, architect of modern India.",
            achievements: [
                "Led India for 17 years as Prime Minister",
                "Established democratic institutions",
                "Founded Non-Aligned Movement",
                "Promoted scientific temper and education",
                "Initiated Five-Year Plans for development"
            ],
            quote: "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom."
        },
        bose: {
            name: "Subhash Chandra Bose (1897-1945)",
            title: "Netaji - Revolutionary Leader",
            description: "Subhash Chandra Bose was a freedom fighter who believed in armed resistance against British rule.",
            achievements: [
                "Founded Indian National Army (Azad Hind Fauj)",
                "Established Provisional Government of Free India",
                "Led armed struggle from Southeast Asia",
                "Inspired millions with his patriotic fervor",
                "Coined the slogan 'Jai Hind'"
            ],
            quote: "Give me blood, and I shall give you freedom!"
        }
    };
    
    const data = leaderData[leader];
    if (data) {
        showModal(`
            <div class="leader-modal">
                <h2>${data.name}</h2>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${data.title}</h3>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">${data.description}</p>
                
                <h4 style="margin-bottom: 1rem; color: var(--deep-red);">Key Achievements:</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${data.achievements.map(achievement => `<li style="margin-bottom: 0.5rem;">${achievement}</li>`).join('')}
                </ul>
                
                <blockquote style="
                    background: var(--cream);
                    padding: 1rem;
                    border-left: 4px solid var(--primary-color);
                    font-style: italic;
                    margin: 1rem 0;
                    border-radius: 0 5px 5px 0;
                ">
                    "${data.quote}"
                </blockquote>
            </div>
        `);
    }
}

function showEventDetails(event) {
    const eventData = {
        'sepoy-mutiny': {
            title: "The Sepoy Mutiny of 1857",
            subtitle: "The First War of Independence",
            description: "A major uprising against British East India Company rule, marking the beginning of organized resistance.",
            details: [
                "Started at Meerut on May 10, 1857",
                "Spread across northern and central India",
                "Led by soldiers (sepoys) and joined by civilians",
                "Key leaders: Mangal Pandey, Rani Lakshmibai, Bahadur Shah Zafar",
                "Though unsuccessful, it awakened national consciousness"
            ],
            impact: "Led to end of East India Company rule and beginning of Crown rule in India"
        },
        'bengal-partition': {
            title: "Partition of Bengal (1905)",
            subtitle: "Divide and Rule Policy",
            description: "British administrative division of Bengal to weaken growing nationalism.",
            details: [
                "Bengal divided into East and West Bengal",
                "East Bengal: Muslim majority, West Bengal: Hindu majority",
                "Sparked massive protests and Swadeshi movement",
                "Led to boycott of British goods",
                "Partition was annulled in 1911 due to pressure"
            ],
            impact: "Strengthened nationalist movement and unity among Indians"
        },
        'jallianwala': {
            title: "Jallianwala Bagh Massacre (1919)",
            subtitle: "The Turning Point",
            description: "British troops opened fire on peaceful protesters in Amritsar, Punjab.",
            details: [
                "April 13, 1919 - Baisakhi day",
                "General Dyer ordered firing without warning",
                "Over 1000 killed, thousands wounded",
                "Peaceful gathering in enclosed garden",
                "Hunter Commission investigated but Dyer faced no serious consequences"
            ],
            impact: "Turned millions against British rule and accelerated independence movement"
        }
    };
    
    const data = eventData[event];
    if (data) {
        showModal(`
            <div class="event-modal">
                <h2>${data.title}</h2>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${data.subtitle}</h3>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">${data.description}</p>
                
                <h4 style="margin-bottom: 1rem; color: var(--deep-red);">Key Details:</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${data.details.map(detail => `<li style="margin-bottom: 0.5rem;">${detail}</li>`).join('')}
                </ul>
                
                <div style="
                    background: var(--cream);
                    padding: 1rem;
                    border-radius: 5px;
                    border-left: 4px solid var(--secondary-color);
                ">
                    <strong>Historical Impact:</strong><br>
                    ${data.impact}
                </div>
            </div>
        `);
    }
}

function showAchievementDetails(achievement) {
    const achievementData = {
        'green-revolution': {
            title: "Green Revolution (1960s-1970s)",
            description: "Agricultural transformation that made India self-sufficient in food production.",
            details: [
                "Introduction of high-yielding variety (HYV) seeds",
                "Use of modern fertilizers and pesticides",
                "Expansion of irrigation facilities",
                "Mechanization of farming",
                "Led by agricultural scientist M.S. Swaminathan"
            ],
            impact: "India transformed from food importer to food exporter",
            regions: "Primarily in Punjab, Haryana, and Western Uttar Pradesh"
        },
        'pokhran': {
            title: "Pokhran Nuclear Tests",
            description: "India's nuclear weapons program that established it as a nuclear power.",
            details: [
                "Pokhran-I (1974): 'Smiling Buddha' - peaceful nuclear explosion",
                "Pokhran-II (1998): Series of five nuclear tests",
                "Led by Dr. A.P.J. Abdul Kalam and Dr. R. Chidambaram",
                "Made India the 6th nuclear weapons state",
                "Demonstrated advanced nuclear technology capabilities"
            ],
            impact: "Established India as major nuclear power and changed regional dynamics",
            significance: "Enhanced India's strategic autonomy and security"
        },
        'it-boom': {
            title: "Information Technology Revolution (1990s)",
            description: "India's emergence as global IT services hub and software powerhouse.",
            details: [
                "Growth of software exports from $100M to $50B+",
                "Establishment of major IT hubs: Bangalore, Hyderabad, Pune",
                "Rise of companies like Infosys, TCS, Wipro",
                "Y2K opportunity boosted Indian IT industry",
                "Created millions of jobs and changed economic landscape"
            ],
            impact: "Transformed India into global technology leader",
            legacy: "Foundation for India's digital economy and startup ecosystem"
        },
        'liberalization': {
            title: "Economic Liberalization (1991)",
            description: "Comprehensive economic reforms that opened Indian economy to the world.",
            details: [
                "Initiated by PM P.V. Narasimha Rao and FM Manmohan Singh",
                "Dismantling of License Raj system",
                "Reduction in import tariffs and export restrictions",
                "Deregulation of industries and financial markets",
                "Foreign direct investment (FDI) liberalization"
            ],
            impact: "Accelerated economic growth and integration with global economy",
            results: "GDP growth rate increased from 3.5% to 6%+ annually"
        }
    };
    
    const data = achievementData[achievement];
    if (data) {
        showModal(`
            <div class="achievement-modal">
                <h2>${data.title}</h2>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">${data.description}</p>
                
                <h4 style="margin-bottom: 1rem; color: var(--deep-red);">Key Features:</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${data.details.map(detail => `<li style="margin-bottom: 0.5rem;">${detail}</li>`).join('')}
                </ul>
                
                <div style="
                    background: var(--cream);
                    padding: 1rem;
                    border-radius: 5px;
                    border-left: 4px solid var(--accent-color);
                    margin-bottom: 1rem;
                ">
                    <strong>Impact:</strong><br>
                    ${data.impact}
                </div>
                
                ${data.regions ? `
                <div style="
                    background: #e8f4fd;
                    padding: 1rem;
                    border-radius: 5px;
                    border-left: 4px solid var(--secondary-color);
                ">
                    <strong>Key Regions:</strong><br>
                    ${data.regions}
                </div>
                ` : ''}
                
                ${data.legacy ? `
                <div style="
                    background: #fff3cd;
                    padding: 1rem;
                    border-radius: 5px;
                    border-left: 4px solid var(--gold-color);
                ">
                    <strong>Legacy:</strong><br>
                    ${data.legacy}
                </div>
                ` : ''}
            </div>
        `);
    }
}

function showCityDetails(cityName) {
    const cityData = {
        Delhi: {
            name: "Delhi - The Heart of India",
            description: "Capital city that has witnessed the rise and fall of multiple empires.",
            timeline: [
                "1206-1526: Delhi Sultanate capital",
                "1526-1857: Mughal Empire capital",
                "1858-1911: Part of British India",
                "1911-1947: British Indian capital",
                "1947-Present: Capital of Independent India"
            ],
            monuments: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple"],
            significance: "Political and cultural center of India for over 800 years"
        },
        Mumbai: {
            name: "Mumbai - The Commercial Capital",
            description: "India's financial hub and gateway to the nation.",
            timeline: [
                "1534: Portuguese control begins",
                "1661: British acquire through marriage treaty",
                "1858: Major trading port under British",
                "1947: Commercial center of independent India",
                "1990s: IT and financial services boom"
            ],
            monuments: ["Gateway of India", "Marine Drive", "Chhatrapati Shivaji Terminus"],
            significance: "India's economic powerhouse and entertainment industry center"
        },
        Kolkata: {
            name: "Kolkata - The Cultural Capital",
            description: "Former British capital and center of Bengali Renaissance.",
            timeline: [
                "1690: Founded as Calcutta by British",
                "1772-1911: Capital of British India",
                "1850s-1950s: Bengali Renaissance center",
                "1947: Major industrial city of independent India",
                "Present: Cultural and intellectual hub"
            ],
            monuments: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Temple"],
            significance: "Birthplace of Indian nationalism and cultural awakening"
        },
        Chennai: {
            name: "Chennai - Gateway to South India",
            description: "Major port city and center of Tamil culture.",
            timeline: [
                "1640: British establish Fort St. George",
                "1746-1763: Anglo-French conflicts",
                "1858-1947: Major British administrative center",
                "1947: Important industrial city",
                "1990s: IT and automotive hub"
            ],
            monuments: ["Fort St. George", "Kapaleeshwarar Temple", "Marina Beach"],
            significance: "Center of Dravidian culture and South Indian independence movement"
        }
    };
    
    const data = cityData[cityName];
    if (data) {
        showModal(`
            <div class="city-modal">
                <h2>${data.name}</h2>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.6;">${data.description}</p>
                
                <h4 style="margin-bottom: 1rem; color: var(--deep-red);">Historical Timeline:</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${data.timeline.map(period => `<li style="margin-bottom: 0.5rem;">${period}</li>`).join('')}
                </ul>
                
                <h4 style="margin-bottom: 1rem; color: var(--deep-red);">Important Monuments:</h4>
                <div style="margin-bottom: 1.5rem;">
                    ${data.monuments.map(monument => `
                        <span style="
                            display: inline-block;
                            background: var(--primary-color);
                            color: white;
                            padding: 0.3rem 0.8rem;
                            border-radius: 15px;
                            margin: 0.2rem;
                            font-size: 0.9rem;
                        ">${monument}</span>
                    `).join('')}
                </div>
                
                <div style="
                    background: var(--cream);
                    padding: 1rem;
                    border-radius: 5px;
                    border-left: 4px solid var(--secondary-color);
                ">
                    <strong>Historical Significance:</strong><br>
                    ${data.significance}
                </div>
            </div>
        `);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstSection = document.querySelector('.map-section');
            if (firstSection) {
                firstSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // Stagger the animations
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Additional Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero title
    addTypingEffect();
    
    // Add floating elements animation
    addFloatingElements();
    
    // Initialize scroll progress indicator
    initScrollProgress();
});

function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

function addFloatingElements() {
    // Create floating historical symbols
    const symbols = ['🕌', '🏛️', '🇮🇳', '📜', '⚔️', '🏺'];
    const body = document.body;
    
    symbols.forEach((symbol, index) => {
        const element = document.createElement('div');
        element.textContent = symbol;
        element.style.cssText = `
            position: fixed;
            font-size: 2rem;
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
            animation: float ${10 + index * 2}s ease-in-out infinite;
            animation-delay: ${index * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        body.appendChild(element);
    });
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Export functions for potential external use
window.IndianHistoryWebsite = {
    showModal,
    showLeaderDetails,
    showEventDetails,
    showAchievementDetails,
    showCityDetails
};