import { observer } from "mobx-react-lite";
import { Route, Routes, useNavigate } from "react-router";
import { CompanyPages } from "./pages/CompanyPages";
import { useEffect } from "react";
import { routerStore } from "./modules/router/routerStore";
import { ApplicantPages } from "./pages/ApplicantPages";
import { NoAuthPages } from "./pages/NoAuthPages";
import { UniversityPages } from "./pages/UniversityPages";

const App = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    // прокидываем navigate в стор один раз
    routerStore.setNavigate(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/*" element={<NoAuthPages />} />
        <Route path="company/*" element={<CompanyPages />} />
        <Route path="university/*" element={<UniversityPages />} />
        <Route path="applicant/*" element={<ApplicantPages />} />
      </Routes>
    </>
  );
});

export default App;
