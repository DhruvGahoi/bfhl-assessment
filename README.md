# BFHL Assignment

## What it does

- **POST `/bfhl`** accepts `{ "data": [...] }` and returns:
  - `is_success` (boolean)
  - `user_id` as `{full_name_ddmmyyyy}` in lowercase (from env)
  - `email` and `roll_number` (from env)
  - `odd_numbers` (strings)
  - `even_numbers` (strings)
  - `alphabets` (uppercase strings that contain only letters)
  - `special_characters` (anything not purely digits or letters)
  - `sum` (sum of all numeric items, returned as string)
  - `concat_string` (all alphabetical characters from input, reversed with alternating caps starting Upper)


## Run locally

```bash
# 1) Install dependencies
npm install

# 2) Copy .env.example to .env and edit your details
cp .env.example .env

# 3) Start the server
npm run start
# or for live reload
npm run dev
```

The server listens on `http://localhost:3000` by default.

### Example requests

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'
```

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["2","a","y","4","&","-","*","5","92","b"]}'
```