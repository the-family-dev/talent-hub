import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import {
  BuildingOfficeIcon,
  UserIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

export const AuthPage = observer(() => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "applicant" | "company" | "university") => {
    if (role === "applicant") {
      navigate("/applicant");
      return;
    }
    if (role === "company") {
      navigate("/company");
      return;
    }
    navigate("/university");
  };

  return (
    <div className="transition-colors duration-300 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Карточка соискателя */}
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          onClick={() => handleRoleSelect("applicant")}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6">
              <UserIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Я ищу работу
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Ищу интересную работу, хочу разместить резюме и откликаться на
              вакансии
            </p>

            <ul className="text-left space-y-3 mb-6">
              {[
                "Размещайте резюме",
                "Откликайтесь на вакансии",
                "Получайте предложения от работодателей",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>

            <Button
              onPress={() => handleRoleSelect("applicant")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Найти работу
            </Button>
          </div>
        </div>

        {/* Карточка компании */}
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          onClick={() => handleRoleSelect("company")}
        >
          <div className="p-8 flex flex-col justify-between h-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6">
                <BuildingOfficeIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Я компания
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Ищу сотрудников, хочу размещать вакансии и находить кандидатов
              </p>

              <ul className="text-left space-y-3 mb-6">
                {[
                  "Размещайте вакансии",
                  "Найдите подходящих кандидатов",
                  "Управляйте откликами",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              onPress={() => handleRoleSelect("company")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 dark:bg-green-500 dark:hover:bg-green-400"
            >
              Найти сотрудников
            </Button>
          </div>
        </div>

        {/* Карточка представителя вуза */}
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          onClick={() => handleRoleSelect("university")}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mb-6">
              <AcademicCapIcon className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Я представитель вуза
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Хочу сотрудничать с компаниями, публиковать студентов и
              выпускников для стажировок и практик
            </p>

            <ul className="text-left space-y-3 mb-6">
              {[
                "Размещайте профили студентов",
                "Публикуйте стажировки и практики",
                "Налаживайте сотрудничество с работодателями",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>

            <Button
              onPress={() => handleRoleSelect("university")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 dark:bg-purple-500 dark:hover:bg-purple-400"
            >
              Начать сотрудничество
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
