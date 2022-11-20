// import React from "react";
 
// // We use Route in order to define the different routes of our application
// import { Route, Routes } from "react-router-dom";
 
// // We import all the components we need in our app
// import Navbar from "./components/navbar";
// import RecordList from "./components/recordList";
// import Edit from "./components/edit";
// import Create from "./components/create";
 
// const App = () => {
//   return (
//     <div>
//     <Routes>
//       <Route exact path="/" element={<RecordList />} />
//       <Route path="/edit/:id" element={<Edit />} />
//       <Route path="/create" element={<Create />} />
//       </Routes>
//       <Navbar />
//     </div>
//  );
// };
 
// export default App;

import React, {useState} from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import {TiChevronLeftOutline, TiChevronRightOutline} from 'https://cdn.skypack.dev/react-icons/ti';
import './App.scss'

const CARDS = 5;
const MAX_VISIBILITY = 2;
const state = {
  imageUrl: [
    "https://web.cse.ohio-state.edu/~chen.8028/VisPubImages/Images/1990/VisC.6.1.png",
    "https://web.cse.ohio-state.edu/~chen.8028/VisPubImages/Images/1990/VisC.6.3.png",
    "https://web.cse.ohio-state.edu/~chen.8028/VisPubImages/Images/1990/VisC.6.2.png",
    "https://web.cse.ohio-state.edu/~chen.8028/VisPubImages/Images/1990/VisC.6.6.png",
    "https://web.cse.ohio-state.edu/~chen.8028/VisPubImages/Images/1990/VisC.6.5.png",
  ]
};

const Card = ({url}) => (
  <div className='card'>
    <img src={url} class='image'></img>
  </div>
);

const Carousel = ({children}) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  
  return (
    <div className='carousel'>
      {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
    </div>
  );
};

const ImgBrowse = () => {
}

const App = () => (
  <div className='app'>
    <Carousel>
      {state.imageUrl.map((image) => (
        <Card url={image} />
      ))}
    </Carousel>
  </div>
);

ReactDOM.render(
  <App/>,
  document.body
);