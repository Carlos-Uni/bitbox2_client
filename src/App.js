import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemTable from './components/ItemTable';
import Login from './components/Login';
import CreateUserForm from './components/CreateUserForm';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateItemForm from './components/CreateItemForm';
import ItemDetails from './components/ItemDetails';

function App() {
  return (
    <>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/items" component={ItemTable} />
            <Route path="/add-item/:itemCode" component={CreateItemForm} />
            <Route path="/itemDetails/:itemCode" component={ItemDetails} />
            {/* <Route path="/update-item/:itemCode" component={UpdateItemForm} /> */}
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
