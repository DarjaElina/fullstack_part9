import { CoursePart } from "../types";

const renderCommon = (part: { name: string; exerciseCount: number }) => (
  <>
    <h3>{part.name} {part.exerciseCount}</h3>
  </>
);


const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          {renderCommon(part)}
          <p style={ { fontStyle: 'italic' } }>{part.description}</p>
        </div>
      )
    case 'group':
      return (
        <div>
          {renderCommon(part)}
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          {renderCommon(part)}
          <p style={ { fontStyle: 'italic' } }>{part.description}</p>
          <p>background material: {part.backgroundMaterial}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          {renderCommon(part)}
          <p style={ { fontStyle: 'italic' } }>{part.description}</p>
          required skills: {part.requirements.map((r, i) => i === part.requirements.length - 1 ? r : `${r}, `)}
        </div>
      )
    default:
      assertNever(part)
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;