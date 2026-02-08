document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded');
    
    // Set account info
    const accountLabel = document.getElementById('accountLabel');
    const accountStatus = document.getElementById('accountStatus');
    if (accountLabel) accountLabel.textContent = 'Demo Creator';
    if (accountStatus) accountStatus.textContent = 'Active';
    
    // Mock posts data
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
    
    // Calculate and display stats
    const queued = mockPosts.filter(p => p.status === 'Queued').length;
    const posted = mockPosts.filter(p => p.status === 'Posted' || p.status === 'Posting').length;
    const drafts = mockPosts.filter(p => p.status === 'Draft').length;
    
    const queuedEl = document.getElementById('queuedCount');
    const publishedEl = document.getElementById('publishedCount');
    const draftEl = document.getElementById('draftCount');
    
    if (queuedEl) queuedEl.textContent = queued;
    if (publishedEl) publishedEl.textContent = posted;
    if (draftEl) draftEl.textContent = drafts;
    
    console.log('Stats updated:', { queued, posted, drafts });
    
    // Display posts
    const container = document.getElementById('queueContent');
    
    if (!container) {
        console.error('queueContent container not found!');
        return;
    }
    
    console.log('Rendering', mockPosts.length, 'posts');
    
    // Build HTML for posts
    const postsHTML = mockPosts.map(post => {
        const statusClass = post.status.toLowerCase();
        const truncatedCaption = post.caption.length > 100 
            ? post.caption.substring(0, 100) + '...' 
            : post.caption;
        
        return `
            <div class="post-item">
                <div class="post-info">
                    <h4>${post.title}</h4>
                    <p>${truncatedCaption}</p>
                </div>
                <span class="post-status status-${statusClass}">${post.status}</span>
            </div>
        `;
    }).join('');
    
    // Insert into container
    container.innerHTML = postsHTML;
    
    console.log('Posts rendered successfully');
});
