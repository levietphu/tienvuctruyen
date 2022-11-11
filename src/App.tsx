import "./app.scss";
import Routes from "./routes/routes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";

function App() {
  const { user, loaderUser }: any = useContext(AuthContext);

  return <Routes user={user} loaderUser={loaderUser} />;
}

export default App;
