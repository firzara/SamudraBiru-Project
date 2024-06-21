import { Route, Routes } from "react-router-dom";
import HomePage from "../pages";
import AppLayout from "../layouts/app-layout";
import CategoryPage from "../pages/Category";
import CuacaPage from "../pages/Cuaca";
import MasukPage from "../pages/masuk";
import DaftarPage from "../pages/daftar";
import Destinasi from "../pages/Destinasi";
import Tentangkami from "../pages/tentang";
import Users from "../pages/users";
import Review from "../pages/Review";
import Payment from "../pages/Payment";
import Bayar from "../pages/Bayar";
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path='*' element={<h1>404 Not Found</h1>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/category' element={<ProtectedRoute element={<CategoryPage />} />} />
        <Route path='/cuaca' element={<ProtectedRoute element={<CuacaPage />} />} />
        <Route path='/masuk' element={<MasukPage />} />
        <Route path='/daftar' element={<DaftarPage />} />
        <Route path='/tentang' element={<Tentangkami />} />
        <Route path='/users' element={<ProtectedRoute element={<Users />} />} />
        <Route path='/review' element={<ProtectedRoute element={<Review />} />} />
        <Route path='/payment' element={<ProtectedRoute element={<Payment />} />} />
        <Route path='/bayar' element={<ProtectedRoute element={<Bayar />} />} />
        <Route path='/destinasi' element={<ProtectedRoute element={<Destinasi />} />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
