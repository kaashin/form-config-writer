<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	let queryClient = new QueryClient();
</script>

<QueryClientProvider queryClient={queryClient}>
	<Header />
	
	<main>
		<slot />
	</main>
	
	<footer>
		
	</footer>
</QueryClientProvider>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1500px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
