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
  onPointerEnterCapture?: (e: React.PointerEvent<HTMLInputElement>) => void;
  onPointerLeaveCapture?: (e: React.PointerEvent<HTMLInputElement>) => void;
}

export const CustomInput: FC<CustomInputProps> = (props) => {
  const { onPointerEnterCapture, onPointerLeaveCapture, ...restProps } = props;
  const extraProps: any = {};

  if (onPointerEnterCapture)
    extraProps.onPointerEnterCapture = onPointerEnterCapture;
  if (onPointerLeaveCapture)
    extraProps.onPointerLeaveCapture = onPointerLeaveCapture;

  return <OriginalInput {...restProps} {...extraProps} />;
};
