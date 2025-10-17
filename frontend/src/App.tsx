import { observer } from "mobx-react-lite";
import { Route, Routes, useNavigate } from "react-router";
import { StartPage } from "./pages/StartPage";
import { CompanyPages } from "./pages/CompanyPages";
import { useEffect } from "react";
import { routerStore } from "./modules/router/routerStore";
import { ApplicantPages } from "./pages/ApplicantPages";

const App = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    // прокидываем navigate в стор один раз
    routerStore.setNavigate(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="company/*" element={<CompanyPages />} />
        <Route path="applicant/*" element={<ApplicantPages />} />
      </Routes>
    </>
  );
});

export default App;
