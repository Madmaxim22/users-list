import type { User } from "../api/users";
import { useUserDetails } from "../hooks/useUserDetails";

interface DetailsProps {
  info: User | null;
}

export default function Details({ info }: DetailsProps) {
  if (!info) {
    return <div className="details-empty">No user selected</div>;
  } 

  const { userDetails, isLoading, error } = useUserDetails(info.id);

  if (isLoading) {
    return <div className="details-empty">Loading...</div>;
  }
  if (error) {
    return <div className="details-empty">Error: {error}</div>;
  }

  return (
    <div className="details-card">
      <div className="details-content">
        <img className="details-avatar" src={userDetails?.avatar} alt={userDetails?.name} />
        <h3>{userDetails?.name}</h3>
        <p>{userDetails?.details.city}</p>
        <p>{userDetails?.details.company}</p>
        <p>{userDetails?.details.position}</p>
      </div>
    </div>
  );
}