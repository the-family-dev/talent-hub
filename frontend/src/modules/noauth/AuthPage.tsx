import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

export const AuthPage = observer(() => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "company" | "university") => {
    if (role === "company") {
      navigate("/company");
      return;
    }
    navigate("/university");
  };

  const cardBaseClasses =
    "bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 flex flex-col";

  return (
    <div className="transition-colors duration-300 w-full py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Карточка компании */}
        <div
          className={cardBaseClasses}
          onClick={() => handleRoleSelect("company")}
        >
          <div className="p-8 flex flex-col flex-1">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6">
                <BuildingOfficeIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Я HR компании-резидента
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Хочу эффективно работать с кандидатами, закрывать вакансии и
                приглашать студентов ВУЗов на стажировки.
              </p>

              <ul className="text-left space-y-3 mb-6">
                {[
                  "Полный цикл управления вакансиями",
                  "Управление потоком кандидатов",
                  "Согласование и управление стажировками",
                  "Аналитика по процессам рекрутинга",
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
              className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 dark:bg-green-500 dark:hover:bg-green-400"
            >
              Найти сотрудников
            </Button>
          </div>
        </div>

        {/* Карточка представителя ВУЗа */}
        <div
          className={cardBaseClasses}
          onClick={() => handleRoleSelect("university")}
        >
          <div className="p-8 flex flex-col flex-1">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mb-6">
                <AcademicCapIcon className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Я представитель ВУЗа
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Хочу сотрудничать с ОЭЗ "Технополис Москва", публиковать
                предложения по стажировкам и помогать студентам получить опыт.
              </p>

              <ul className="text-left space-y-3 mb-6">
                {[
                  "Создание заявок на стажировки и управление их статусом",
                  "Поддержка процесса оформления студентов",
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
            </div>

            <Button
              onPress={() => handleRoleSelect("university")}
              className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 dark:bg-purple-500 dark:hover:bg-purple-400"
            >
              Начать сотрудничество
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
