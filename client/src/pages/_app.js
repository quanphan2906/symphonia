import "@/styles/globals.css";
import UserProvider from "@/context/UserContext";
import Navbar from "@/components/NavBar";

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<Navbar />
			<Component {...pageProps} />
		</UserProvider>
	);
}
