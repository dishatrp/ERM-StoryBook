import { Text, createStyles } from "@mantine/core";

const RiskCountText = ({
  title,
  paragraph,
  color,
}: {
  title: string;
  paragraph: string;
  color?: string | undefined;
}) => {
  const { classes } = createStyles((theme) => {
    return {
      cardTitle: {
        ...theme.other.typographyScales.bodyB1,
        color: color ? color : theme.colors.black[7],
      },
      cardDescription2: {
        ...theme.other.typographyScales.bodyB4,
        color: theme.colors.black[4],
      },
    };
  })();

  return (
    <div>
      <Text className={classes.cardTitle}>{title}</Text>
      <Text className={classes.cardDescription2}>{paragraph}</Text>
    </div>
  );
};

export default RiskCountText;
