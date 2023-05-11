import MainContainer from './src/containers/MainContainer';
import logo from './src/assets/logo.svg';
const App = () => {
  return (
    <>
      <div className='brand'>
        {/* <span className='brand-span'> */}
          <span>Turtle</span>
          {/* <div className='logo-container'> */}
            <img className='logo' src={logo} alt='turtle logo' />
          {/* </div> */}
          <span>Post</span>
        {/* </span> */}
      </div>
      <MainContainer />
    </>
  );
};

export default App;
