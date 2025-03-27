import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import DashboardMain from "../Dashboard/DashboardMain";
import StakeMain from "../Stake/StakeMain";
import IncomeMain from "../IncomeGraph/IncomeMain";
import WithdrawMain from "../Withdrawal/WithdrawMain";
import FormMAin from "../Form/FormMAin";
import ProfileMain from "../Profile/ProfileMain";
// import SupportMain from "../Support/SupportMain";
import MatrixMain from "../Matrix/MatrixMain";
import CoreMain from "../Staking Rewards/CoreMain";
import GlobalMain from "../Community Rewards/GlobalMain";
import FortuneMain from "../Walking Rewards/FortuneMain";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import RankingMain from "../GlobalRanking/RankingMain";
import LapseMain from "../Dashboard/LapseWallet/LapseMain";
// import Support from "../SupportSystem/Support";
import Home from "../Landing/Home";
import LearnMore from "../Landing/LearnMore";
import Terms from "../Terms";
import AutoMain from "../AutoGlobal/AutoMain";
import BackToTop from "../BackToTop";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooterSidebar = [
    "/",
    "/learnmore",
    "/SignUp",
    "/SignIn",
    "/signin",
    "/Terms",
    "SignUp",
  ].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooterSidebar && <Header />}
      {!hideHeaderFooterSidebar && <Sidebar />}
      {children}
      {<BackToTop />}
      {!hideHeaderFooterSidebar && <Footer />}
    </>
  );
};

// function ScrollToHash() {
//   const { pathname, hash } = useLocation();

//   useEffect(() => {
//     if (hash) {
//       // Delay needed because DOM might not be ready immediately
//       setTimeout(() => {
//         const element = document.querySelector(hash);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }
//       }, 100);
//     }
//   }, [pathname, hash]); // Watch both pathname and hash!

//   return null;
// }

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
      {/* <ScrollToHash/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<DashboardMain />} />
          <Route path="/TeamData" element={<StakeMain />} />
          {/* <Route path="/IncomeGraph" element={<IncomeMain />} /> */}
          {/* <Route path="/Form" element={<FormMAin />} /> */}
          <Route path="/StakingReward" element={<CoreMain />} />
          <Route path="/CommunityRewards" element={<GlobalMain />} />
          <Route path="/WalkingRewards" element={<FortuneMain />} />
          {/* <Route path="/Ranking" element={<RankingMain />} /> */}
          {/* <Route path="/Profile" element={<ProfileMain />} /> */}
          {/* <Route path="/Support" element={<Support />} /> */}
          {/* <Route path="/Matrix" element={<MatrixMain />} /> */}
          {/* <Route path="/LapseWallet" element={<LapseMain />} /> */}
          {/* <Route path="/AutoGlobal" element={<AutoMain />} /> */}
          {/* <Route path="/Terms" element={<Terms />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
