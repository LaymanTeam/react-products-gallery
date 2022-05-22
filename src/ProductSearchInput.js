import React, { useState, useCallback } from 'react';
import { Input, InputAdornment, IconButton, Card, CardContent } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { debounce, omit, isEqual } from 'lodash';

const ProductSearchInput = ({
  keyword,
  autoFocus,
  placeholder,
  debounceDelay,
  onChangeKeyword,
  onClearKeyword,
}) => {
  const [name, setName] = useState(keyword);

  const debounced = useCallback(debounce(onChangeKeyword, debounceDelay), []);

  const onChange = (e) => {
    let value = e.target.value;
    if (!value.trim()) value = '';
    setName(value);
    debounced(value);
  };

  const onClear = () => {
    setName('');
    onChangeKeyword('');
    if (onClearKeyword) onClearKeyword();
  };

  return (
    <Card>
      <CardContent
        sx={{
          padding: '10px',
          '&:last-child': {
            paddingBottom: '10px',
          },
        }}
      >
        <Input
          value={name}
          placeholder={placeholder}
          sx={{ width: '100%' }}
          autoFocus={autoFocus}
          onChange={onChange}
          disableUnderline={true}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            name && (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={onClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(ProductSearchInput, (prevProps, nextProps) => {
  if (isEqual(omit(prevProps, ['onChangeKeyword']), omit(nextProps, ['onChangeKeyword'])))
    return true;
  return false;
});
