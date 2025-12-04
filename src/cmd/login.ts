export const loginHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        .login-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }

        .login-header h1 {
            color: #333;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
            font-weight: 500;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        .form-group input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        .login-button {
            width: 100%;
            background-color: #4a90e2;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .login-button:hover {
            background-color: #3a7bc8;
        }

        .login-button:active {
            transform: translateY(1px);
        }

        .error-message {
            color: #e74c3c;
            margin-top: 0.5rem;
            font-size: 0.9rem;
            display: none;
        }

        .hidden-fields {
            display: none;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>Login</h1>
        </div>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <!-- Hidden fields that will be populated from URL parameters -->
            <div class="hidden-fields">
                <input type="hidden" id="callback" name="callback">
                <input type="hidden" id="from" name="from">
                <input type="hidden" id="state" name="state">
            </div>
            
            <button type="submit" class="login-button">Login</button>
            <div id="errorMessage" class="error-message"></div>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const callback = urlParams.get('callback');
            const from = urlParams.get('from');
            let state = urlParams.get('state');
            
            // Auto-generate state if not provided
            if (!state) {
                // Check if state exists in local storage
                state = localStorage.getItem('auth_state');
                if (!state) {
                    // Generate a random state if none exists
                    state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    localStorage.setItem('auth_state', state);
                }
            } else {
                // Store provided state in local storage
                localStorage.setItem('auth_state', state);
            }
            
            // Populate hidden fields
            if (callback) document.getElementById('callback').value = callback;
            if (from) document.getElementById('from').value = from;
            document.getElementById('state').value = state;
            
            // Handle form submission
            const loginForm = document.getElementById('loginForm');
            const errorMessage = document.getElementById('errorMessage');
            
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(loginForm);
                const loginData = {
                    callback: formData.get('callback'),
                    from: parseInt(formData.get('from')),
                    state: formData.get('state'),
                    username: formData.get('username'),
                    password: formData.get('password')
                };
                
                try {
                    const response = await fetch('/api/v1/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginData)
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok && result.redirectUrl) {
                        // Redirect to the provided URL
                        window.location.href = result.redirectUrl;
                    } else {
                        // Show error message
                        errorMessage.textContent = result.error || 'Login failed. Please try again.';
                        errorMessage.style.display = 'block';
                    }
                } catch (error) {
                    errorMessage.textContent = 'Network error. Please try again.';
                    errorMessage.style.display = 'block';
                }
            });
        });
    </script>
</body>
</html>`;