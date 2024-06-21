import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PropTypes from 'prop-types';

function AppLayout({ children }) {
  AppLayout.propTypes = {
    children: PropTypes.node.isRequired
    };
  return (
    <>
      <Navbar />
      <div className='font-Poppins'>{children}</div>
      <Footer />
    </>
  );
}

export default AppLayout;
