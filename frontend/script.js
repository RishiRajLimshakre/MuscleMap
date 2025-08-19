// 3-dot menu dropdown 
function toggleMenu() {
  const dropdown = document.getElementById("menuDropdown");
  const isShown = dropdown.classList.toggle("show");
  document.body.classList.toggle("menu-open", isShown); 
}
window.onclick = function(e) {
  if (!e.target.matches('.menu-icon')) {
    let dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains('show')) {
        dropdowns[i].classList.remove('show');
        document.body.classList.remove('menu-open'); // this will prevent body scrolling
      }
    }
  }
};

function updateMenuLinks() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  document.getElementById("signup-link").style.display = isLoggedIn ? "none" : "block";
  document.getElementById("login-link").style.display = isLoggedIn ? "none" : "block";
  document.getElementById("logout-link").style.display = isLoggedIn ? "block" : "none";
} 
updateMenuLinks();


// this is signup/ login/ logout logic
const modalBg = document.getElementById("modal-background");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");


document.getElementById("signup-link").addEventListener("click", function(e) {
  e.preventDefault();
  modalBg.style.display = "flex";
  signupForm.style.display = "block"; 
  loginForm.style.display = "none";
  document.getElementById("menuDropdown").classList.remove('show');
});


document.getElementById("login-link").addEventListener("click", function(e) {
  e.preventDefault();
  modalBg.style.display = "flex";
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  document.getElementById("menuDropdown").classList.remove('show');
});

document.getElementById("logout-link").addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("token");
  showAlert("Logged out!");
  updateMenuLinks();
  window.location.reload();
});

document.getElementById("close-modal").onclick = function() {
  modalBg.style.display = "none";
};
document.getElementById("close-modal2").onclick = function() {
  modalBg.style.display = "none";
};
modalBg.addEventListener("click", function(e) {
  if (e.target === modalBg) modalBg.style.display = "none";
});
document.getElementById("auth-modal").addEventListener("click", function(e) {
  e.stopPropagation();
});

// Signup API
signupForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  fetch("http://192.168.29.66:7000/api/auth/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
  if (data._id || data.message === "User already exists") {
    showAlert("Signup successful! Please login.");
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  } else {
    showAlert(data.message || "Signup failed.");
  }
  updateMenuLinks();
})
  .catch(() => showAlert("Signup error!"));
});
// Login API
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  fetch("http://192.168.29.66:7000/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      showAlert("Login successful!");
      modalBg.style.display = "none";
      window.location.reload();
    } else {
      showAlert(data.message || "Login failed.");
    }
  })
  .catch(() => showAlert("Login error!")); 
});


let guestWorkouts = []; // Temporary store for guest users
let token = localStorage.getItem("token");
let isLoggedIn = !!token;

// it's fetch workouts if logged in
if (isLoggedIn) {
  fetch("http://192.168.29.66:7000/api/workouts", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    let grouped = groupByDate(data);
    displayGroupedWorkouts(grouped);
  })
  .catch(err => console.error(err));
}

document.getElementById("addWorkout").addEventListener("click", function () {
  let exercise = document.getElementById("exercise").value;
  let sets = document.getElementById("sets").value;
  let reps = document.getElementById("reps").value;
  let weight = document.getElementById("weight").value;
  let today = new Date();
  let formattedDate = today.toLocaleDateString("en-GB", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric" 
  }).replace(/ /g, "-"); // e.g., 14-Aug-2025

  if (exercise && sets && reps && weight) {
    if (!isLoggedIn) {
      guestWorkouts.push({ exercise, sets, reps, weight, date: formattedDate });
      displayGroupedWorkouts(groupByDate(guestWorkouts));
      showAlert("⚠ Your workouts will only be saved if you log in!");
    } else {
      fetch("http://192.168.29.66:7000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: exercise, sets, reps, weight })
      })
      .then(res => res.json())
      .then(() => {
        fetch("http://192.168.29.66:7000/api/workouts", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => displayGroupedWorkouts(groupByDate(data)));
      })
      .catch(err => console.error(err));
    }
    document.getElementById("exercise").value = "";
    document.getElementById("sets").value = "";
    document.getElementById("reps").value = "";
    document.getElementById("weight").value = "";
  } else {
    showAlert("Please fill in all fields");
  }
});

//it will display  groups & workouts 
function groupByDate(workouts) {
  return workouts.reduce((acc, workout) => {
    let formattedDate;
    if (workout.date) {
      formattedDate = new Date(workout.date).toLocaleDateString("en-GB", { 
        day: "2-digit", 
        month: "short", 
        year: "numeric" 
      }).replace(/ /g, "-");
    } else {
      formattedDate = "Unknown Date";
    }
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(workout);
    return acc;
  }, {});
}

function displayGroupedWorkouts(grouped) {
  let workoutList = document.getElementById("workout-list");
  workoutList.innerHTML = "";
  Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a)).forEach(date => {
    let dateHeader = document.createElement("h3");
    dateHeader.textContent = date;
    workoutList.appendChild(dateHeader);
    grouped[date].forEach(w => {
  if (Array.isArray(w.exercises)) {
    w.exercises.forEach(ex => {
      let listItem = document.createElement("li");
      listItem.classList.add("workout-item");
      listItem.innerHTML = `
        <span><strong>${ex.name}</strong> - ${ex.sets} sets x ${ex.reps} reps @ ${ex.weight}kg</span>
        <button class="delete-btn">&times;</button>
      `;
      workoutList.appendChild(listItem); 
    });
  }
});

  });
}

document.getElementById("workout-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});

function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert-popup";
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove(); 
  }, 3000);
}
