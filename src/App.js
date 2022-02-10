import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Cart from "./Cart";
import Home from "./Home";
import styled from "styled-components";
import { auth, db } from "./Firebase";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    db.collection("cartItems").onSnapshot((snapshot) => {
      //You can listen to a document with the onSnapshot() method.
      const tempItems = snapshot.docs.map((doc) => ({
        // An initial call using the callback you provide creates a document snapshot
        id: doc.id, // immediately with the current contents of the single document.
        product: doc.data(), // Then, each time the contents change, another call updates the document snapshot
      }));
      setCartItems(tempItems);
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <Router>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Container style={{ backgroundColor: "#eaeded" }}>
          <Header signOut={signOut} user={user} cartItems={cartItems} />
          <Switch>
            <Route path="/cart">
              <Cart cartItems={cartItems} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      )}
    </Router>
  );
}

export default App;

const Container = styled.div`
  background-color: #eaeded;
  height: 100vh;
`;
