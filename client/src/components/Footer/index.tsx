import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if(window.history.length > 1) { //Check if there is a previous page in the history stack
      navigate(-1);
    } else {
      navigate('/');
    }
  }
  
  return (
    <footer className="bg-header w-full mt-auto text-background p-4 border-t-10 border-accent relative z-3">
      <div className="container text-center sm:mb-5 ">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={handleGoBack}
          >
            &larr; Go Back
          </button>
        )}
        <h4>&copy; {new Date().getFullYear()} - Brett Lintgen, Ivelis Becker, Jacob Peterson, and John Goldade</h4>
      </div>
    </footer>
  );
};

export default Footer;
