export const Toast = () => {
  return (
    <div className="toast">
      <div className="toast__icon">
        <span>icon</span>
      </div>
      <div className="toast__content">
        <p className="toast__message">Message</p>
      </div>
      <div className="toast__close">
        <span>close</span>
      </div>
    </div>
  );
};
