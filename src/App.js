import './App.css';
import ItemTable from './components/ItemTable';
import Login from './components/Login';
import CreateUserForm from './components/CreateUserForm';

function App() {
  return (
    <>
      <Login />
      <ItemTable />
      <CreateUserForm />
    </>
  );
}

export default App;
