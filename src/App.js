import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemTable from './components/ItemTable';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegiterComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateItemForm from './components/CreateItemForm';
import ItemDetails from './components/ItemDetails';
import DiscontinuedItemForm from './components/DiscontinuedItemForm';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/items" component={ItemTable} />
          <Route path="/add-item/:itemCode" component={CreateItemForm} />
          <Route path="/itemDetails/:itemCode" component={ItemDetails} />
          <Route path="/discontinued-item/:itemCode" component={DiscontinuedItemForm} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
