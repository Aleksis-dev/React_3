import { useState } from 'react';
import "./App.css";

function Posts() {
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);

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
              <button onClick={() => deletePost(posts, setPosts, index)}>Delete</button>
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

function deletePost(posts, setPosts, indexToDelete) {
  const updatedPosts = posts.filter((_, i) => i !== indexToDelete);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  setPosts(updatedPosts);
}

function Form({submitHandler}) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label> <br />
        <input type="text" name="title" placeholder="My amazing post title" /> <br />
        <label htmlFor="content">Content:</label> <br />
        <textarea name="content" placeholder="My extraordinary post content"></textarea> <br />
        <button>Post</button>
      </form>
    </>
  )
}

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
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
    async function msg() {
      setMessage("Successfully stored your post!")
      await wait(2);
      setMessage(null); 
    }
    msg();
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