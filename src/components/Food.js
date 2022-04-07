const Food =  ({ point }) => {

  const style = {
    top: `${point[0]}%`,
    left: `${point[1]}%`
  }

  return (
    <div className="snake-food" style={style}></div>
  );

};

export default Food;