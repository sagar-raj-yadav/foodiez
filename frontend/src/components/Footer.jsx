import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.column}>
            <h3 style={styles.heading}>Tasty Table</h3>
            <p style={styles.text}>
              Delivering delicious food to your doorstep.
            </p>
          </div>
          <div style={styles.column}>
            <h4 style={styles.subHeading}>Quick Links</h4>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>Home</a></li>
              <li><a href="#" style={styles.link}>Menu</a></li>
              <li><a href="#" style={styles.link}>About Us</a></li>
              <li><a href="#" style={styles.link}>Contact</a></li>
            </ul>
          </div>
          <div style={styles.column}>
            <h4 style={styles.subHeading}>Contact Us</h4>
            <p style={styles.text}>Email: info@foodiez.com</p>
            <p style={styles.text}>Phone: +123 456 7890</p>
            <p style={styles.text}>Address: 123 Food Street, Flavor Town</p>
          </div>
        </div>
        <div style={styles.socialRow}>
          <a href="#" style={styles.socialLink}>Facebook</a>
          <a href="#" style={styles.socialLink}>Twitter</a>
          <a href="#" style={styles.socialLink}>Instagram</a>
        </div>
        <div style={styles.copyRight}>
          &copy; {new Date().getFullYear()} Foodiez. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  column: {
    flex: '1 1 300px',
    margin: '10px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    margin: '5px 0',
  },
  socialRow: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  socialLink: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '1rem',
  },
  copyRight: {
    fontSize: '0.9rem',
  },
  '@media (max-width: 768px)': {
    row: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    socialRow: {
      flexDirection: 'column',
    },
    socialLink: {
      margin: '5px 0',
    },
  },
};

export default Footer;
