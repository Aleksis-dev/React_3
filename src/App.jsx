import "./App.css";

function getPosts() {
  return JSON.parse(localStorage.getItem("posts"));
}

function savePost({post}) {
  let storedArray = JSON.parse(localStorage.getItem("posts")) || [];
  storedArray.push(post)
  localStorage.setItem("posts", JSON.stringify(storedArray));
}

function Form({submitHandler}) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label> <br />
        <input type="text" name="title" placeholder="Your amazing title" /> <br />
        <label htmlFor="content">Content:</label> <br />
        <textarea name="content" placeholder="My extordinary post content"></textarea> <br />
        <button>Post</button>
      </form>
    </>
  )
}

function App() {
  return (
    <>
      <h1>Hello world!</h1>
    </>
  )
}

export default App;