import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField
} from '@mui/material';

function Books() {
  const { data, loading, get } = useAxios('http://localhost:3000');
  const [search, setSearch] = useState("");
  //if there is no books yet it will get books
  useEffect(() => {
    if (data.length === 0) {
      getBooks();

    }
  }, []);

  // TODO: Replace axios with useAxios hook
  function getBooks() {
    get('books')
  }

  // TODO: Implement search functionality
  const searchHandler = (e) => {
    setSearch(e.target.value);
  }
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <form onChange={(e) => searchHandler(e)}>
            <TextField
              name="search"
              id="search"
              label="search"
              variant="outlined"

            />
          </form>

          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {data
              .filter((book) =>
                book.name.toLowerCase().startsWith(search.toLowerCase())
              )

              .map((book) => (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img}
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={book.stars}
                      readOnly
                      size="small"
                    />
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
