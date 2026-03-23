import type { User } from "../api/users";
import { useUserDetails } from "../hooks/useUserDetails";

/**
 * Пропсы компонента карточки пользователя.
 */
interface DetailsProps {
  /** Выбранный пользователь из списка или `null`, если выбор не сделан. */
  info: User | null;
}

/**
 * Рендерит детали выбранного пользователя.
 *
 * @param props Пропсы компонента.
 * @returns JSX-элемент блока деталей пользователя.
 */
export default function Details({ info }: DetailsProps) {
  const { userDetails, isLoading, error, refetch } = useUserDetails(info?.id ?? null);

  if (!info) {
    return <div className="details-empty">No user selected</div>;
  }

  if (isLoading) {
    return (
      <div className="details-empty details-loading">
        <div className="spinner" aria-label="Loading user details" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error">
        <p>{error}</p>
        <button type="button" onClick={refetch}>Retry</button>
      </div>
    );
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