import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  ChartBarIcon,
  UserIcon,
  BuildingLibraryIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export const HrWelcomeCard = () => {
  return (
    <Card className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">
      <CardHeader className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Добро пожаловать, уважаемый HR!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Чтобы вам было проще начать пользоваться платформой, мы кратко опишем
          функционал каждой вкладки в левом меню
        </p>
      </CardHeader>

      <CardBody className="space-y-8">
        {/* Вакансии */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <DocumentMagnifyingGlassIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Вакансии
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Просмотреть все вакансии компании</li>
            <li>
              Создать новую вакансию с использованием предзаполненного шаблона и
              в режиме реального времени посмотреть, как она будет отображаться.
              После создания вакансия направится на модерацию и после одобрения
              — опубликуется
            </li>
            <li>
              Посмотреть отклики всех кандидатов в карточке опубликованной
              вакансии
            </li>
            <li>
              Пригласить на собеседование, принять на работу или отказать
              кандидату после изучения его данных и резюме
            </li>
          </ul>
        </div>

        {/* Стажировки */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BuildingLibraryIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Стажировки
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Посмотреть все активные стажировки от ВУЗов</li>
            <li>
              Одобрить проведение стажировки после изучения данных предлагаемых
              студентов
            </li>
          </ul>
        </div>

        {/* Банк резюме */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <UserIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Банк резюме
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Просмотреть все резюме, загруженные кандидатами и ВУЗами</li>
            <li>Выгрузить базу (в разработке)</li>
          </ul>
        </div>

        {/* Аналитика */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ChartBarIcon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Аналитика
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              Посмотреть статистику по количеству опубликованных вакансий,
              откликов, резюме и нанятых специалистов
            </li>
            <li>
              Изучить аналитику по динамике и присвоенным статусам откликов
            </li>
            <li>
              Посмотреть данные по наиболее востребованным навыкам в вакансиях
              компании
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};
