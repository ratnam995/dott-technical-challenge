import { useNavigate } from 'react-router-dom';

import './home.page.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className='home-wrapper'>
      <h1 className='site-title'>Image Classifier Pro</h1>
      <div className='classifier-list'>
        <button className={'classifier-btn'} onClick={() => navigate("/dog")}>Dogs</button>
      </div>
    </div>
  );
}

export default HomePage;
