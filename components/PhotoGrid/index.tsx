import { Heading } from "../Heading";
import GridPhoto from "./GridPhoto";
import { People } from "./types";

type Props = {
  people: People;
};

const PhotoGrid = ({ people }: Props) => {
  return (
    <div>
      <Heading label="The People who make it possible" />
      {people.map((person) => (
        <GridPhoto person={person} />
      ))}
    </div>
  );
};

export default PhotoGrid;
