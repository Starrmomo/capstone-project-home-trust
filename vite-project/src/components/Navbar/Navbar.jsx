
import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <>
            <nav>
                <h1 className={Styles.back}>LOGO</h1>

                <ul>
                    <li><Link to="/">SecureRental</Link></li>
                    <li><Link to="/trust-verification">TrustVerification</Link></li>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/landingpage">Landingpage</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/propertydetails">Property</Link></li>
                    <li><Link to="/addproperty">Addproperty</Link></li>
                    <li><Link to="/feebreakdown">Feebreakdown</Link></li>
                    <li><Link to="/landlorddashboard">Landlorddashboard</Link></li>
                    <li><Link to="/basicinfo">Basicinfo</Link></li>
                    <li><Link to="/detailamenities">Detailamenities</Link></li>
                    <li><Link to="/reviewmoveout">Reviewmoveout</Link></li>
                    <li><Link to="/paymentreceipt">Paymentreceipt</Link></li>
                    <li><Link to="/paymentsucess">Paymentsucess</Link></li>
                    <li><Link to="/securecheckout">Securecheckout</Link></li>
                    <li><Link to="/tenantlegalright">Tenantlegalright</Link></li>
                    <li><Link to="/tenantreport">Tenantreport</Link></li>
                    <li><Link to="/tenantprofile">Tenantprofile</Link></li>
                    <li><Link to="/securitydeposit">Securitydeposit</Link></li>
                    <li><Link to="/selfie-verification">SelfieVerification</Link></li>
                    <li><Link to="/verify-phone">VerifyPhone</Link></li>
                    <li><Link to="/reset-password">ResetPassword</Link></li>
                    <li><Link to="termsandcondition">Termsandcondition</Link></li>
                    <li><Link to="uploadid">Uploadid</Link></li>




                </ul>
            </nav>

        </>

    )
}

