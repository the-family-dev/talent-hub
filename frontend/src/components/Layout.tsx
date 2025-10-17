import { Route, Routes } from "react-router";
import { NavigationMenu } from "./NavigationMenu";
import { MainPage } from "../pages/MainPage";

export const Layout = () => {
  return (
    <div className="flex flex-row gap-4 p-8 w-full">
      <NavigationMenu />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
};
