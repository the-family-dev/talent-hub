import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router";
import { CompanyHeader } from "./modules/company/CompanyHeader";
import { StartPage } from "./pages/StartPage";
import { CompanyPages } from "./pages/CompanyPages";

const App = observer(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="company/*" element={<CompanyPages />} />
        {/* <Route path="jobseeker/*" element={<CompanyPages />} /> */}
      </Routes>
      <CompanyHeader />
    </>
  );
});

export default App;
