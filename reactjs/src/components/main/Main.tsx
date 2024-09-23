import './Main.css';
import List from '../list/List';
import Details from '../detail/Details';
import Register from '../register/Register';

export default function Main() {
  return (
    <main>
      <List />
      <Details />
      <Register />
    </main>
  );
}