import { useState } from 'react';

import SearchInput from '../components/Search';
import UserList from '../components/UserList';

import { QUERY_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Home = () => {
  const { loading: userLoading, data } = useQuery(QUERY_USERS);

  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      const data = await response.json();
      setResult(data);
      console.log(`API response:`, data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {(userLoading || searchLoading) ? (
            <div>Loading...</div>
          ) : (
          <div>
            <SearchInput value={query} onChange={setQuery} handleSearch={handleSearch} />

            {result && (
              <div>
                <h3>Recipes:</h3>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}

            <UserList
              users={users}
              recipe="Here are current recipes from munchies' users..." 
            />
          </div>
          )}
        </div>
      </div>    
    </main>
  );
};

export default Home;
