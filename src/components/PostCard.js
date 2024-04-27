import { auth, db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export const PostCard = ({ post, toggle, setToggle }) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));

  const handleDelete = async () => {
    const id = post.id;
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setToggle(!toggle);
  };

  return (
    <div className="card">
      <p className="title">{post.title}</p>
      <p className="description">{post.description}</p>
      <p className="control">
        <span className="author">{post.author.name}</span>

        {isAuth && post.author.id === auth.currentUser.uid && (
          <span onClick={handleDelete} className="delete">
            <i className="bi bi-trash3"></i>
          </span>
        )}
      </p>
    </div>
  );
};
