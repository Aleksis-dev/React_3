import { useState , useEffect } from 'react';
import "./App.css";

function Posts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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
  const [message, setMessage] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get('title');
    const content = formData.get('content');
    const post = { title, content }
    savePost({post});
    form.reset();
    setMessage("Successfully stored your post!")
  }
  return (
    <>
      <h1>Hello world!</h1>
      <Form submitHandler={submitHandler}/>
      <p>{message}</p>
      <Posts />
    </>
  )
}

export default App;