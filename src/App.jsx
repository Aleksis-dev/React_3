import "./App.css";

function getPosts() {
  return JSON.parse(localStorage.getItem("posts"));
}

function savePost({post}) {
  let storedArray = JSON.parse(localStorage.getItem("posts")) || [];
  storedArray.push(post)
  localStorage.setItem("posts", JSON.stringify(storedArray));
}

function App() {
  return (
    <>
      <h1>Hello world!</h1>
    </>
  )
}

export default App;