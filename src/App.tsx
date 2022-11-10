import "./app.scss";
import Routes from "./routes/routes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";

function App() {
  const { user }: any = useContext(AuthContext);

  return <Routes user={user} />;
}

export default App;
