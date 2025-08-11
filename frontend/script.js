document.getElementById("addWorkout").addEventListener("click", function () {
    let exercise = document.getElementById("exercise").value;
    let sets = document.getElementById("sets").value;
    let reps = document.getElementById("reps").value;
    let weight = document.getElementById("weight").value;  
   
    if (exercise && sets && reps && weight) { 
      let workoutList = document.getElementById("workout-list");
  
      let listItem = document.createElement("li");  
      listItem.classList.add("workout-item"); 
  
      listItem.innerHTML = `
        <span><strong>${exercise}</strong> - ${sets} sets x ${reps} reps @ ${weight}kg</span>
        <button class="delete-btn">&times;</button>
      `;
  
      workoutList.appendChild(listItem); 
  
      // Clear fields
      document.getElementById("exercise").value = "";
      document.getElementById("sets").value = "";
      document.getElementById("reps").value = "";
      document.getElementById("weight").value = "";
    } else {
      alert("Please fill in all fields");
    }
  });
  
  document.getElementById("workout-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
    }
  });
    