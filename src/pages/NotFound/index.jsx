import styles from "./notFound.module.css";
import urso from "../../assets/404-Urso.png";
import Typography from "../../components/Typography";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.conteudo}>
        <Typography variant="h1" color="--offwhite" className={styles.texto}>
          404- Not Found
        </Typography>

        <img src={urso} alt="Urso" className={styles.img}></img>

        <Typography variant="p" color="--offwhite" className={styles.texto}>
          Não conseguimos encontrar a página que você estava procurando.
          <br />
          Que tal explorar nossas Foemações
        </Typography>

        <Link to="/" className={styles.link}>
          volta para o início
        </Link>
      </div>
    </main>
  );
};
