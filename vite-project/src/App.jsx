import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Landingpage from "./pages/landingpage/Landingpage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Search from "./pages/search/Search";
import Property from "./pages/propertydetails/propertydetails"
import Addproperty from "./pages/tenantprofile/Tenantprofile";
import Feebreakdown from "./pages/feebreakdown/Feebreakdown";
import Landlorddashboard from "./pages/landlorddashboard/Landlorddashboard";
import Reviewmoveout from "./pages/reviewmoveout/Reviewmoveout";
import Detailamenities from "./pages/detailamenities/Detailamenities";
import Basicinfo from "./pages/basicinfo/Basicinfo";
import Tenantlegalright from "./pages/tenantlegalright/Tenantlegalright";
import Securecheckout from "./pages/securecheckout/Securecheckout";
import Paymentreceipt from "./pages/paymentreceipt/Paymentreceipt";
import Paymentsucess from "./pages/paymentsucess/Paymentsucess";
import Tenantreport from "./pages/tenantreport/Tenantreport";
import Tenantprofile from "./pages/tenantprofile/Tenantprofile";
import Securitydeposit from "./pages/securitydeposit/Securitydeposit";
import SelfieVerification from "./pages/NinVerification/SelfieVerification/SelfieVerification";
import VerifyPhone from "./pages/VerifyPhone/VerifyPhone";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import TrustVerification from "./pages/TrustVerification/TrustVerification";
import SecureRental from "./pages/SecureRental/SecureRental";
import Termsandcondition from "./pages/termsandcondition/Termsandcondition";
import Uploadid from "./pages/uploadid/Uploadid";
import Home from "./pages/Home/Home";





function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SecureRental />} />
        <Route path="/trust-verification" element={<TrustVerification />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="landingpage" element={<Landingpage />} />


        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/propertydetails" element={<Property />} />
        <Route path="/addproperty" element={<Addproperty />} />
        <Route path="/feebreakdown" element={<Feebreakdown />} />
        <Route path="/landlorddashboard" element={<Landlorddashboard />} />
        <Route path="/reviewmoveout" element={<Reviewmoveout />} />
        <Route path="/detailamenities" element={<Detailamenities />} />
        <Route path="/basicinfo" element={<Basicinfo />} />
        <Route path="/tenantlegalright" element={<Tenantlegalright />} />
        <Route path="/securecheckout" element={<Securecheckout />} />
        <Route path="/paymentreceipt" element={<Paymentreceipt />} />
        <Route path="/paymentsucess" element={<Paymentsucess />} />
        <Route path="/tenantprofile" element={<Tenantprofile />} />
        <Route path="/tenantprofile" element={<Tenantprofile />} />
        <Route path="/tenantreport" element={<Tenantreport />} />
        <Route path="/securitydeposit" element={<Securitydeposit />} />
        <Route path="/selfie-verification" element={<SelfieVerification />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/termsandcondition" element={<Termsandcondition />} />
        <Route path="/uploadid" element={<Uploadid />} />

      </Routes>

    </>
  );
}

export default App;

