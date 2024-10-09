// import React, { useEffect, useState } from "react";
// import "../CSS/Home.css";

// function Home() {
//   const [blog, setBlog] = useState([]);
//   const [newPost, setNewPost] = useState({ title: "", body: "" });
//   const Api = "https://api.jsonbin.io/v3/b/670674b7e41b4d34e43fc4bd";
//   const apiKey = "$2a$10$wYLVusv1vQx5beP6t.0AjO0ijZWX6aaEJ7JgTQJx2wMJQhSPtaNNa";

//   // Fetch the blog posts on component mount
//   useEffect(() => {
//     fetch(Api, {
//       headers: {
//         "X-Master-Key": apiKey,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch the blog data");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data.record.record)) {
//           setBlog(data.record.record);
//         } else if (typeof data.record === "object") {
//           setBlog([data.record.record]);
//         } else {
//           console.error("Unexpected data format:", data.record);
//         }
//       })
//       .catch((error) => console.error("Error fetching data: ", error));
//   }, []);

//   const handleDelete = (id) => {
//     console.log(`Deleting post with id: ${id}`);

//     // Filter out the blog post locally
//     const updatedBlog = blog.filter((b) => b.id !== id);

//     // Update the blog state locally
//     setBlog(updatedBlog);

//     // Update the JSONBin with the new blog data after deletion
//     updateBin(updatedBlog);
//   };

//   // Update the bin with new data
//   const updateBin = (updatedBlog) => {
//     fetch(Api, {
//       method: "PUT",
//       headers: {
//         "X-Master-Key": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ record: updatedBlog }),
//     })
//       .then((res) => res.json())
//       .then((data) => console.log("Updated bin: ", data))
//       .catch((error) => console.error("Error updating bin: ", error));
//   };

//   // Handle form input changes for the new post
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setNewPost((prevPost) => ({
//       ...prevPost,
//       [id]: value,
//     }));
//   };

//   // Handle form submission to add a new blog post
//   const handleSubmit = () => {
//     const newBlogPost = {
//       userId: 1,
//       id: blog.length + 1,
//       title: newPost.title,
//       body: newPost.body,
//     };

//     // Update the blog data with the new post
//     const updatedBlog = [...blog, newBlogPost];
//     updateBin(updatedBlog);
//     setBlog(updatedBlog);
//   };

//   return (
//     <div className="home">
//       <div className="blog-post">
//         <h1>Blog Posts</h1>
//       </div>

//       <form>
//         <div className="flex">
//           <label htmlFor="title">Title: </label>
//           <input
//             type="text"
//             id="title"
//             value={newPost.title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="flex">
//           <label htmlFor="body">Post: </label>
//           <textarea
//             name="body"
//             id="body"
//             value={newPost.body}
//             onChange={handleInputChange}
//             required
//           ></textarea>
//         </div>

//         <input type="button" value="Post" onClick={handleSubmit} id="btn" />
//       </form>

//       <div className="blogs">
//         {blog.map((b) => (
//           <div className="blog" key={b.id}>
//             <h3>{b.title}</h3>
//             <p>{b.body}</p>
//             <div className="contain-btn">
//               <button className="delete" onClick={() => handleDelete(b.id)}>
//                 Delete
//               </button>
//               <button className="delete">Edit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import "../CSS/Home.css";

function Home() {
  const [blog, setBlog] = useState([]); // Stores the blog posts
  const [newPost, setNewPost] = useState({ title: "", body: "" }); // For new post or edit post form
  const [editMode, setEditMode] = useState(false); // Track if in edit mode
  const [currentPostId, setCurrentPostId] = useState(null); // Track the id of the post being edited

  const Api = "https://api.jsonbin.io/v3/b/670674b7e41b4d34e43fc4bd";
  const apiKey = "$2a$10$wYLVusv1vQx5beP6t.0AjO0ijZWX6aaEJ7JgTQJx2wMJQhSPtaNNa";

  // Fetch the blog posts on component mount
  useEffect(() => {
    fetch(Api, {
      headers: {
        "X-Master-Key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.record.record)) {
          setBlog(data.record.record);
        } else if (typeof data.record === "object") {
          setBlog([data.record.record]);
        } else {
          console.error("Unexpected data format:", data.record);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Delete a blog post
  const handleDelete = (id) => {
    const updatedBlog = blog.filter((b) => b.id !== id);
    updateBin(updatedBlog);
    setBlog(updatedBlog);
  };

  // Update the bin with new data
  const updateBin = (updatedBlog) => {
    fetch(Api, {
      method: "PUT",
      headers: {
        "X-Master-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ record: updatedBlog }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Updated bin: ", data))
      .catch((error) => console.error("Error updating bin: ", error));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [id]: value,
    }));
  };

  // Handle form submission for adding or updating a post
  const handleSubmit = () => {
    if (editMode) {
      // Update the existing post
      const updatedBlog = blog.map((b) =>
        b.id === currentPostId ? { ...b, title: newPost.title, body: newPost.body } : b
      );
      updateBin(updatedBlog);
      setBlog(updatedBlog);
      setEditMode(false); // Exit edit mode after updating
    } else {
      // Add a new post
      const newBlogPost = {
        userId: 1,
        id: blog.length + 1,
        title: newPost.title,
        body: newPost.body,
      };
      const updatedBlog = [...blog, newBlogPost];
      updateBin(updatedBlog);
      setBlog(updatedBlog);
    }
    setNewPost({ title: "", body: "" }); // Clear input fields
  };

  // Handle edit button click
  const handleEdit = (post) => {
    setEditMode(true);
    setCurrentPostId(post.id);
    setNewPost({ title: post.title, body: post.body }); // Pre-fill form with current post data
  };

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
