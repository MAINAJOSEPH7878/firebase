// Initialize Firebase with your config
firebase.initializeApp({
  apiKey: "AIzaSyAwxv7BPihNbpjAxDjLl86BM4JFmsvOiwE",
  authDomain: "joseph-s-app-1333b.firebaseapp.com",
  projectId: "joseph-s-app-1333b",
  storageBucket: "joseph-s-app-1333b.appspot.com",
  messagingSenderId: "847428338788",
  appId: "1:847428338788:web:ff8f746ebc5df5eba5cb71"
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  if (task !== "") {
    db.collection("tasks").add({
      task: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    taskInput.value = "";
  }
}

// Function to render tasks
function renderTasks(doc) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
  `;
  taskList.appendChild(taskItem);
}

// Real-time listener for tasks
db.collection("tasks")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {
        renderTasks(change.doc);
      }
    });
  });

// Function to delete a task
function deleteTask(id) {
  db.collection("tasks").doc(id).delete();
}
