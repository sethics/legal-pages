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
    // Note: code after redirect won't execute, but keeping 'return' is good practice
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
        document.getElementById('accountLabel').textContent = 'Demo Creator';
        document.getElementById('accountStatus').textContent = 'Active';
        return;
    }
    
    try {
        // FIXED: Removed template literal backticks, use parentheses for fetch
        const response = await fetch(`${API_BASE}?action=account&openid=${encodeURIComponent(openId)}`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('accountLabel').textContent = data.account.accountLabel;
            document.getElementById('accountStatus').textContent = data.account.status;
        }
    } catch (error) {
        console.error('Failed to load account:', error);
        // Fallback to demo data on error
        document.getElementById('accountLabel').textContent = 'Demo Creator';
        document.getElementById('accountStatus').textContent = 'Active';
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
        // FIXED: Removed template literal backticks, use parentheses for fetch
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
