import { GameBundle } from "gamba-react-ui-v2";
import React from "react";
import styled, { keyframes } from "styled-components";

const tileAnimation = keyframes`
  0% {
  background-position: -100px 100px;
  }
  100% {
    background-position: 100px -100px;
  }
`;

const StyledGameCard = styled.div<{
  $small: boolean;
  $background: string;
}>`
  width: 100%;

  @media (min-width: 800px) {
    width: 100%;
  }

  aspect-ratio: ${(props) => (props.$small ? "1/.5" : "1/.6")};
  background-size: cover;
  border-radius: 10px;

  color: white;
  text-decoration: none;
  font-size: 24px;

  transition: transform 0.2s ease;
  /* border-bottom: 2px solid #00000033; */

  & > .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-position: center;
    background-image: url(/stuff.png);
    background-repeat: repeat;
    transition: transform 0.2s ease, opacity 0.3s;
    animation: ${tileAnimation} 5s linear infinite;
    opacity: 0;
  }

  & > .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 90% auto;
    background-position: center;
    background-repeat: no-repeat;
    transform: scale(0.9);
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: scale(1.01);
    .image {
      transform: scale(1);
    }

    .background {
      opacity: 0.35;
    }
  }

  position: relative;
  transform: scale(1);
  background: ${(props) => props.$background};
  max-height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  background-size: 100% auto;
  background-position: center;
  font-weight: bold;
  .play {
    font-size: 14px;
    border-radius: 5px;
    padding: 5px 10px;
    background: #00000066;
    position: absolute;
    right: 5px;
    bottom: 5px;
    opacity: 0;
    text-transform: uppercase;

    backdrop-filter: blur(20px);
  }
  &:hover .play {
    opacity: 1;
  }
  &:hover {
    outline: #9564ff33 solid 5px;
    outline-offset: 0px;
  }
`;

export function GameCard({ game }: { game: GameBundle }) {
  return (
    <StyledGameCard $small={false} $background={game.meta?.background}>
      <div className="background" />
      <div
        className="image"
        style={{ backgroundImage: `url(${game.meta.image})` }}
      />
      <div className="play">Play {game.meta.name}</div>
    </StyledGameCard>
  );
}
