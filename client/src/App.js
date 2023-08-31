import logo from './logo.svg';
//import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoute';

function App() {
  return (
    <div className="App">
  <AppRoutes/>
      <Navbar />
    </div>
  );
}

export default App;
