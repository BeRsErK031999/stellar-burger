import { FC, ChangeEvent } from 'react';
import { Input as OriginalInput } from '@zlden/react-developer-burger-ui-components';
import { TICons } from '@zlden/react-developer-burger-ui-components/dist/ui/icons';

interface CustomInputProps {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  error: boolean;
  errorText: string;
  size: 'default' | 'small';
  icon?: keyof TICons;
  onPointerEnterCapture?: () => void;
  onPointerLeaveCapture?: () => void;
}

export const CustomInput: FC<CustomInputProps> = (props) => (
  <OriginalInput
    {...props}
    onPointerEnterCapture={props.onPointerEnterCapture || (() => {})}
    onPointerLeaveCapture={props.onPointerLeaveCapture || (() => {})}
  />
);
