import React from 'react';
import * as CmpLabel from '@radix-ui/react-label';
import { styled } from '@stitches/react';
import useOutsideClick from '../../hooks/useOutSideClick';
import { Flex } from '../components';

export interface ITextFieldItem {
  id: number,
  value: string
}

interface IAutocompleteInput{
  label: string,
  placeholder: string,
  value: ITextFieldItem,
  filterValue: string,
  disabled?: boolean,
  exactMatch?: boolean,
  timeout?: number,
  getDataSource: (val: string) => ITextFieldItem[],
  onValueChange: (val: ITextFieldItem) => void,
  onFilterValueChange: (val: string) => void,
}

const AutocompleteInput = ({
  label, placeholder, disabled, timeout, getDataSource, filterValue, value, exactMatch, onValueChange, onFilterValueChange,
}: IAutocompleteInput): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentInputValue, setCurrentInputValue] = React.useState<string>('');
  const containerRef = useOutsideClick<HTMLUListElement>(open, () => setOpen(!open));
  const dataSource = getDataSource(filterValue);
  const isOpen = open && dataSource[0]?.value?.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const item = e.currentTarget.value;

    onFilterValueChange(item);

    if (item.trim().length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    setCurrentInputValue(filterValue);
  }, [filterValue]);

  React.useEffect(() => {
    if (value?.value?.length) {
      setCurrentInputValue(value.value);
    }
  }, [value.value]);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (exactMatch) {
      if (filterValue?.length > 0) {
        if (!dataSource?.length) {
          intervalId = setInterval(() => {
            setCurrentInputValue('');
          }, timeout);
        }
      }
    }

    return () => clearInterval(intervalId);
  }, [dataSource?.length, exactMatch, filterValue, timeout, filterValue?.length]);

  return (
    <Flex variants="column">
      <Flex variants="row" content="space-between">
        <Label htmlFor="auto-input">
          {label}
        </Label>
        <div>
          {`Found items: ${isOpen ? dataSource?.length : ''}`}
        </div>
      </Flex>
      <Flex css={{ position: 'relative' }}>
        <ClearBox
          onClick={() => setCurrentInputValue('')}
        >
          <Image src="/image/delete.png" />
        </ClearBox>
        <Input
          type="text"
          id="auto-input"
          aria-label="text-input"
          data-testid="input"
          required
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          value={currentInputValue}
          autoComplete="off"
        />
      </Flex>
      {
        isOpen
          ? (
            <TextField data-testid="text-field" ref={containerRef}>
              {dataSource?.map((item) => (
                <TextFieldItem
                  data-testid="text-field-item"
                  key={item.value}
                  onClick={() => {
                    onValueChange(item);
                    setOpen(!open);
                  }}
                >
                  {item.value}
                </TextFieldItem>
              ))}
            </TextField>
          )
          : null
          }
    </Flex>
  );
};

export default AutocompleteInput;

const Label = styled(CmpLabel.Root, {
  fontSize: 20,
  fontWeight: 500,
});

const Input = styled('input', {
  width: '100%',
  height: '50px',
  fontSize: '16px',
  padding: '12px 10px',
  margin: '8px 0',
  boxSizing: 'border-box',

  '&:disabled': {
    cursor: 'not-allowed',
  },
});

const TextField = styled('ul', {
  border: '1px solid black',
  borderRadius: '5px',
  minHeight: '40px',
  maxHeight: '180px',
  overflow: 'auto',
  marginTop: '0px',
  padding: '10px 5px',
});

const TextFieldItem = styled('li', {
  paddingTop: '8px',
  fontSize: '16px',
  listStyleType: 'none',
  height: '30px',
  borderRadius: '5px',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const ClearBox = styled('div', {
  position: 'absolute',
  height: '30px',
  width: '30px',
  right: '15px',
  top: '20px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
  },
});

const Image = styled('img', {
  width: '25px',
  height: '25px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
