import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface ISearch {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = (props: ISearch) => {
  const { query, setQuery } = props;
  const handleClear = () => {
    setQuery('');
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Поиск по имени (firstName)"
        size="medium"
      />
      {!!query.length && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={handleClear}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Paper>
  );
};
