'use client';

import { motion } from 'framer-motion';

export default function About() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const timelineEvents = [
    { year: '2010', event: 'Заснування компанії Termokeramika' },
    { year: '2015', event: 'Розширення виробництва шамотних плит' },
    { year: '2020', event: 'Отримання міжнародного сертифікату якості' },
    { year: '2023', event: 'Запуск нового заводу в Україні' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Виробництво шамотних плит
        </motion.h1>

        {/* Вступний блок */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 mb-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Наші технології</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            У компанії "Термо Кераміка" ми пишаємося сучасним підходом до виробництва шамотних плит. Наші продукти виготовляються з використанням передових технологій, що забезпечують високу якість і довговічність. Кожен етап виробництва ретельно контролюється, щоб гарантувати відповідність найвищим стандартам.
          </p>
        </motion.div>
        
        {/* Етапи виробництва */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Сировина</h3>
            <p className="text-gray-600">
              Шамотні плити виготовляються на основі високоякісної кальцинованої шамотної глини, вогнетривких глин та каолінів. Ми обираємо лише екологічно чисті матеріали, які забезпечують високу вогнетривкість і міцність.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Технологічний процес</h3>
            <p className="text-gray-600">
              У виробництві застосовуються два методи – сухе і напівсухе пресування. Ці технології дозволяють створювати плити з різними характеристиками, залежно від потреб клієнтів.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Контроль якості</h3>
            <p className="text-gray-600">
              Виробничий процес здійснюється на сучасних лініях із комп’ютерним управлінням. Кожна партія проходить суворий контроль якості, щоб забезпечити стабільність характеристик і відповідність стандартам.
            </p>
          </motion.div>
        </div>


        {/* Таймлайн */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Наша історія
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-1/2 px-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">{event.year}</h3>
                    <p className="text-gray-600">{event.event}</p>
                  </div>
                </div>
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Додаткова інформація */}
        <motion.div
          className="bg-blue-50 rounded-lg p-8 mb-12 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Чому обирають нас?</h2>
          <p className="text-lg text-gray-700">
            Завдяки багаторічному досвіду, сучасному обладнанню та високоякісним матеріалам, ми створюємо шамотні плити, які відповідають найвищим вимогам промисловості. Наші продукти – це поєднання надійності, екологічності та інновацій.
          </p>
        </motion.div>

        {/* Заклик до дії */}
        <motion.div
          className="bg-blue-50 rounded-lg p-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Хочете дізнатися більше?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Зв’яжіться з нами, щоб отримати консультацію або замовити продукцію!
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Зв’язатись із нами
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}