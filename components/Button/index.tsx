import React, { PropsWithChildren } from 'react';
import { useThemeContext } from '../ThemeProvider';
import clsx from 'clsx'
import styles from './styles.module.css'
interface ButtonProps {
  type?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  onClick?: () => void;
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
    default:
      return <SolidButton {...props} />
  }
};

export const SolidButton: React.FunctionComponent<ButtonProps> = ({
  size = 'medium',
  label,
  type: buttonType,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { colors } = useThemeContext()
  return (
    <button
      type="button"
      className={clsx('px-4 py-1 text-white')}
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
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { colors } = useThemeContext()
  return (
    <button
      type="button"
      className={clsx('px-4 py-1')}
      style={{ borderColor: colors.primary, borderWidth: 2, color: colors.text.dark }
      }
      {...props}
    >
      {children || label}
    </button>
  );
};
