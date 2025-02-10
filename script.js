// Log function for the developer console
function logToConsole(message) {
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.value += message + "\n"; // Append message
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll
}

// Unlock the developer console after entering the correct password
document.getElementById('unlockConsoleBtn').addEventListener('click', function () {
    const password = document.getElementById('consolePassword').value;
    if (password === '2010') {
        document.getElementById('devConsole').style.display = 'block';
        logToConsole('Developer Console Unlocked');
    } else {
        logToConsole('Incorrect Password');
    }
});

// Fetch Roblox profile data
document.getElementById('fetchButton').addEventListener('click', function () {
    let username = document.getElementById('username').value;
    logToConsole(`Fetching data for username: ${username}`);

    if (!username) {
        logToConsole('Please enter a valid username');
        return;
    }

    // Start Loading Feedback
    logToConsole('Fetching data...');
    document.getElementById('fetchButton').innerText = "Loading..."; // Change button text

    // Fetch user ID from Roblox API based on the username
    const apiUrl = `https://users.roblox.com/v1/usernames/users?usernames=${username}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                logToConsole(`Error: ${response.status} - ${response.statusText}`);
                document.getElementById('fetchButton').innerText = "Fetch Profile";
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const user = data.data[0];
                logToConsole('Data fetched successfully');
                logToConsole(`Display Name: ${user.displayName}`);
                logToConsole(`Username: ${user.username}`);
                logToConsole(`Avatar URL: ${user.avatarUrl}`);

                // Additional API calls (followers count, etc.)
                fetchFollowersCount(user.id);
                fetchUserPremiumStatus(user.id);
            } else {
                logToConsole('User not found');
                document.getElementById('fetchButton').innerText = "Fetch Profile";
            }
        })
        .catch(error => {
            logToConsole('Error fetching data');
            console.error('Error:', error);
            document.getElementById('fetchButton').innerText = "Fetch Profile";
        });
});

// Fetch Followers count
function fetchFollowersCount(userId) {
    const followersUrl = `https://v1.users.roblox.com/v1/users/${userId}/followers/count`;

    fetch(followersUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.count !== undefined) {
                logToConsole(`Followers: ${data.count}`);
            } else {
                logToConsole('Error fetching followers count');
            }
        })
        .catch(error => {
            logToConsole('Error fetching followers count');
            console.error('Error:', error);
        });
}

// Fetch Premium Status
function fetchUserPremiumStatus(userId) {
    const premiumUrl = `https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`;

    fetch(premiumUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.isPremium !== undefined) {
                const status = data.isPremium ? 'Premium' : 'Not Premium';
                logToConsole(`Premium Status: ${status}`);
            } else {
                logToConsole('Error fetching premium status');
            }
        })
        .catch(error => {
            logToConsole('Error fetching premium status');
            console.error('Error:', error);
        });
}
