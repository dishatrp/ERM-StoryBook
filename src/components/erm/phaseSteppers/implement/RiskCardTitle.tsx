import { Text, createStyles } from "@mantine/core";

const RiskCardTitle = ({ title, paragraph }: { title: string; paragraph: string }) => {
  const { classes } = createStyles((theme) => {
    return {
      cardTitle: {
        ...theme.other.typographyScales.bodyB1,
        color: theme.colors.black[7],
      },
      cardDescription: {
        ...theme.other.typographyScales.labelL1,
        color: theme.colors.black[4],
      },
    };
  })();

  return (
    <div>
      <Text className={classes.cardTitle}>{title}</Text>
      <Text className={classes.cardDescription}>{paragraph}</Text>
    </div>
  );
};
export default RiskCardTitle;
