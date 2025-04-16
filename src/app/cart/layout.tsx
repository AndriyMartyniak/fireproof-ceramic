export const metadata = {
  title: 'Корзина | Термокераміка',
  description: 'Перегляньте та відредагуйте вміст вашої корзини. Оформіть замовлення на шамотні плити та вогнетривкі матеріали.',
  keywords: 'корзина, замовлення, шамотні плити, вогнетривкі матеріали, термокераміка',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 