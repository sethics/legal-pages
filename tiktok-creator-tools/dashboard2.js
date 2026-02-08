const API_BASE = 'https://www.mtishows.com/tiktok-api.php';

document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const demoMode = true; // FORCE demo mode for testing
    
    // Mock data
    const mockPosts = [
        {
            title: 'TikTok Growth Tips',
            caption: '5 TikTok growth tips every creator needs 🚀 #TikTokTips #CreatorTips',
            status: 'Queued'
        },
        {
            title: 'Behind the Scenes',
            caption: 'Behind the scenes of my content creation process 🎬 #BTS',
            status: 'Posting'
        },
        {
            title: 'Editing Apps Review',
            caption: 'My favorite editing apps for TikTok videos 📱 #EditingTips',
            status: 'Posted'
        },
        {
            title: 'Q&A Session',
            caption: 'Responding to your questions about consistency 💪 #QandA',
            status: 'Queued'
        },
        {
            title: 'Content Planning',
            caption: 'Weekly content planning strategy for creators 📅 #ContentStrategy',
            status: 'Queued'
        }
    ];
    
    // Set account info
    document.getElementById('accountLabel').textContent = 'Demo Creator';
    document.getElementById('accountStatus').textContent = 'Active';
    
    // Calculate stats
    const queued = mockPosts.filter(p => p.status === 'Queued').length;
    const posted = mockPosts.filter(p => p.status === 'Posted').length;
    const drafts = 0;
    
    document.getElementById('queuedCount').textContent = queued;
    document.getElementById('publishedCount').textContent = posted;
    document.getElementById('draftCount').textContent = drafts;
    
    // Display posts
    const container = document.getElementById('queueContent');
    container.innerHTML = mockPosts.map(post => `
        <div class="post-item">
            <div class="post-info">
                <h4>${post.title}</h4>
                <p>${post.caption.substring(0, 100)}...</p>
            </div>
            <span class="post-status status-${post.status.toLowerCase()}">${post.status}</span>
        </div>
    `).join('');
});
