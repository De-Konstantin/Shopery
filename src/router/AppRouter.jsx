import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound/NotFound';
import SignIn from '../pages/SignIn/SignIn';
import CreateAccountForm from '../pages/Register/CreateAccountForm';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/CreateAccount" element={<CreateAccountForm />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
