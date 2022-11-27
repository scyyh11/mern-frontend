import React, {useState} from 'react';
import Papa from 'papaparse';
import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti';
import './App.css'

const MAX_VISIBILITY = 2;

const Card = ({url, name, doi, year}) => (
  <div className='card'>
    <img src={url} class='image' alt={name}></img>
    <div className="info">
      <p>Title: {name}</p>
      <p>Doi: {doi}</p>
      <p>Year: {year}</p>
    </div>
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    this.importCSV();
  }

  importCSV = () => {
    Papa.parse("https://files.catbox.moe/hxstdu.csv", {
      header: true,
      download: true,
      complete: function(results) {
        this.setState({ images: results.data });
        console.log(this.state.images);
        console.log(this.state.images);
      }.bind(this)
    });
  }

  render() {
    document.title = "Image viewer";
    return (
      <div className='app'>
      <Carousel>
        {this.state.images.map((image) => (
          <Card url={image.url} name={image.name} doi={image.doi} year={image.year}/>
        ))}
      </Carousel>
    </div>
    )
  }
}