// Switch between login/register/dashboard sections
function switchSection(section) {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("register-section").classList.add("hidden");
  document.getElementById("dashboard-section").classList.add("hidden");

  if (section === "login") {
    document.getElementById("login-section").classList.remove("hidden");
  } else if (section === "register") {
    document.getElementById("register-section").classList.remove("hidden");
  } else if (section === "dashboard") {
    document.getElementById("dashboard-section").classList.remove("hidden");
  }
}

// Save user to localStorage
function saveUser(username, password) {
  let users = JSON.parse(localStorage.getItem("busPassUsers")) || {};
  users[username] = password;
  localStorage.setItem("busPassUsers", JSON.stringify(users));
}

// Check if user exists
function isValidUser(username, password) {
  const users = JSON.parse(localStorage.getItem("busPassUsers")) || {};
  return users[username] && users[username] === password;
}

// Handle registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("registerUser").value.trim();
  const password = document.getElementById("registerPass").value;

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("busPassUsers")) || {};
  if (users[username]) {
    alert("Username already exists. Try a different one.");
    return;
  }

  saveUser(username, password);
  alert("Registration successful! Please login.");
  switchSection("login");
});

// Handle login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value;

  if (isValidUser(username, password)) {
    alert("Login successful!");
    switchSection("dashboard");
  } else {
    alert("Invalid username or password. Please register first.");
  }
});

// Logout
function logout() {
  switchSection("login");
  alert("Logged out successfully.");
}

// Handle Bus Pass form
document.getElementById("busPassForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const organization = document.getElementById("organization").value;
  const validity = document.getElementById("validity").value;
  const renew = document.getElementById("renew").checked ? "Yes" : "No";
  const payment = document.getElementById("payment").value;
  const file = document.getElementById("photo").files[0];

  if (!file) {
    alert("Please upload your photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("output");
    output.classList.remove("hidden");
    output.innerHTML = `
      <h3>✅ Bus Pass Generated</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>School/Organization:</strong> ${organization}</p>
      <p><strong>Pass Validity:</strong> ${validity}</p>
      <p><strong>Monthly Renewal:</strong> ${renew}</p>
      <p><strong>Payment Method:</strong> ${payment}</p>
      <img src="${reader.result}" alt="Photo" />
    `;
  };
  reader.readAsDataURL(file);
});
