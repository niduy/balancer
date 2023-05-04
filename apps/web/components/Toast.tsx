import { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const fadeOut = keyframes`
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, 100%);
  }
`;

const ToastContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.primaryReverse};
  padding: 16px;
  border-radius: 8px;
  max-width: 80%;
  text-align: center;
  z-index: 1000;
  animation: ${({ isVisible }) =>
    isVisible
      ? css`
          ${fadeIn} 0.3s ease-in-out
        `
      : css`
          ${fadeOut} 0.3s ease-in-out
        `};
`;

type ToastProps = {
  message: string;
  isVisible: boolean;
};

// Can be refactored into a nested toast by extracting logic into a global state
// and rendering messages as long as they are within the state
const Toast = ({ message, isVisible }: ToastProps) => {
  const [isMounted, setMounted] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      return;
    }

    const timer = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isMounted) {
    return null;
  }

  return (
    <ToastContainer
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      tabIndex={0}
      isVisible={isVisible}
    >
      {message}
    </ToastContainer>
  );
};

export default Toast;
