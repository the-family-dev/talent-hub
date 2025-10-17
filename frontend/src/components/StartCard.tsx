export const StartCard = () => {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 p-6 md:p-10 rounded-2xl text-center">
      {/* Заголовок */}
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Добро пожаловать в TalentHub
      </h1>
      <h2 className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
        Платформа, объединяющая компании, вузы и молодых специалистов для
        карьерного роста и сотрудничества.
      </h2>

      {/* Блоки */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Для компаний</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Размещайте вакансии и находите перспективных кандидатов.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Для вузов</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Сопровождайте студентов и управляйте заявками на стажировки.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Для соискателей</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Просматривайте вакансии и откликайтесь онлайн.
          </p>
        </div>
      </div>
    </div>
  );
};
