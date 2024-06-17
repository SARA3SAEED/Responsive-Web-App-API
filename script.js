// script.js

async function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (name.length <= 5) {
        alert('الاسم يجب أن يكون أكثر من 5 أحرف');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('البريد الالكتروني غير صالح');
        return;
    }

    if (password.length <= 8) {
        alert('كلمة السر يجب أن تكون أكثر من 8 أحرف');
        return;
    }

    const userData = { name, email, password };

    try {
        const response = await fetch('https://665736849f970b3b36c864e7.mockapi.io/login1/1/logIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('تم التسجيل بنجاح!');

            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // Redirect to login page
            window.location.href = 'login.html';
        } else {
            alert('حدث خطأ أثناء التسجيل. حاول مرة أخرى.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء محاولة التسجيل. يرجى المحاولة مرة أخرى لاحقًا.');
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('https://665736849f970b3b36c864e7.mockapi.io/login1/1/logIn');
        const users = await response.json();

        console.log(users); // To check what data is received

        // Find user in the response array
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Save logged-in state to localStorage
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect to profile page
            window.location.href = 'profile.html';
        } else {
            alert('البريد الالكتروني أو كلمة السر غير صحيحة');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.');
    }
}


function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Prevent access to profile page without login
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('profile.html')) {
        const loggedIn = localStorage.getItem('loggedIn');
        const user = JSON.parse(localStorage.getItem('user'));

        if (loggedIn) {
            document.getElementById('username').innerText = user.name;
        } else {
            window.location.href = 'login.html';
        }
    }
});
