// import styles from "./index.css";
import Main from "./Components/Main";
import { BrowserRouter } from "react-router-dom";
import appStore from "./Utils/appStore";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={appStore}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
