import { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import format from 'date-fns/format';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = useStoreState((state) => state.posts);
  const setPosts = useStoreState((state) => state.setPosts);
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const getPostById = useStoreState((state) => state.getPostById);

  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = (id) => {
    // to check when the post will be edited and this will replace the time set to it
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    // here we will get the updated texts and use it
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatedPost);
    navigate(`/post/${id}`);
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              id="postTitle"
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
              id="postBody"
            />
            <button type="button" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not found ☹</h2>
          <p>Don't be sad 😁</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
