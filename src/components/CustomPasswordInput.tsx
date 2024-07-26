import { FC, ChangeEvent } from 'react';
import { PasswordInput as OriginalPasswordInput } from '@zlden/react-developer-burger-ui-components';

interface CustomPasswordInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  size?: 'default' | 'small';
  icon?: 'EditIcon' | 'ShowIcon' | 'HideIcon';
}

export const CustomPasswordInput: FC<CustomPasswordInputProps> = (props) => (
  <OriginalPasswordInput {...props} />
);
