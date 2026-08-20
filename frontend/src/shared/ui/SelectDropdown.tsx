import React, { useEffect, useRef } from 'react';
import { Icon } from './Icon';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: string;
}

export interface SelectDropdownProps<T = string> {
  isOpen: boolean;
  onClose: () => void;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  width?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function SelectDropdown<T extends string = string>({
  isOpen,
  onClose,
  options,
  value,
  onChange,
  width = '200px',
  position = 'top-left',
  className = '',
}: SelectDropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 绑定 Outside Click 自动离体收起
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 位置偏移处理
  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top-left':
        return { bottom: '100%', left: 0, marginBottom: '8px' };
      case 'top-right':
        return { bottom: '100%', right: 0, marginBottom: '8px' };
      case 'bottom-right':
        return { top: '100%', right: 0, marginTop: '8px' };
      case 'bottom-left':
      default:
        return { top: '100%', left: 0, marginTop: '8px' };
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`popover-animate-enter ${className}`}
      style={{
        position: 'absolute',
        width,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        padding: '4px',
        zIndex: 50,
        userSelect: 'none',
        ...getPositionStyles(),
      }}
    >
      {options.map(option => {
        const isSelected = option.value === value;
        return (
          <div
            key={option.value}
            onClick={() => {
              onChange(option.value);
              onClose();
            }}
            style={{
              padding: '8px 10px',
              fontSize: '12px',
              fontWeight: isSelected ? 600 : 400,
              color: isSelected ? 'var(--primary-color)' : 'var(--text-primary)',
              backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={e => {
              if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={e => {
              if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {option.icon && <Icon name={option.icon as any} size={12} color="currentColor" />}
              <span>{option.label}</span>
            </div>
            {isSelected && <Icon name="check" size={12} color="var(--primary-color)" />}
          </div>
        );
      })}
    </div>
  );
}
