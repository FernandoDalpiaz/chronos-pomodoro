import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Entenda como funciona a técnica pomodoro
      </RouterLink>
      <RouterLink href='/'>
        Focus Pomodoro &copy; {new Date().getFullYear()} - Feito por Fernando L.
        Dalpiaz
      </RouterLink>
    </footer>
  );
}
