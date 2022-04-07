const Snake = ({points}) => {

  return (
    <div> 
        {
          points.map((point, i) => {
            const style = {
              left: `${point[0]}%`,
              top: `${point[1]}%`,
            }

            return (<div className="snake-point" style={style} key={i}></div>);
          })
        }
    </div>
  );

};

export default Snake;