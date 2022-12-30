import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((p) => (
        <Part key={p.name} coursePart={p} />
      ))}
    </>
  );
};

export default Content;
