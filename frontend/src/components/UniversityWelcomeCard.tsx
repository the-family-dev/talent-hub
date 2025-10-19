import { Card, CardHeader, CardBody } from "@heroui/react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export const UniversityWelcomeCard = () => {
  return (
    <Card className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">
      <CardHeader className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Добро пожаловать, уважаемый представитель ВУЗа!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Чтобы вам было проще начать пользоваться платформой, мы кратко опишем
          функционал, к которому можно перейти через меню слева
        </p>
      </CardHeader>

      <CardBody className="space-y-8">
        {/* Мои стажировки */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AcademicCapIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Мои стажировки
            </h2>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Посмотреть все оставленные заявки на стажировки</li>
            <li>
              Создать новую заявку на стажировку — заполнить требуемые поля,
              добавить описание и загрузить резюме студентов. После создания
              заявка автоматически направится в кабинеты HR компаний-резидентов,
              которые смогут принять её для рассмотрения.
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};
