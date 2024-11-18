import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/Entrypoint";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RefreshButton } from "./components/Buttons";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RefreshButton />
			<main className="flex flex-col min-h-screen items-center py-32">
				<Entrypoint />
			</main>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
