import { observer } from "mobx-react-lite";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { Button } from "@heroui/react";

export const StartPage = observer(() => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "applicant" | "company") => {
    // Здесь можно сохранить выбор роли в store или localStorage
    if (role === "applicant") {
      navigate("/applicant");
    } else {
      navigate("/company");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Добро пожаловать в CareerHub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите, как вы хотите использовать нашу платформу
          </p>
        </div>

        {/* Карточки выбора */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Карточка соискателя */}
          <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleRoleSelect("applicant")}
          >
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                {/* Иконка */}
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <UserIcon className="w-10 h-10 text-blue-600" />
                </div>

                {/* Заголовок */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Я соискатель
                </h2>

                {/* Описание */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Ищу интересную работу, хочу разместить резюме и откликаться на
                  вакансии
                </p>

                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Размещайте резюме
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Откликайтесь на вакансии
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Получайте предложения от работодателей
                  </li>
                </ul>

                <Button
                  onPress={() => handleRoleSelect("applicant")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Найти работу
                </Button>
              </div>
            </div>
          </div>

          {/* Карточка компании */}
          <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleRoleSelect("company")}
          >
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                {/* Иконка */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <BuildingOfficeIcon className="w-10 h-10 text-green-600" />
                </div>

                {/* Заголовок */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Я компания
                </h2>

                {/* Описание */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Ищу сотрудников, хочу размещать вакансии и находить кандидатов
                </p>

                {/* Преимущества */}
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Размещайте вакансии
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Найдите подходящих кандидатов
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Управляйте откликами
                  </li>
                </ul>

                {/* Кнопка */}
                <Button
                  onPress={() => handleRoleSelect("company")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Найти сотрудников
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Вы всегда сможете изменить тип аккаунта в настройках профиля
          </p>
        </div>
      </div>
    </div>
  );
});
