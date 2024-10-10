import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const Api = "https://api.jsonbin.io/v3/b/670674b7e41b4d34e43fc4bd";
  const apiKey = "$2a$10$wYLVusv1vQx5beP6t.0AjO0ijZWX6aaEJ7JgTQJx2wMJQhSPtaNNa";

  useEffect(() => {
    fetch(Api, {
      headers: {
        "X-Master-Key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.record.record)) {
          setData(data.record.record);
        } else if (typeof data.record === "object") {
          setData([data.record.record]);
        } else {
          console.error("Unexpected data format:", data.record);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [Api, apiKey]);

  // Delete a blog post
  const handleDelete = (id) => {
    const updatedBlog = data.filter((b) => b.id !== id);
    updateBin(updatedBlog);
    setData(updatedBlog); // Corrected here
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
      const updatedBlog = data.map((b) =>
        b.id === currentPostId
          ? { ...b, title: newPost.title, body: newPost.body }
          : b
      );
      updateBin(updatedBlog);
      setData(updatedBlog); // Corrected here
      setEditMode(false);
    } else {
      const newBlogPost = {
        userId: 1,
        id: data.length + 1,
        title: newPost.title,
        body: newPost.body,
      };
      const updatedBlog = [...data, newBlogPost];
      updateBin(updatedBlog);
      setData(updatedBlog); // Corrected here
    }
    setNewPost({ title: "", body: "" });
  };

  // Handle edit button click
  const handleEdit = (post) => {
    setEditMode(true);
    setCurrentPostId(post.id);
    setNewPost({ title: post.title, body: post.body });
  };

  return {
    data,
    newPost,
    editMode,
    handleDelete,
    handleSubmit,
    handleEdit,
    handleInputChange,
  };
};

export default useFetch;
