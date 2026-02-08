const API_BASE = 'https://www.mtishows.com/tiktok-api.php';

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const openId = urlParams.get('openid') || 'demo_user_12345';
const connected = urlParams.get('connected');
const justConnected = urlParams.get('connected') === '1';
const demoMode = urlParams.get('demo') === 'true';

// Allow demo mode for video recording
if (!connected && !demoMode) {
    window.location.href = 'index.html';
}

// Show success message if just connected
if (justConnected) {
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
}

// Fetch account info
async function loadAccountInfo() {
    // If demo mode, show mock data
    if (demoMode) {
        const accountLabel = document.getElementById('accountLabel');
        const accountStatus = document.getElementById('accountStatus');
        if (accountLabel) accountLabel.textContent = 'Demo Creator';
        if (accountStatus) accountStatus.textContent = 'Active';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}?action=account&openid=${encodeURIComponent(openId)}`);
        const data = await response.json();
        
        if (data.success) {
            const accountLabel = document.getElementById('accountLabel');
            const accountStatus = document.getElementById('accountStatus');
            if (accountLabel) accountLabel.textContent = data.account.accountLabel;
            if (accountStatus) accountStatus.textContent = data.account.status;
        }
    } catch (error) {
        console.error('Failed to load account:', error);
        // Fallback to demo data on error
        const accountLabel = document.getElementById('accountLabel');
        const accountStatus = document.getElementById('accountStatus');
        if (accountLabel) accountLabel.textContent = 'Demo Creator';
        if (accountStatus) accountStatus.textContent = 'Active';
    }
}

// Fetch queue
async function loadQueue() {
    // If demo mode, show mock data
    if (demoMode) {
        displayMockQueue();
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}?action=queue&openid=${encodeURIComponent(openId)}`);
        const data = await response.json();
        
        if (data.success) {
            displayQueue(data.queue);
            updateStats(data.queue);
        } else {
            showEmptyQueue();
        }
    } catch (error) {
        console.error('Failed to load queue:', error);
        // Fallback to demo mode on error
        displayMockQueue();
    }
}

function displayMockQueue() {
    const mockPosts = [
        {
            title: 'TikTok Growth Tips',
            caption: '5 TikTok growth tips every creator needs 🚀 #TikTokTips #CreatorTips',
            status: 'Queued',
            created: '2026-02-08'
        },
        {
            title: 'Behind the Scenes',
            caption: 'Behind the scenes of my content creation process 🎬 #BTS',
            status: 'Posting',
            created: '2026-02-08'
        },
        {
            title: 'Editing Apps Review',
            caption: 'My favorite editing apps for TikTok videos 📱 #EditingTips',
            status: 'Posted',
            created: '2026-02-07'
        },
        {
            title: 'Q&A Session',
            caption: 'Responding to your questions about consistency 💪 #QandA',
            status: 'Queued',
            created: '2026-02-08'
        },
        {
            title: 'Content Planning',
            caption: 'Weekly content planning strategy for creators 📅 #ContentStrategy',
            status: 'Queued',
            created: '2026-02-08'
        }
    ];
    
    displayQueue(mockPosts);
    updateStats(mockPosts);
}

function displayQueue(posts) {
    const container = document.getElementById('queueContent');
    
    if (!container) {
        console.error('queueContent element not found');
        return;
    }
    
    if (posts.length === 0) {
        showEmptyQueue();
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="post-item">
            <div class="post-info">
                <h4>${escapeHtml(post.title || 'Untitled Post')}</h4>
                <p>${escapeHtml(post.caption || 'No caption').substring(0, 100)}${(post.caption || '').length > 100 ? '...' : ''}</p>
            </div>
            <span class="post-status status-${post.status.toLowerCase()}">${post.status}</span>
        </div>
    `).join('');
}

function showEmptyQueue() {
    const container = document.getElementById('queueContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="queue-empty">
            <div class="queue-empty-icon">📭</div>
            <h3>No posts in queue</h3>
            <p>Your automated posts will appear here once they're added to your workflow</p>
        </div>
    `;
}

function updateStats(posts) {
    // Map different status names (your backend might use different values)
    const queued = posts.filter(p => 
        p.status === 'Queued' || p.status === 'Pending'
    ).length;
    
    const published = posts.filter(p => 
        p.status === 'Published' || p.status === 'Posted'
    ).length;
    
    const draft = posts.filter(p => 
        p.status === 'Draft' || p.status === 'Inbox Draft'
    ).length;
    
    const queuedEl = document.getElementById('queuedCount');
    const publishedEl = document.getElementById('publishedCount');
    const draftEl = document.getElementById('draftCount');
    
    if (queuedEl) queuedEl.textContent = queued;
    if (publishedEl) publishedEl.textContent = published;
    if (draftEl) draftEl.textContent = draft;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAccountInfo();
    loadQueue();
});
