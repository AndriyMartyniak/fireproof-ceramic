'use client';

import { motion } from 'framer-motion';

interface Spec {
  label: string;
  temp: number;
  al2o3: number;
  fe2o3: number;
  density: number;
  porosity: number;
  strength: number;
  refractoriness: number;
}

interface SpecsTableProps {
  specs: Spec[];
}

export default function SpecsTable({ specs }: SpecsTableProps) {
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="overflow-x-auto">
      <motion.table
        className="min-w-full bg-white rounded-lg shadow-md"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr className="bg-blue-50 text-gray-900">
            <th className="py-4 px-6 text-left font-semibold">Маркування</th>
            <th className="py-4 px-6 text-left font-semibold">Температура застосування (°C)</th>
            <th className="py-4 px-6 text-left font-semibold">Al₂O₃ (%)</th>
            <th className="py-4 px-6 text-left font-semibold">Fe₂O₃ (%)</th>
            <th className="py-4 px-6 text-left font-semibold">Об'ємна щільність (г/см³)</th>
            <th className="py-4 px-6 text-left font-semibold">Пористість (%)</th>
            <th className="py-4 px-6 text-left font-semibold">Міцність на холодне дроблення (МПа)</th>
            <th className="py-4 px-6 text-left font-semibold">Вогнетривкість при навантаженні (°C)</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <motion.tr
              key={spec.label}
              className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              variants={rowVariants}
            >
              <td className="py-4 px-6 text-gray-700">{spec.label}</td>
              <td className="py-4 px-6 text-gray-700">{spec.temp}</td>
              <td className="py-4 px-6 text-gray-700">{spec.al2o3}</td>
              <td className="py-4 px-6 text-gray-700">{spec.fe2o3}</td>
              <td className="py-4 px-6 text-gray-700">{spec.density}</td>
              <td className="py-4 px-6 text-gray-700">{spec.porosity}</td>
              <td className="py-4 px-6 text-gray-700">{spec.strength}</td>
              <td className="py-4 px-6 text-gray-700">{spec.refractoriness}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}