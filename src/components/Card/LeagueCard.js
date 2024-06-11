import styled from "styled-components";
import Link from "next/link";

export default function Card({ league }) {
  return (
    <>
      <h2>{league.leagueName}</h2>
    </>
  );
}
