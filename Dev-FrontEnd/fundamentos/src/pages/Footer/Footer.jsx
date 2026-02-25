import styles from './Footer.module.css'

function Footer({footer}) {
  return (
    <h2 className={styles.footer}>{footer} </h2>
  )
}

export default Footer
