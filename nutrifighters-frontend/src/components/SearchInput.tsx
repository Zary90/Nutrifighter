import React, { ChangeEventHandler } from 'react';

interface SearchInputProps {
 value: string;
 onChange: ChangeEventHandler<HTMLInputElement>;
 placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
 return (
   <input
      type="text"
       placeholder={placeholder}
       value={value}
       onChange={onChange}
      className="border border-gray-300 rounded-md p-2 w-full"
     />
   );
};

export default SearchInput;
