import React, { ReactNode, FormEventHandler, FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = ({ children, className, onSubmit, ...props }) => {
  return (
    <form className={className} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

export default Form;