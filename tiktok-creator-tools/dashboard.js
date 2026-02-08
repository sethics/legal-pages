const API_BASE = 'https://www.mtishows.com/tiktok-api.php';

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
//const openId = urlParams.get('openid');
const openId = urlParams.get('openid') || 'demo_user_12345';
const connected = urlParams.get('connected');
const justConnected = urlParams.get('connected') === '1';
const demoMode = urlParams.get('demo') === 'true';

// Allow demo mode for video recording
if (!connected && !demoMode) {
    window.location.href = 'index.html';
    return;
}






// Show success message if just connected
if (justConnected) {
    document.getElementById('successMessage').classList.add('show');
    setTimeout(() => {
        document.getElementById('successMessage').classList.remove('show');
    }, 5000);
}

// Redirect if no openId
//if (!openId) {
  //  window.location.href = 'index.html';
//}

// Fetch account info
async function loadAccountInfo() {
    try {
        const response = await fetch(`${API_BASE}?action=account&openid=${encodeURIComponent(openId)}`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('accountLabel').textContent = data.account.accountLabel;
            document.getElementById('accountStatus').textContent = data.account.status;
        }
    } catch (error) {
        console.error('Failed to load account:', error);
    }
}

// Fetch queue
async function loadQueue() {
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
        showEmptyQueue();
    }
}

function displayQueue(posts) {
    const container = document.getElementById('queueContent');
    
    if (posts.length === 0) {
        showEmptyQueue();
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="post-item">
            <div class="post-info">
                <h4>${escapeHtml(post.title)}</h4>
                <p>${escapeHtml(post.caption || 'No caption').substring(0, 100)}...</p>
            </div>
            <span class="post-status status-${post.status.toLowerCase()}">${post.status}</span>
        </div>
    `).join('');
}

function showEmptyQueue() {
    document.getElementById('queueContent').innerHTML = `
        <div class="queue-empty">
            <div class="queue-empty-icon">📭</div>
            <h3>No posts in queue</h3>
            <p>Your automated posts will appear here once they're added to your workflow</p>
        </div>
    `;
}

function updateStats(posts) {
    const pending = posts.filter(p => p.status === 'Pending').length;
    const published = posts.filter(p => p.status === 'Published').length;
    const draft = posts.filter(p => p.status === 'Draft').length;
    
    document.getElementById('queuedCount').textContent = pending;
    document.getElementById('publishedCount').textContent = published;
    document.getElementById('draftCount').textContent = draft;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load data on page load
loadAccountInfo();
loadQueue();
