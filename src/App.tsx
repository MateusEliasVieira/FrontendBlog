 import '../src/App.css';
 //import Feed from "./pages/feed/Feed.tsx";
 import MyNavbar from "./components/mynavbar/MyNavbar.tsx";
 import Login from "./pages/Login/Login.tsx";

function App() {
  return(
      <section>
        <MyNavbar/>
        <Login/>
      </section>
  )
}

export default App
