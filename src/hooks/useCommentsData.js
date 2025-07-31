import { useEffect, useState } from 'react';

const COMMENTS_API = 'https://jsonplaceholder.typicode.com/comments';
const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';

export default function useCommentsData() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommentsAndPosts = async () => {
      const commentsRes = await fetch(COMMENTS_API);
      const commentsData = await commentsRes.json();

      const postsRes = await fetch(POSTS_API);
      const postsData = await postsRes.json();

      const postsMap = {};
      postsData.forEach(post => {
        postsMap[post.id] = post.title;
      });

      const storedEdits = JSON.parse(localStorage.getItem('commentEdits') || '{}');
      const updatedComments = commentsData.map(comment => ({
        ...comment,
        ...storedEdits[comment.id]
      }));

      setPosts(postsMap);
      setComments(updatedComments);
      setLoading(false);
    };

    fetchCommentsAndPosts();
  }, []);

  return { comments, posts, loading, setComments };
}