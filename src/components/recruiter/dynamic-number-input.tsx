import React from 'react';
import { Unstable_NumberInput as BaseNumberInput, NumberInputProps } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const DynamicNumberInput = React.forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <AddIcon fontSize="medium" />,
                    className: 'increment',
                    type: 'button'
                },
                decrementButton: {
                    children: <RemoveIcon fontSize="medium" />,
                    type: 'button'
                },
            }}
            {...props}
            ref={ref}
        />
    );
});

const blue = {
    100: '#daecff',
    200: '#b6daff',
    300: '#66b2ff',
    400: '#3399ff',
    500: '#007fff',
    600: '#0072e5',
    700: '#0059B2',
    800: '#004c99',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#444' : '#ccc'};
  border-radius: 8px;
`);

const StyledInput = styled('input')(({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
};
  border-radius: 0px;
  margin: 0 0px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 75%;
  height:48px;
  text-align: center;
  border-left: 1px solid ${theme.palette.mode === 'dark' ? '#444' : '#ccc'} !important;
  border-right: 1px solid ${theme.palette.mode === 'dark' ? '#444' : '#ccc'} !important;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`);

const StyledButton = styled('button')(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 0px solid;
  border-radius: 8px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 48px;
  height: 48px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`);

export default DynamicNumberInput;
