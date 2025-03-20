import { AdTracker } from './components/AdTracker';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import clickCat from './public/click.jpg'

const Button = ({ onClick, children, to }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    console.log(`${children} button clicked!`);
    onClick?.();
    if (to) {
      navigate(to);
    }
  };

  return (
    <button id={children.toLowerCase()} onClick={handleClick}>
      {children}
    </button>
  );
};

// New Image component with navigation
const ClickableImage = ({ src, alt, to, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    console.log('Image clicked!');
    onClick?.();
    if (to) {
      navigate(to);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onClick={handleClick}
      className="clickable-image"
    />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <AdTracker adId="your-ad-id">
              <div className="ad-content">
                <h2>Sample Advertisement</h2>
                <img
                  src="your-ad-image-url.jpg"
                  alt="Advertisement"
                />
                <Button onClick={() => console.log('Ad clicked')} to="/learn-more">
                  Learn More
                </Button>
              </div>
            </AdTracker>
            
            <main className="content">
              <h1>Your Main Content</h1>
              <ClickableImage
                src={clickCat}
                alt="Continue Reading"
                to="/continue"
                onClick={() => console.log('Image clicked!')}
              />
            </main>
          </div>
        } />
        
        <Route path="/learn-more" element={
          <div className="page-content">
            <h1>Learn More Page</h1>
            <Button onClick={() => console.log('Back clicked')} to="/">
              Back Home
            </Button>
          </div>
        } />
        
        <Route path="/continue" element={
          <div className="page-content">
            <h1>Continue Reading Page</h1>
            <Button onClick={() => console.log('Back clicked')} to="/">
              Back Home
            </Button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;