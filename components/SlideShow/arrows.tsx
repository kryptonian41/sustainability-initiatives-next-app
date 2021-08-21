import Arrow from 'assets/svgs/scroll-action-arrow.svg'

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <Arrow />
    </div>
  );
}

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <Arrow />
    </div>
  );
}