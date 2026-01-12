document.addEventListener('DOMContentLoaded', function() {
    console.log('YouTube Clone Loaded!');
    
    // Video Data
    const videos = [
        {
            id: 1,
            thumbnail: 'yade.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'This video talks about the general knowledge of CSS and HTML',
            channel: 'Yadelew Asrie',
            views: '19M Views',
            time: '4 Years Ago',
            duration: '3:50'
        },
        {
            id: 2,
            thumbnail: 'sete.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'This video talks about the general knowledge on pharmacy',
            channel: 'Setalem Mengesha',
            views: '9M Views',
            time: '4 Years Ago',
            duration: '6:03'
        },
        {
            id: 3,
            thumbnail: 'yade.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'Advanced CSS Grid Techniques for Modern Layouts',
            channel: 'Yadelew Asrie',
            views: '5.2M Views',
            time: '2 Years Ago',
            duration: '1:59'
        },
        {
            id: 4,
            thumbnail: 'sete.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'JavaScript Fundamentals for Beginners',
            channel: 'Setalem Mengesha',
            views: '12M Views',
            time: '3 Years Ago',
            duration: '3:20'
        },
        {
            id: 5,
            thumbnail: 'yade.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'Responsive Web Design Best Practices',
            channel: 'Yadelew Asrie',
            views: '7.8M Views',
            time: '1 Year Ago',
            duration: '3:10'
        },
        {
            id: 6,
            thumbnail: 'sete.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'React Hooks Tutorial - Complete Guide',
            channel: 'Setalem Mengesha',
            views: '3.5M Views',
            time: '6 Months Ago',
            duration: '3:04'
        },
        {
            id: 7,
            thumbnail: 'yade.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'How to Create a YouTube Clone with HTML, CSS & JavaScript',
            channel: 'Yadelew Asrie',
            views: '2.1M Views',
            time: '1 Month Ago',
            duration: '10:15'
        },
        {
            id: 8,
            thumbnail: 'sete.jpg',
            channelLogo: '—Pngtree—education logo vector image_4092977.png',
            title: 'Web Development Roadmap 2024',
            channel: 'Setalem Mengesha',
            views: '8.4M Views',
            time: '3 Months Ago',
            duration: '15:30'
        }
    ];
    
    // DOM Elements
    const videoContainer = document.getElementById('videoContainer');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar-container');
    const sideLinks = document.querySelectorAll('.side-link');
    const searchBar = document.querySelector('.search-bar');
    const searchBtn = document.querySelector('.search-btn');
    const voiceBtn = document.querySelector('.voice-btn');
    const notificationBtn = document.querySelector('.btn5');
    const notificationsCount = document.querySelector('.notifications-count');
    const userProfile = document.querySelector('.user-profile');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const uploadBtn = document.querySelector('.btn3');
    const appsBtn = document.querySelector('.btn4');
    
    // Initialize videos
    function loadVideos() {
        videoContainer.innerHTML = '';
        
        videos.forEach(video => {
            const videoElement = createVideoElement(video);
            videoContainer.appendChild(videoElement);
        });
    }
    
    // Create video element
    function createVideoElement(video) {
        const videoPreview = document.createElement('div');
        videoPreview.className = 'video-preview';
        videoPreview.dataset.id = video.id;
        
        videoPreview.innerHTML = `
            <div class="div1">
                <img src="${video.thumbnail}" alt="${video.channel}" class="img1">
                <div class="div01">${video.duration}</div>
            </div>
            <div class="imgand">
                <div class="profile">
                    <img src="${video.channelLogo}" alt="${video.channel}" class="channel">
                </div>
                <div class="pra">
                    <p class="video-title">${video.title}</p>
                    <p class="video-info">${video.channel}</p>
                    <p class="video-info">${video.views} · ${video.time}</p>
                </div>
            </div>
        `;
        
        return videoPreview;
    }
    
    // Sidebar toggle functionality
    hamburgerMenu.addEventListener('click', function() {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
            document.body.style.paddingLeft = '100px';
        } else {
            sidebar.style.display = 'none';
            document.body.style.paddingLeft = '25px';
        }
    });
    
    // Sidebar active link
    sideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sideLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update video grid based on selected category
            const category = this.querySelector('div').textContent;
            filterVideos(category);
        });
    });
    
    // Filter videos by category
    function filterVideos(category) {
        let filteredVideos;
        
        switch(category) {
            case 'Home':
                filteredVideos = [...videos];
                break;
            case 'Explore':
                filteredVideos = videos.filter(v => v.views.includes('M'));
                break;
            case 'Subscriptions':
                filteredVideos = videos.filter(v => v.channel === 'Yadelew Asrie');
                break;
            case 'YouTube Music':
                filteredVideos = videos.filter(v => v.duration.includes(':') && parseInt(v.duration.split(':')[0]) < 5);
                break;
            default:
                filteredVideos = [...videos];
        }
        
        videoContainer.innerHTML = '';
        filteredVideos.forEach(video => {
            videoContainer.appendChild(createVideoElement(video));
        });
    }
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchBar.value.toLowerCase();
        if (query.trim() === '') return;
        
        const filteredVideos = videos.filter(video => 
            video.title.toLowerCase().includes(query) ||
            video.channel.toLowerCase().includes(query)
        );
        
        videoContainer.innerHTML = '';
        if (filteredVideos.length === 0) {
            videoContainer.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #606060;">
                    <h3 style="margin-bottom: 10px;">No videos found for "${query}"</h3>
                    <p>Try different keywords</p>
                </div>
            `;
        } else {
            filteredVideos.forEach(video => {
                videoContainer.appendChild(createVideoElement(video));
            });
        }
    }
    
    // Voice search simulation
    voiceBtn.addEventListener('click', function() {
        const searchQueries = [
            'JavaScript tutorials',
            'CSS animations',
            'Web development courses',
            'HTML basics',
            'React JS tutorial'
        ];
        const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
        
        searchBar.value = randomQuery;
        searchBar.focus();
        setTimeout(() => {
            performSearch();
        }, 500);
    });
    
    // Upload button functionality
    uploadBtn.addEventListener('click', function() {
        alert('Upload feature would open here!\nYou can upload videos up to 15 minutes long.');
    });
    
    // YouTube Apps button functionality
    appsBtn.addEventListener('click', function() {
        alert('YouTube Apps menu would open here!\nShowing all YouTube applications.');
    });
    
    // Notification bell click
    notificationBtn.addEventListener('click', function() {
        notificationsCount.textContent = '0';
        notificationsCount.style.backgroundColor = '#606060';
        
        // Show notification dropdown (simulated)
        alert('Notifications cleared!\n• Yadelew Asrie uploaded a new video\n• Setalem Mengesha is live now\n• 2 new videos in your subscriptions');
    });
    
    // User profile click
    userProfile.addEventListener('click', function() {
        const profileMenu = confirm('Profile Menu\n\n1. Your Channel\n2. YouTube Studio\n3. Switch Account\n4. Sign Out\n\nClick OK for Your Channel, Cancel to close');
        
        if (profileMenu) {
            alert('Redirecting to your channel...');
        }
    });
    
    // Video click - open modal
    document.addEventListener('click', function(e) {
        const videoPreview = e.target.closest('.video-preview');
        if (videoPreview) {
            const videoId = videoPreview.dataset.id;
            const video = videos.find(v => v.id == videoId);
            
            if (video) {
                openVideoModal(video);
            }
        }
    });
    
    // Open video modal
    function openVideoModal(video) {
        modalVideoTitle.textContent = video.title;
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Close video modal
    closeModal.addEventListener('click', closeVideoModal);
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    function closeVideoModal() {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
        
        // Focus search on Ctrl+K or /
        if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
            e.preventDefault();
            searchBar.focus();
        }
        
        // Space bar to play/pause (simulated)
        if (e.key === ' ' && videoModal.style.display === 'flex') {
            e.preventDefault();
            alert('Video would play/pause here!');
        }
    });
    
    // Initialize tooltips with better positioning
    function initTooltips() {
        const tooltipContainers = document.querySelectorAll('.btn1, .btn2, .btn3, .btn4, .btn5');
        
        tooltipContainers.forEach(container => {
            const tooltip = container.querySelector('.tooltip');
            if (tooltip) {
                // Center tooltip
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
            }
        });
    }
    
    // Load more videos on scroll (simulated)
    let isLoading = false;
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            isLoading = true;
            setTimeout(() => {
                // Add 2 more videos
                const moreVideos = [
                    {
                        id: videos.length + 1,
                        thumbnail: 'yade.jpg',
                        channelLogo: '—Pngtree—education logo vector image_4092977.png',
                        title: 'Learn Node.js in 60 Minutes',
                        channel: 'Yadelew Asrie',
                        views: '1.5M Views',
                        time: '2 Weeks Ago',
                        duration: '12:45'
                    },
                    {
                        id: videos.length + 2,
                        thumbnail: 'sete.jpg',
                        channelLogo: '—Pngtree—education logo vector image_4092977.png',
                        title: 'Database Design Principles',
                        channel: 'Setalem Mengesha',
                        views: '850K Views',
                        time: '1 Month Ago',
                        duration: '18:20'
                    }
                ];
                
                moreVideos.forEach(video => {
                    videos.push(video);
                    videoContainer.appendChild(createVideoElement(video));
                });
                
                isLoading = false;
                console.log('Loaded more videos!');
            }, 1000);
        }
    });
    
    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'icon-btn dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.title = 'Toggle dark mode';
    darkModeToggle.style.marginLeft = '5px';
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '☀️';
            document.body.style.backgroundColor = '#0f0f0f';
            document.body.style.color = '#f1f1f1';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '🌙';
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    document.querySelector('.right').insertBefore(darkModeToggle, userProfile);
    
    // Initialize everything
    loadVideos();
    initTooltips();
    
    // Add pulse animation to notification bell
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .btn5 {
            animation: pulse 2s infinite;
        }
        
        .dark-mode .boss,
        .dark-mode .side-bar,
        .dark-mode .video-preview {
            background-color: #212121;
            border-color: #303030;
        }
        
        .dark-mode .search-bar,
        .dark-mode .search-btn,
        .dark-mode .voice-btn {
            background-color: #121212;
            border-color: #303030;
            color: #f1f1f1;
        }
        
        .dark-mode .icon-btn:hover {
            background-color: #303030;
        }
        
        .dark-mode .video-title {
            color: #f1f1f1;
        }
        
        .dark-mode .video-info {
            color: #aaa;
        }
        
        /* Fallback for missing icon images */
        .icon-btn img {
            background-color: transparent !important;
        }
        
        /* Ensure icons are visible */
        .search-icon,
        .voice-icon,
        .upload-icon,
        .apps-icon,
        .notifications-icon {
            filter: brightness(0) invert(0);
        }
        
        .dark-mode .search-icon,
        .dark-mode .voice-icon,
        .dark-mode .upload-icon,
        .dark-mode .apps-icon,
        .dark-mode .notifications-icon {
            filter: brightness(0) invert(1);
        }
    `;
    document.head.appendChild(style);
});