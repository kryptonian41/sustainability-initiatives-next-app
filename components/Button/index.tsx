import React, { PropsWithChildren } from 'react';
import { useThemeContext } from '../ThemeProvider';
import clsx from 'clsx'
import styles from './styles.module.css'
interface ButtonProps {
  type?: 'primary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  onClick?: () => void;
  [key: string]: any
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  type: buttonType,
  ...props
}: ButtonProps) => {
  switch (buttonType) {
    case 'primary':
      return <SolidButton {...props} />
    case 'outline':
      return <OutlineButton {...props} />
    case 'text':
      return <TextButton {...props} />
    default:
      return <SolidButton {...props} />
  }
};

export const SolidButton: React.FunctionComponent<ButtonProps> = ({
  size = 'medium',
  label,
  type: buttonType,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { colors } = useThemeContext()
  return (
    <button
      type="button"
      className={clsx('px-4 py-1 text-white', className)}
      style={{ backgroundColor: colors.primary }
      }
      {...props}
    >
      {children || label}
    </button>
  );
};


export const OutlineButton: React.FunctionComponent<ButtonProps> = ({
  size = 'medium',
  label,
  type: buttonType,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type="button"
      className={clsx('px-4 py-1', styles['outline-button'], className)}
      {...props}
    >
      {children || label}
    </button>
  );
};

export const TextButton: React.FunctionComponent<ButtonProps> = ({
  size = 'medium',
  label,
  type: buttonType,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { colors } = useThemeContext()
  return (
    <button
      type="button"
      className={clsx('px-4 py-1', className)}
      style={{ color: colors.text.dark }
      }
      {...props}
    >
      {children || label}
    </button>
  );
};
