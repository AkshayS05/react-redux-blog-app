import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

import format from 'date-fns/format';

const NewPost = () => {
  // for new post
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // using dependancy date-fns
    const datetime = format(new Date(), 'MMM dd,yyyy pp ');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate('/');
  };
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
          id="postTitle"
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
          id="postBody"
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
