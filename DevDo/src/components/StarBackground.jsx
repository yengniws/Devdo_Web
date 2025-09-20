const Star = ({ size, delay, top, left, animationType, colorClass }) => (
   <div
      className={`absolute rounded-full ${size} ${animationType} ${colorClass}`}
      style={{
         top: `${top}%`,
         left: `${left}%`,
         animationDelay: `${delay}s`,
      }}></div>
);

const createStars = (count, minSize, maxSize, animationType, colorClasses) => {
   const stars = [];
   for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const sizeClass =
         size < 2
            ? 'w-[1px] h-[1px]'
            : size < 3
              ? 'w-[1.5px] h-[1.5px]'
              : 'w-[2px] h-[2px]';
      const isColored = Math.random() < 0.1;
      const colorClass = isColored
         ? colorClasses[Math.floor(Math.random() * colorClasses.length)]
         : 'bg-white';

      stars.push(
         <Star
            key={i}
            size={sizeClass}
            delay={delay}
            top={top}
            left={left}
            animationType={animationType}
            colorClass={colorClass}
         />,
      );
   }
   return stars;
};

const StarBackground = () => {
   return (
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-navy">
         {createStars(200, 1, 3, 'animate-twinkle-star', [
            'bg-neon-green',
            'bg-orange-star',
         ])}
         {createStars(5, 2, 4, 'animate-shooting-star', ['bg-white'])}
      </div>
   );
};

export default StarBackground;
