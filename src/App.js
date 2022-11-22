import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import Header from './Header';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';
import EditPost from './EditPost';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  // useAxiosfetch custom hook
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts',
  );
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);
  return (
    <div className="App">
      <Header title="My Blogs" />

      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Home fetchError={fetchError} isLoading={isLoading} />}
        />
        <Route path="/post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
