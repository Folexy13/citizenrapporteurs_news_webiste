import React from "react";
import "./Styles.scss";

const Modal = ({ children, isOpen, close, title, type }) => {
  //   const [isOpen, setIsOpen] = useState(false);

  // const handleClose = () => {
  //   // setIsOpen(false);
  // };
  if (type === "about") {
    return (
      <>
        {isOpen && (
          <div className="modal aboutty">
            <div className="modal-header">
              <h3>{title}</h3>
              <button onClick={close}>X</button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-header">
            <h3>{title}</h3>
            <button onClick={close}>X</button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
