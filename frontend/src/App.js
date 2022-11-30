// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
import Navigation from "./components/Navigation.js"
import * as React from "react";
import { AuthProvider } from "./context/Authentication.js"
import axios from "axios";
function App () {
    const [data, setData] = React.useState({
        mess: null,
    })
    // React.useEffect(() => {
    //     fetch("http://localhost:3001/api")
    //         .then((res) => res.json())
    //         .then((data) => setData((prev) => ({
    //             ...prev,
    //             mess: data.message,
    //         })))
    // },[])
    return (
        <>
            <h1 className = "title" style={{color: 'black', display: "flex", margin: "20px", justifyContent: "center", fontFamily: "Arial", fontWeight: "bold"}}>BruinYelp</h1>
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </>
    );
}

export default App;
