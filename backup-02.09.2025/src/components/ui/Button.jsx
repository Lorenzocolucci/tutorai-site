import Link from 'next/link';

// Componente Bottone riutilizzabile e stilizzato
const Button = ({ href, children, variant = 'primary', className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 min-h-[44px]';

  const variants = {
    primary: 'bg-success text-white border-2 border-transparent focus:ring-green-300',
    secondary: 'bg-primary text-white border-2 border-transparent focus:ring-blue-300',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/30',
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles}>
      {children}
    </button>
  );
};

export default Button;
