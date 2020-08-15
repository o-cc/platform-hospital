import React from 'react';
import { vw } from 'utils';
import styled, { keyframes } from 'styled-components';
const loadingAni = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingP = styled.div`
  display: block;
  position: absolute;
  width: ${vw(120)};
  height: ${vw(120)};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  margin: auto;
  pointer-events: none;
  opacity: 0.8;
  outline: none;
  > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 5px solid #fff;
    border-radius: 50%;
    animation: ${loadingAni} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #f90 transparent transparent transparent;
  }
  > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  > div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default () => {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <LoadingP>
        <div />
        <div />
        <div />
      </LoadingP>
    </Modal>
  );
};
