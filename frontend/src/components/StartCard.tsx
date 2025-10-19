export const StartCard = () => {
  return (
    <>
      <div className="w-full bg-gray-200 dark:bg-gray-900 p-6 md:p-10 rounded-2xl text-center">
        {/* Заголовок */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Добро пожаловать в Хаб Талантов
        </h1>
        <h2 className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Платформа, объединяющая компании-резиденты, администрацию ОЭЗ
          «Технополис Москва» и ВУЗы для сотрудничества в рекрутинге студентов и
          высококвалифицированных специалистов
        </h2>
      </div>
      {/* Блоки */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
          <h3 className="text-lg font-semibold mb-1">
            Для HR компаний-резидентов
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 md:text-md max-w-96 mx-auto">
            Размещайте вакансии, участвуйте в предложениях
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 md:text-md max-w-96 mx-auto">
            по стажировкам от ВУЗов и управляйте откликами
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 md:text-md max-w-96 mx-auto">
            от перспективных кандидатов
          </p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl  text-center">
          <h3 className="text-lg font-semibold mb-1">
            Для представителей ВУЗов
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-96 mx-auto">
            Создавайте заявки на стажировки и сопровождайте кадровое оформление
            студентов
          </p>
        </div>
      </div>
    </>
  );
};
