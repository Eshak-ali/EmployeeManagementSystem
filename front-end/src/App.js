import logo from "./logo.svg";
import "./App.css";
import Main from "./Employee-manage-system/Main/Main.js";
import Context from "./Employee-manage-system/login-register/context.js";
import { useEffect } from "react";
import axios from "axios";

function App() {
  async function storeAdmin() {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/admin/set_admin`
      );

      if (res.data) {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    storeAdmin();
  }, []);

  return (
    <div className="App">
      <Context>
        <Main />
      </Context>
    </div>
  );
}

export default App;
