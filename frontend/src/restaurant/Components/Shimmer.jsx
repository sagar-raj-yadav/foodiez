import { shimmer_card_unit, shimmer_menu_card_unit } from "../constants";



const CardShimmer = () => {
  return (
    <div style={styles.shimmerCard}>
      <div style={{ ...styles.shimmerImg, ...styles.animate }}></div>
      <div style={{ ...styles.shimmerTitle, ...styles.animate }}></div>
      <div style={{ ...styles.shimmerTags, ...styles.animate }}></div>
      <div style={{ ...styles.shimmerDetails, ...styles.animate }}></div>
    </div>
  );
};

export const MenuShimmer = () => {
  return (
    <div style={styles.restaurantMenu}>
      <div style={{ ...styles.restaurantSummary, ...styles.strokeColor, ...styles.animate }}>
        <div style={{ ...styles.shimmerImg, ...styles.animate }}></div>
        <div style={styles.restaurantSummaryDetails}>
          <div style={{ ...styles.shimmerW40, ...styles.animate }}></div>
          <div style={{ ...styles.shimmerW20, ...styles.animate }}></div>
          <div style={{ ...styles.shimmerW60, ...styles.animate }}></div>
        </div>
      </div>

      <div style={styles.restaurantMenuContent}>
        <div style={styles.menuItemsContainer}>
          <div style={styles.menuTitleWrap}>
            <div style={{ ...styles.shimmerW40, ...styles.animate }}></div>
            <div style={{ ...styles.shimmerW20, ...styles.animate }}></div>
          </div>
          <div style={styles.menuItemsList}>
            {Array(shimmer_menu_card_unit).fill("").map((element, index) => 
              <div style={styles.shimmerMenuCard} key={index}>
                <div style={styles.shimmerItemDetails}>
                  <div style={{ ...styles.shimmerW40, ...styles.animate }}></div>
                  <div style={{ ...styles.shimmerW20, ...styles.animate }}></div>
                  <div style={{ ...styles.shimmerW60, ...styles.animate }}></div>
                </div>
                <div style={styles.menuImgWrapper}>
                  <div style={{ ...styles.shimmerImg, ...styles.animate }}></div>
                  <div style={{ ...styles.shimmerBtn, ...styles.animate }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div style={styles.shimmerContainer}>
      {Array(shimmer_card_unit).fill("").map((element, index) => {
        return <CardShimmer key={index} />;
      })}
    </div>
  );
};

// Styles
const styles = {
  shimmerCard: {
    width: '300px',
    margin: '16px',
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  shimmerImg: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
  },
  shimmerTitle: {
    width: '60%',
    height: '20px',
    margin: '16px 0',
    backgroundColor: '#f0f0f0',
  },
  shimmerTags: {
    width: '40%',
    height: '20px',
    margin: '16px 0',
    backgroundColor: '#f0f0f0',
  },
  shimmerDetails: {
    width: '80%',
    height: '20px',
    margin: '16px 0',
    backgroundColor: '#f0f0f0',
  },
  shimmerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  restaurantMenu: {
    padding: '20px',
  },
  restaurantSummary: {
    display: 'flex',
    marginBottom: '20px',
  },
  restaurantSummaryDetails: {
    marginLeft: '20px',
  },
  shimmerW40: {
    width: '40%',
    height: '20px',
    backgroundColor: '#f0f0f0',
  },
  shimmerW20: {
    width: '20%',
    height: '20px',
    backgroundColor: '#f0f0f0',
  },
  shimmerW60: {
    width: '60%',
    height: '20px',
    backgroundColor: '#f0f0f0',
  },
  restaurantMenuContent: {
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
  },
  menuItemsContainer: {
    marginBottom: '20px',
  },
  menuTitleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  menuItemsList: {
    display: 'flex',
    flexDirection: 'column',
  },
  shimmerMenuCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  shimmerItemDetails: {
    flex: '1',
  },
  shimmerBtn: {
    width: '60px',
    height: '20px',
    backgroundColor: '#f0f0f0',
  },
};

export default Shimmer;
