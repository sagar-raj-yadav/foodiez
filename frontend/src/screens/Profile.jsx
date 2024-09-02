import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import profile from '../../public/navbarimage/profile.png';

const Profile = () => {
    const [user, setUser] = useState({});

    const userData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getuser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });

            if (response.ok) {
                const userdata = await response.json();
                setUser(userdata);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        userData();
    }, []);

    const userdata = {
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        address: "1234 Harmony Street, Green Park, Delhi, 110016",
        foodInterests: ["Italian", "Chinese", "Indian", "Mexican", "Thai"],
        favoriteRestaurants: [
            "Olive Garden",
            "Mainland China",
            "Barbeque Nation",
            "La Piazza",
            "Thai Pavilion",
        ],
        paymentMethods: ["Rupay", "Visa", "MasterCard"],
        orderHistory: [
            "Order #12345 - Pasta Primavera - Olive Garden",
            "Order #67890 - Kung Pao Chicken - Mainland China",
            "Order #11223 - Tandoori Chicken - Barbeque Nation",
        ],
    };

    return (
        <>
            <NavBar />
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Your Profile</h1>
                    <p style={styles.subTitle}>Manage your account and preferences</p>
                </header>
                <section style={styles.profileSection}>
                    <div style={styles.avatarContainer}>
                        <img
                            src={profile}
                            alt="Profile Avatar"
                            style={styles.avatar}
                        />
                    </div>
                    <div style={styles.infoContainer}>
                        <h2 style={styles.name}>{user?.name}</h2>
                        <p style={styles.email}>{user?.email}</p>
                        <p style={styles.address}>
                            <strong>Address:</strong> {userdata?.address}
                        </p>
                    </div>
                </section>
                <section style={styles.detailsSection}>
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}>Food Interests</h3>
                        <p style={styles.foodInterests}>
                            {userdata?.foodInterests.join(', ')}
                        </p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}>Favorite Restaurants</h3>
                        <ul style={styles.restaurantList}>
                            {userdata?.favoriteRestaurants.map((restaurant, index) => (
                                <li key={index} style={styles.restaurantItem}>
                                    {restaurant}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}>Order History</h3>
                        <ul style={styles.orderHistoryList}>
                            {userdata?.orderHistory.map((order, index) => (
                                <li key={index} style={styles.orderHistoryItem}>
                                    {order}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}>Payment Methods</h3>
                        <p style={styles.paymentMethods}>
                            {userdata?.paymentMethods.join(', ')}
                        </p>
                    </div>
                </section>
                <footer style={styles.footer}>
                    <p style={styles.footerText}>© 2024 Food Delivery App. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        color: '#333',
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fafafa',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        background: '#2b3a42',
        borderRadius: '10px 10px 0 0',
        padding: '30px 20px',
        color: '#fff',
    },
    title: {
        fontFamily: "'Merriweather', serif",
        fontSize: '2.2em',
        marginBottom: '5px',
    },
    subTitle: {
        fontSize: '1em',
        fontWeight: '300',
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    avatarContainer: {
        marginRight: '20px',
        flexShrink: 0,
    },
    avatar: {
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        border: '4px solid #2b3a42',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: '1.8em',
        color: '#2b3a42',
    },
    email: {
        fontSize: '1.1em',
        color: '#666',
        marginTop: '8px',
    },
    address: {
        fontSize: '1em',
        color: '#444',
        marginTop: '8px',
    },
    detailsSection: {
        marginBottom: '30px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontFamily: "'Merriweather', serif",
        fontSize: '1.4em',
        color: '#2b3a42',
        marginBottom: '10px',
    },
    foodInterests: {
        fontSize: '1em',
        color: '#444',
        lineHeight: '1.6',
        marginBottom: '15px',
    },
    restaurantList: {
        listStyleType: 'none',
        padding: 0,
        marginBottom: '15px',
    },
    restaurantItem: {
        backgroundColor: '#2b3a42',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '5px',
        marginBottom: '8px',
        display: 'inline-block',
        marginRight: '10px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    },
    orderHistoryList: {
        listStyleType: 'none',
        padding: 0,
        marginBottom: '15px',
    },
    orderHistoryItem: {
        backgroundColor: '#d9d9d9',
        padding: '8px 12px',
        borderRadius: '5px',
        marginBottom: '8px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    },
    paymentMethods: {
        fontSize: '1em',
        color: '#444',
        marginBottom: '15px',
    },
    footer: {
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #ddd',
        backgroundColor: '#fff',
        borderRadius: '0 0 10px 10px',
        padding: '10px 20px',
        boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)',
    },
    footerText: {
        fontSize: '0.9em',
        color: '#666',
    },
};

export default Profile;
