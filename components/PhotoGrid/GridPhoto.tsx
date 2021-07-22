import { Person } from "./types";

type Props = {
  person: Person;
};

const GridPhoto = ({ person }: Props) => {
  const { imgSrc, name, position } = person;
  return (
    <div>
      <img src={imgSrc} alt={name} />
      <p>{name}</p>
      <p>{position}</p>
    </div>
  );
};

export default GridPhoto;
