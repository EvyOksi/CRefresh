async function fetchRobloxData() {
    const username = document.getElementById("username").value;
    const userInfoDiv = document.getElementById("userInfo");
    const loadingDiv = document.getElementById("loading");

    if (!username) {
        userInfoDiv.innerHTML = "Please enter a username.";
        return;
    }

    // Show loading screen and clear previous results
    loadingDiv.style.display = "block";
    userInfoDiv.innerHTML = "";

    try {
        // Fetch user ID
        let userRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
        });

        let userData = await userRes.json();
        if (!userData.data.length) {
            userInfoDiv.innerHTML = "User not found.";
            loadingDiv.style.display = "none";
            return;
        }

        let userId = userData.data[0].id;

        // Fetch user profile, avatar, followers, and following counts concurrently
        let [profileRes, avatarRes, followersRes, followingRes] = await Promise.all([
            fetch(`https://users.roblox.com/v1/users/${userId}`),
            fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`),
            fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
            fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`)
        ]);

        let profileData = await profileRes.json();
        let avatarData = await avatarRes.json();
        let followersData = await followersRes.json();
        let followingData = await followingRes.json();

        let avatarUrl = avatarData.data[0]?.imageUrl || "";

        // Hide loading screen and show fetched data
        loadingDiv.style.display = "none";
        userInfoDiv.innerHTML = `
            <h3>${profileData.displayName} (@${profileData.name})</h3>
            <img src="${avatarUrl}" alt="Avatar"><br>
            <p>Followers: ${followersData.count}</p>
            <p>Following: ${followingData.count}</p>
        `;
    } catch (error) {
        userInfoDiv.innerHTML = "Error fetching data.";
        loadingDiv.style.display = "none";
        console.error(error);
    }
}
