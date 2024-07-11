import NoInterConnection from './components/NoInternetConnection'
import Login from './routes/login';
function App() {

  return (
		<>
			<NoInterConnection>
        <Login/>
			</NoInterConnection>
		</>
	);
}

export default App
