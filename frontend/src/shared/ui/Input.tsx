import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  error = false,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <input
      className={className}
      style={{
        height: '34px',
        padding: '0 12px',
        fontSize: '13px',
        color: 'var(--text-primary)',
        backgroundColor: 'var(--bg-card)',
        border: error ? '1px solid #ef4444' : '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        outline: 'none',
        transition: 'var(--transition-smooth)',
        ...style,
      }}
      onFocus={e => {
        if (!error) e.currentTarget.style.borderColor = 'var(--primary-color)';
        props.onFocus?.(e);
      }}
      onBlur={e => {
        if (!error) e.currentTarget.style.borderColor = 'var(--border-color)';
        props.onBlur?.(e);
      }}
      {...props}
    />
  );
};
