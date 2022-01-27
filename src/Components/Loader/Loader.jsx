import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
  size: 100px;

  border-color: #6556bd;
`;
export const Loader = () => {
  return <ClipLoader css={override} />;
};
