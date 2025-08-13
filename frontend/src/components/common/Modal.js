import React from 'react';

const Modal = ({ show, onClose, title, children, isAuth, closing, clickPosition }) => {
    const modalStyle = clickPosition ? { transformOrigin: `${clickPosition.x}px ${clickPosition.y}px` } : {};
    if (!show && !closing) return null;

    return (
        <div className={`modal-backdrop ${closing ? 'closing' : ''}`} onClick={onClose}>
            <div 
                style={modalStyle}
                className={`modal-content ${isAuth ? 'auth-modal' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h3 className="modal-title">{title}</h3>}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;