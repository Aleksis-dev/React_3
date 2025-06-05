import { useState } from 'react';
import "./App.css";

function Posts({ setMessage, posts, setPosts }) {

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
              <button onClick={() => deletePost(posts, setPosts, index, setMessage)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function savePost(post, setPosts) {
  let storedArray = JSON.parse(localStorage.getItem("posts")) || [];
  storedArray.push(post)
  localStorage.setItem("posts", JSON.stringify(storedArray));
  setPosts(storedArray);
}

function deletePost(posts, setPosts, indexToDelete, setMessage) {
  const updatedPosts = posts.filter((_, i) => i !== indexToDelete);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  setPosts(updatedPosts);
  (async () => {
    setMessage("Successfully deleted the post ", indexToDelete);
    await wait(2);
    setMessage(null); 
  })();
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
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);
  const [message, setMessage] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get('title');
    const content = formData.get('content');
    const post = { title, content }
    savePost(post, setPosts);
    form.reset();
    (async () => {
      setMessage("Successfully stored your post!")
      await wait(2);
      setMessage(null); 
    })();
  }
  return (
    <>
      <h1>Hello world!</h1>
      <Form submitHandler={submitHandler} setMessage={setMessage}/>
      <p>{message}</p>
      <Posts setMessage={setMessage} setPosts={setPosts} posts={posts}/>
    </>
  )
}

export default App;