import React from "react";
import "../CSS/Home.css";
import useFetch from "../hooks/useFetch";

function Home() {
  const {
    data: blog,
    newPost,
    editMode,
    handleDelete,
    handleSubmit,
    handleEdit,
    handleInputChange,
  } = useFetch();

  return (
    <div className="home">
      <div className="blog-post">
        <h1>{editMode ? "Edit Post" : "Blog Posts"}</h1>
      </div>

      <form>
        <div className="flex">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={newPost.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex">
          <label htmlFor="body">Post: </label>
          <textarea
            name="body"
            id="body"
            value={newPost.body}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <input
          type="button"
          value={editMode ? "Update Post" : "Post"}
          onClick={handleSubmit}
          id="btn"
        />
      </form>

      <div className="blogs">
        {blog.map((b) => (
          <div className="blog" key={b.id}>
            <h3>{b.title}</h3>
            <p>{b.body}</p>
            <div className="contain-btn">
              <button className="delete" onClick={() => handleDelete(b.id)}>
                Delete
              </button>
              <button className="delete" onClick={() => handleEdit(b)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
