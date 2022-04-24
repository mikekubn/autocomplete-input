import React from 'react';
import * as CmpLabel from '@radix-ui/react-label';
import { styled } from '@stitches/react';
import useOutsideClick from '../../hooks/useOutSideClick';
import { Flex } from '../components';

export interface ITextFieldItem {
  id: number,
  value: string
}

export const defaultValue: ITextFieldItem = { id: 0, value: '' };

interface IAutocompleteInput{
  label: string,
  placeholder: string,
  disabled?: boolean,
  exactMatch?: boolean,
  timeout?: number,
  value: ITextFieldItem,
  getDataSource: () => ITextFieldItem[],
  filterValue: (val: ITextFieldItem) => void,
  onChange: (val: { event: React.ChangeEvent<HTMLInputElement>, value: ITextFieldItem['id'] }) => void,
  onFilterValueChange: (val: { event: React.FormEvent<HTMLLIElement>, value: ITextFieldItem }) => void,
}

const AutocompleteInput = ({
  label, placeholder, disabled, timeout, getDataSource, value, filterValue, exactMatch, onChange, onFilterValueChange,
}: IAutocompleteInput): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [event, setEvent] = React.useState<React.ChangeEvent<HTMLInputElement>>();
  const containerRef = useOutsideClick<HTMLUListElement>(open, () => setOpen(!open));
  const dataSource = getDataSource();
  const isOpen = open && dataSource[0]?.value?.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEvent(e);

    const item = e.currentTarget.value;

    if (item.trim().length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    // @ts-ignore
    filterValue((val) => ({ ...val, value: item }));
  };

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (exactMatch) {
      if (value?.value?.length > 0) {
        if (!dataSource.length) {
          intervalId = setInterval(() => {
            filterValue(defaultValue);
          }, timeout);
        }
      }
    }

    return () => clearInterval(intervalId);
  }, [dataSource.length, exactMatch, filterValue, timeout, value?.value?.length]);

  React.useEffect(() => {
    if (event) {
      onChange({ event, value: value.id });
    }
  }, [event, onChange, value.id]);

  return (
    <Flex variants="column">
      <Flex variants="row" content="space-between">
        <Label htmlFor="auto-input">
          {label}
        </Label>
        <div>
          {`Found items: ${dataSource.length}`}
        </div>
      </Flex>
      <Flex css={{ position: 'relative' }}>
        <ClearBox
          onClick={() => filterValue(defaultValue)}
        >
          <Image src="/image/delete.png" />
        </ClearBox>
        <Input
          type="text"
          id="auto-input"
          data-testid="input"
          required
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          value={value.value || ''}
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
                  onClick={(e) => {
                    onFilterValueChange({ event: e, value: item });
                    filterValue(item);
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
