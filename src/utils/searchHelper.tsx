import React, { useState, useEffect } from 'react';

function runSearchable(pool: any, keyword: string, searchableMap: any) {
  const isMatchArr: boolean[] = [];
  keyword = keyword.toString();
  searchableMap.forEach((searchKey: string) => {
    const target = pool[searchKey];
    if (!target) {
      isMatchArr.push(false);
      return;
    }
    if (Array.isArray(target)) {
      isMatchArr.push(target.map(t => t.toUpperCase().includes(keyword.toUpperCase())).includes(true));
    } else {
      isMatchArr.push(target.toUpperCase().includes(keyword.toUpperCase()));
    }
  });
  return isMatchArr.includes(true);
}

export function useSearch<T>(searchableMap: string[], List: T[]): [T[], React.Dispatch<React.SetStateAction<string>>] {
  const [list, setList] = useState({ original: List, filtered: List });
  const [searchWords, setSearchWords] = useState<string>('');

  useEffect(() => {
    setList(prev => ({ ...prev, original: List }));
  }, [List]);

  useEffect(() => {
    const filteredList =
      (list.original &&
        searchWords !== '' &&
        list.original.filter(a => runSearchable(a, searchWords, searchableMap))) ||
      list.original;
    setList(prev => ({ ...prev, filtered: filteredList }));
  }, [searchWords, list.original]);

  return [list.filtered, setSearchWords];
}
