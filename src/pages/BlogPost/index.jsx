import styles from "./blogpost.module.css";
import { ThumbsUpButton } from "../../components/CardPost/ThumbsUpButton";
import { ModalComment } from "../../components/ModalComment";
import { Author } from "../../components/Author";
import Typography from "../../components/Typography";
import { CommentList } from "../../components/CommentList";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { http } from "../../API";

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
    const [comments, setcomments] = useState([]);

    const handleNewComment = (comment) => {

  setcomments([comment, ...comments])

}

  const [post, setPost] = useState(null);

  useEffect(() => {
    http
      .get(`blog-posts/slug/${slug}`)
      .then((response) => {
        console.log("DADOS DA API:", response.data); // <--- ADICIONE ISSO
        setPost(response.data);
        setcomments(response.data.comments || []);
      })

      .catch((error) => {
        if (error.status === 404) {
          navigate("/not-found");
        }
      });
  }, [slug, navigate]);

  if (!post) {
    return null;
  }

  return (
    <main className={styles.main}>
      <article className={styles.card}>
        <header className={styles.header}>
          <figure className={styles.figure}>
            <img
              src={post.cover}
              alt={`Capa do post de titulo: ${post.title}`}
            />
          </figure>
        </header>
        <section className={styles.body}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </section>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <div className={styles.action}>
              <ThumbsUpButton loading={false} />
              <p>{post.likes}</p>
            </div>
            <div className={styles.action}>
              <ModalComment onSuccess={handleNewComment} postId={post?.id} />
              <p>{comments.length}</p>
            </div>
          </div>
          <Author author={post.author} />
        </footer>
      </article>
      <Typography variant="h3">Código:</Typography>
      <div className={styles.code}>
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </div>
      <CommentList comments={comments} />
    </main>
  );
};
