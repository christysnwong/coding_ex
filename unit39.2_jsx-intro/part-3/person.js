const Person = (props) => {
  let msg;
  let name;
  let age = props.age;
  let hobbies = props.hobbies.map((hobby) => <li>{hobby}</li>);

  if (props.age > 18) {
    msg = "please go vote!";
  } else {
    msg = "you must be 18";
  }

  if (props.name.length > 6) {
    name = props.name.slice(0, 6);
  } else {
    name = props.name;
  }

  return (
    <p>
      Learn some information about this person:
      <ul>
        <li>Name: {name}</li>
        <li>Age: {age}</li>
        <li>Hobbies:</li>
        <ul>{hobbies}</ul>
      </ul>
      <h3>{msg}</h3>
    </p>
  );
};
