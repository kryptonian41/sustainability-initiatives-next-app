import React from "react";
import { getStakeHolderBySlug } from "utils/api/client-side-api";
import { StakeHolder } from "utils/types";
import styles from "./style.module.css";
import Image from "next/image";
import { Heading } from "components/Heading";
import { Container } from "components/Container";

interface Props {
  stakeHolder: StakeHolder[];
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const stakeHolder = await getStakeHolderBySlug(id);
  return {
    props: {
      stakeHolder,
    },
  };
};

const People: React.FC<Props> = ({ stakeHolder }) => {
  if (stakeHolder.length === 0) {
    // return not found component
    return <div />;
  }
  const { name, education, about, photo, socialLinks } = stakeHolder[0];
  console.log(socialLinks);
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.edu}>{education}</p>
          <p className={styles.about}>{about}</p>
        </div>
        <img
          className={styles.picture}
          src={photo.url}
          alt={photo.alternativeText}
          title={photo.name}
        />
      </div>
    </Container>
  );
};

export default People;
