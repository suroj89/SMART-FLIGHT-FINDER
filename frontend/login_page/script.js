document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);
});

// login-page code 
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        // ✅ store token
        localStorage.setItem('token', data.token);

        // ✅ store real user name (from backend)
        localStorage.setItem("user", JSON.stringify({
            name: data.name
        }));

        // ✅ redirect to main page
        window.location.href = "../main_landing_page/index.html";
    } else {
        alert('Login failed');
    }
});


document.getElementById('logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    
    window.location.href = 'login.html';
});










