import RotatingText from "./RotatingText";

export const AppLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold text-lg sm:text-xl md:text-2xl">Talent</span>
      <RotatingText
        texts={["Hub", "Hire", "Grow", "Shine"]}
        mainClassName="px-1.5 sm:px-2 bg-primary overflow-hidden py-0.5 rounded-md"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5"
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        rotationInterval={1800}
      />
    </div>
  );
};
