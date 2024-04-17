import { TopBar } from "../components/home";
import { useAuth } from "../hooks/useAuth";
import { ProfileCard } from "../components/home";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <div className="min-h-screen">
        <TopBar />
        <div className="max-w-4xl mx-auto mt-8">
          <div className="p-8 rounded-lg shadow-md bg-primary">
            <h2 className="text-3xl font-bold mb-4">Your Profile</h2>

            {user ? (
              <ProfileCard user={user} />
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
