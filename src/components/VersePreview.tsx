import styled from 'styled-components'

export const VersePreview = styled.a`
  width: 1366px;
  height: 768px;
  position: fixed;
  bottom: 24px;
  right: 24px;
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.8);
  transition: transform 200ms ease-in-out;
  will-change: scale, translate;
  text-decoration: none;
  transform: scale(0.3) translate(1594px, 896px);

  > div {
    width: 100%;
    height: 100%;
  }

  &:active,
  &:hover,
  &:focus {
    transform: translate(274px, 154px) scale(0.6);
  }
`
