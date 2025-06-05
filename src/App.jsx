import { useState, useEffect } from 'react';
import "./App.css";

function Posts({ setMessage, posts, setPosts }) {
  const deletePost = (indexToDelete) => {
    const updatedPosts = posts.filter((_, i) => i !== indexToDelete);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setMessage("Post deleted successfully");
  };

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
              <button onClick={() => deletePost(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function savePost(post, setPosts, setMessage) {
  const storedArray = JSON.parse(localStorage.getItem("posts")) || [];
  storedArray.push(post);
  localStorage.setItem("posts", JSON.stringify(storedArray));
  setPosts(storedArray);
  setMessage("Post saved successfully");
}

function Form({ submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">Title:</label> <br />
      <input type="text" name="title" placeholder="My amazing post title" required /> <br />
      <label htmlFor="content">Content:</label> <br />
      <textarea name="content" placeholder="My extraordinary post content" required></textarea> <br />
      <button>Post</button>
    </form>
  );
}

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

function Message({ text, duration = 2, onClear }) {
  useEffect(() => {
    if (!text) return;

    let isActive = true;

    (async () => {
      await wait(duration);
      if (isActive) onClear();
    })();

    return () => {
      isActive = false;
    };
  }, [text, duration, onClear]);

  if (!text) return null;

  return <p>{text}</p>;
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
    const post = { title, content };

    savePost(post, setPosts, setMessage);
    form.reset();
  };

  return (
    <>
      <h1>Hello world!</h1>
      <Form submitHandler={submitHandler} />
      <Posts setMessage={setMessage} setPosts={setPosts} posts={posts} />
      <Message text={message} duration={2} onClear={() => setMessage(null)} />
    </>
  );
}

export default App;