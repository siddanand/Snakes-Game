export default function Snake(props) {
  return (
    <div>
      {props.value.snakePart.map((part, i) => {
        const style = {
          left: `${part[0]}%`,
          top: `${part[1]}%`,
        };
        return <div className="snake" key={i} style={style} />;
      })}
    </div>
  );
}
