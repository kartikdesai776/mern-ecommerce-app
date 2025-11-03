import { useState } from "react";

export default function Account() {
  const [tab, setTab] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredOrder, setHoveredOrder] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return alert("Please enter a valid email.");

    try {
      let res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      let data = await res.json();

      if (data.message === "Login successful") {
        setLoggedIn(true);
        return;
      }

      res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      data = await res.json();

      if (data.message === "Signup successful") {
        alert("Account created successfully!");
        setLoggedIn(true);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Check if backend is running.");
    }
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '1rem',
      overflow: 'hidden',
    },
    backgroundAnimated: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 0,
      overflow: 'hidden',
    },
    orb1: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
      top: '-10%',
      left: '-10%',
      animation: 'float 20s ease-in-out infinite',
      filter: 'blur(60px)',
    },
    orb2: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
      bottom: '-10%',
      right: '-10%',
      animation: 'float 15s ease-in-out infinite reverse',
      filter: 'blur(60px)',
    },
    orb3: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'pulse 10s ease-in-out infinite',
      filter: 'blur(70px)',
    },
    card: {
      position: 'relative',
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(99, 102, 241, 0.03)',
      borderRadius: '24px',
      padding: '3rem 2.5rem',
      width: '90%',
      maxWidth: '32rem',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      zIndex: 1,
      animation: 'slideUp 0.6s ease-out',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '2.5rem',
      textAlign: 'center',
      color: 'white',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      letterSpacing: '-0.02em',
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem',
      marginBottom: '2.5rem',
    },
    tab: {
      padding: '0.75rem 1.75rem',
      borderRadius: '12px',
      fontWeight: '700',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: 'none',
      fontSize: '1rem',
      position: 'relative',
      overflow: 'hidden',
    },
    tabActive: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      boxShadow: '0 8px 24px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
      transform: 'translateY(-2px)',
    },
    tabInactive: {
      background: 'rgba(30, 41, 59, 0.6)',
      color: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
    },
    tabInactiveHover: {
      background: 'rgba(30, 41, 59, 0.9)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
    },
    sectionTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      marginBottom: '2rem',
      textAlign: 'center',
      color: 'white',
      textShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
    },
    inputContainer: {
      marginBottom: '1.5rem',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '1rem 1.5rem',
      background: 'rgba(30, 41, 59, 0.5)',
      border: '2px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '14px',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
      fontWeight: '500',
    },
    inputFocused: {
      background: 'rgba(30, 41, 59, 0.8)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)',
      transform: 'translateY(-2px)',
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '1rem',
      borderRadius: '14px',
      fontWeight: '700',
      fontSize: '1.1rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
      position: 'relative',
      overflow: 'hidden',
    },
    buttonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 32px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.3)',
    },
    buttonShine: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      transition: 'left 0.5s',
    },
    helpText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.875rem',
      textAlign: 'center',
      marginTop: '1.5rem',
      fontWeight: '500',
    },
    orderContainer: {
      background: 'rgba(15, 23, 42, 0.4)',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid rgba(99, 102, 241, 0.15)',
    },
    orderItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem',
      background: 'rgba(30, 41, 59, 0.6)',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.15)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
    },
    orderItemHover: {
      background: 'rgba(30, 41, 59, 0.9)',
      transform: 'translateX(8px)',
      boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
      borderColor: 'rgba(99, 102, 241, 0.4)',
    },
    orderText: {
      color: 'white',
      fontWeight: '700',
      fontSize: '1.05rem',
    },
    orderDate: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.875rem',
      marginTop: '0.35rem',
      fontWeight: '500',
    },
    badge: {
      padding: '0.6rem 1.25rem',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      fontWeight: '700',
      borderRadius: '10px',
      fontSize: '0.875rem',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '2rem 0',
    },
    icon: {
      width: '6rem',
      height: '6rem',
      margin: '0 auto 2rem',
      opacity: 0.4,
      color: 'white',
      filter: 'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.2))',
    },
    emptyText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.15rem',
      marginBottom: '2rem',
      fontWeight: '500',
    },
    welcomeIcon: {
      display: 'inline-block',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      marginBottom: '2rem',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5), 0 0 40px rgba(102, 126, 234, 0.3)',
      animation: 'bounceIn 0.6s ease-out',
    },
    welcomeTitle: {
      fontSize: '2.75rem',
      fontWeight: '800',
      marginBottom: '1rem',
      color: 'white',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      letterSpacing: '-0.02em',
    },
    welcomeEmail: {
      color: 'rgba(255, 255, 255, 0.85)',
      fontSize: '1.15rem',
      marginBottom: '2.5rem',
      fontWeight: '500',
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(50px, 50px); }
    }
    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounceIn {
      0% { transform: scale(0); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;

  if (loggedIn) {
    return (
      <>
        <style>{keyframes}</style>
        <div style={styles.container}>
          <div style={styles.backgroundAnimated}>
            <div style={styles.orb1}></div>
            <div style={styles.orb2}></div>
            <div style={styles.orb3}></div>
          </div>
          <div style={styles.card}>
            <div style={styles.welcomeIcon}>
              <svg style={{width: '3.5rem', height: '3.5rem', color: 'white'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 style={styles.welcomeTitle}>Welcome Back</h1>
            <p style={styles.welcomeEmail}>{email}</p>
            
            <button
              style={{
                ...styles.button,
                ...(hoveredButton && styles.buttonHover)
              }}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              onClick={() => {
                setLoggedIn(false);
                setTab("login");
                setEmail("");
                setPassword("");
              }}
            >
              <div style={hoveredButton ? {...styles.buttonShine, left: '100%'} : styles.buttonShine}></div>
              Sign Out
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.backgroundAnimated}>
          <div style={styles.orb1}></div>
          <div style={styles.orb2}></div>
          <div style={styles.orb3}></div>
        </div>
        <div style={styles.card}>
          <h1 style={styles.title}>My Account</h1>

          <div style={styles.tabContainer}>
            {["login", "orders", "saved"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                onMouseEnter={() => setHoveredTab(item)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  ...styles.tab,
                  ...(tab === item ? styles.tabActive : styles.tabInactive),
                  ...(hoveredTab === item && tab !== item ? styles.tabInactiveHover : {})
                }}
              >
                {item === "login" ? "Login" : item === "orders" ? "Orders" : "Saved"}
              </button>
            ))}
          </div>

          {tab === "login" && (
            <section>
              <h2 style={styles.sectionTitle}>Welcome</h2>
              <div>
                <div style={styles.inputContainer}>
                  <input
                    type="email"
                    style={{
                      ...styles.input,
                      ...(focusedInput === 'email' && styles.inputFocused)
                    }}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    required
                  />
                </div>
                <div style={styles.inputContainer}>
                  <input
                    type="password"
                    style={{
                      ...styles.input,
                      ...(focusedInput === 'password' && styles.inputFocused)
                    }}
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    required
                  />
                </div>
                <button
                  onClick={handleAuth}
                  style={{
                    ...styles.button,
                    ...(hoveredButton && styles.buttonHover)
                  }}
                  onMouseEnter={() => setHoveredButton(true)}
                  onMouseLeave={() => setHoveredButton(false)}
                >
                  <div style={hoveredButton ? {...styles.buttonShine, left: '100%'} : styles.buttonShine}></div>
                  Continue
                </button>
              </div>
              <p style={styles.helpText}>
                Don't have an account? We'll create one for you automatically.
              </p>
            </section>
          )}

          {tab === "orders" && (
            <section>
              <h2 style={styles.sectionTitle}>Your Orders</h2>
              <div style={styles.orderContainer}>
                {[
                  { id: "10023", status: "Delivered", date: "Nov 1, 2025" },
                  { id: "10007", status: "Delivered", date: "Oct 28, 2025" },
                ].map((order) => (
                  <div
                    key={order.id}
                    style={{
                      ...styles.orderItem,
                      ...(hoveredOrder === order.id && styles.orderItemHover)
                    }}
                    onMouseEnter={() => setHoveredOrder(order.id)}
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    <div>
                      <div style={styles.orderText}>Order #{order.id}</div>
                      <p style={styles.orderDate}>{order.date}</p>
                    </div>
                    <span style={styles.badge}>{order.status}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "saved" && (
            <section style={styles.emptyState}>
              <h2 style={styles.sectionTitle}>Saved Items</h2>
              <div>
                <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p style={styles.emptyText}>No saved items yet</p>
              <button
                style={{
                  ...styles.button,
                  ...(hoveredButton && styles.buttonHover)
                }}
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
              >
                <div style={hoveredButton ? {...styles.buttonShine, left: '100%'} : styles.buttonShine}></div>
                Browse Products
              </button>
            </section>
          )}
        </div>
      </div>
    </>
  );
}