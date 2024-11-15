export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>Copyright &copy; 2024 - All Rights Reserved</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "20px 0",
    marginTop: "40px",
    textAlign: "center",
    position: "relative",
    width: "100%",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "10px",
  },
};
