import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles/HomePage.module.css";
import Image from "react-bootstrap/Image";
import appStyles from "../../App.module.css";



function HomePage() {
  return (
    <div className="grid-container" style={{ textAlign: "center" }}>
      <div className="title" style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }}>
        <h2 style={{ fontSize: "8rem", margin: "4rem", textAlign: "center" }}>
          TASK{" "}
          <span
            style={{
              fontFamily: "Bebas Neue",
              color: "gold",
              fontWeight: "bold",
              letterSpacing: "-0.05em",
            }}
          >
            Cruncher
          </span>
        </h2>

        <h3 style={{ padding: "2rem" }}>Welcome to Task Cruncher where we remember your tasks so you don't have to!</h3>
      </div>
      <div className="body" style={{ gridRow: "3 / 5", gridColumn: "1 / 2", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
          <div>
            <Image
              className={`${appStyles.FillerImage}`}
              src={"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80"}
              style={{ borderRadius: "50%", border: "3px solid gold" }}  
            />
            <p style={{fontSize:"1.5rem"}}>Enter your tasks</p>
          </div>
          <div>
          <Image
              className={`${appStyles.FillerImage}`}
              src={"https://images.unsplash.com/photo-1541480601022-2308c0f02487?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}
              style={{ borderRadius: "50%", border: "3px solid gold" }}
            />
            <p style={{fontSize:"1.5rem"}}>Set deadlines</p>
          </div>
          <div>
          <Image
              className={`${appStyles.FillerImage}`}
              src={"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}
              style={{ borderRadius: "50%", border: "3px solid gold"}}
            />
            <p style={{fontSize:"1.5rem"}}>Tick your tasks off as you achieve your goals</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="column-content" style={{ margin: "8rem" }}>
          <h3>Let's get crunching!</h3>
          <Button color="warning" className="mr-3">
            <Link to="/signin" style={{ color: "inherit" }}>
              Sign In
            </Link>
          </Button>
          <Button color="warning">
            <Link to="/signup" style={{ color: "inherit" }}>
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
