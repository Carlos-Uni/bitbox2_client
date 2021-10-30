import './App.css';
import ItemTable from './components/ItemTable';
import Login from './components/Login';
import CreateUserForm from './components/CreateUserForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div>
        <Header />
        <div>
          <ItemTable />
        </div>
        <Footer />
      </div>

    </>
  );
}

export default App;
