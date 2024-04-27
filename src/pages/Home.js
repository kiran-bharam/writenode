import { useEffect, useState, useRef } from "react";
import { PostCard } from "../components";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useTitle } from "../hooks/useTitle";
import { SkeletonCard } from "../components/Skeleton";

export const Home = () => {
  useTitle("Home");
  const [posts, setPost] = useState(new Array(2).fill(false));
  const [toggle, setToggle] = useState(false);

  const postsRef = useRef(collection(db, "posts"));

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(postsRef.current);
      setPost(
        data.docs.map((document) => ({ ...document.data(), id: document.id }))
      );
    }
    getPosts();
  }, [toggle, postsRef]);

  return (
    <section>
      {posts.map((post, index) =>
        post ? (
          <PostCard
            key={post.id}
            post={post}
            toggle={toggle}
            setToggle={setToggle}
          />
        ) : (
          <SkeletonCard key={index} />
        )
      )}
    </section>
  );
};
