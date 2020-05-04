import React, { useState, useCallback, useEffect } from 'react';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Subject } from 'rxjs';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';

interface IDebInputProps {
  inputFn: (searchString: string, dbValue: number) => void;
  debounce?: number;
}

const DebInput = ({ inputFn, debounce = 500 }: IDebInputProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [subject] = useState(new Subject());

  console.log({ debounce });

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      subject.next(event.target.value);
    },
    [subject]
  );

  const handleExecuteSearch = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(event);
    inputFn(searchInput, debounce);
  };

  useEffect(() => {
    const searchSub = subject
      .pipe(
        tap((str: any) => setSearchInput(str)),
        debounceTime(debounce),
        distinctUntilChanged()
      )
      .subscribe(inputStr => {
        inputFn(inputStr as string, debounce as number);
      });
    return () => {
      searchSub.unsubscribe();
    };
  }, [inputFn, debounce, subject]);

  return (
    <div>
      <Input
        type="text"
        value={searchInput}
        placeholder="Search on Vessel Names"
        onChange={handleOnChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleExecuteSearch}>
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
};

export { IDebInputProps, DebInput };
