import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}) => {
  const getStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'inherit',
      fontSize: size === 'sm' ? '12px' : size === 'lg' ? '15px' : '13px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      outline: 'none',
      border: 'none',
      padding: size === 'sm' ? '4px 8px' : size === 'lg' ? '10px 18px' : '6px 12px',
      whiteSpace: 'nowrap',
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--primary-color)',
        color: '#ffffff',
      };
    }

    if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
      };
    }

    if (variant === 'ghost' || variant === 'icon') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
        padding: variant === 'icon' ? '6px' : baseStyle.padding,
      };
    }

    return baseStyle;
  };

  return (
    <button style={{ ...getStyle(), ...style }} className={className} {...props}>
      {children}
    </button>
  );
};
