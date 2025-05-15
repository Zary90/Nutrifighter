import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, id, className, ...props }) => {
  return (
    <input
      type={type}
      id={id}
      className={className}
      {...props}
    />
  );
};

export default Input;