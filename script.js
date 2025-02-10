<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roblox User Info</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background: radial-gradient(circle, rgba(44, 44, 122, 1) 0%, rgba(0, 255, 255, 0.8) 100%);
            color: white;
            text-align: center;
            margin: 0;
            padding: 0;
            animation: backgroundAnimation 5s ease-in-out infinite;
        }

        @keyframes backgroundAnimation {
            0% { background: radial-gradient(circle, rgba(44, 44, 122, 1) 0%, rgba(0, 255, 255, 0.8) 100%); }
            50% { background: radial-gradient(circle, rgba(0, 0, 255, 1) 0%, rgba(0, 255, 255, 0.8) 100%); }
            100% { background: radial-gradient(circle, rgba(44, 44, 122, 1) 0%, rgba(0, 255, 255, 0.8) 100%); }
        }

        h2 {
            margin-top: 50px;
            font-size: 2.5rem;
        }

        input[type="text"] {
            padding: 10px;
            margin-top: 20px;
            width: 250px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        button {
            padding: 10px 20px;
            font-size: 1rem;
            margin-top: 10px;
            background-color: #2575fc;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #6a11cb;
        }

        #loading {
            font-size: 1.5rem;
            margin-top: 20px;
        }

        #userInfo {
            margin-top: 30px;
            animation: fadeIn 1s ease-in-out;
        }

        img {
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin: 20px 0;
        }

        .user-details {
            font-size: 1.2rem;
            margin: 10px 0;
        }

        .error-message {
            color: #f44336;
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>

    <h2>Enter Roblox Username</h2>
    <input type="text" id="username" placeholder="Enter username">
    <button onclick="fetchRobloxData()">Get Info</button>
    
    <div id="loading" style="display: none;">Loading...</div>
    <div id="userInfo"></div>

    <script src="script.js"></script>
</body>
</html>
