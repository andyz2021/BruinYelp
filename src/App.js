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
function App () {
    return (
        <>
            <h1 style={{color: 'black', display: "flex", justifyContent: "center"}}>BruinYelp</h1>
            <hr/>
            <Navigation/>
        </>
    );
}

export default App;
