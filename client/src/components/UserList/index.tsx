import { Link } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  ingredients: string[]; 
  recipes: string[];
}

interface UserListProps {
  users: User[];
  recipe: string;
}

const UserList: React.FC<UserListProps> = ({ users, recipe }) => {
  if (!users.length) {
    return <h3>No Recipes Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{recipe}</h3>
      <div className="flex-row justify-space-between my-4">
        {users &&
          users.map((user) => (
            <div key={user._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {user.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has {user.ingredients ? user.ingredients.length : 0}{' '}
                    ingredients added
                    {user.ingredients && user.ingredients.length === 1 ? '' : 's'}
                  </span>
                </h4>
                <div className="card-body bg-light p-2">
                  {/* You can add additional profile details here if needed */}
                </div>
                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/users/${user._id}`}
                >
                  View and add their ingredients.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
