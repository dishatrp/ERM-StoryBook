import { Space, Text, createStyles, useMantineTheme } from "@mantine/core";
import React from "react";

interface propTypes {
  title: React.ReactNode;
  description?: string;
}

const PageTitle = ({ title, description }: propTypes) => {
  const useStyles = createStyles((theme) => ({
    headingColors: {
      color: theme.colors.black[8],
    },
    dimmedColors: {
      color: theme.colors.gray[6],
    },
  }));

  const { classes } = useStyles();
 

  return (
    <div>
      <Text className={`${classes.headingColors} headingH1`} 
      >
        {title}
      </Text>
      <Space h={"s6"} />
      <Text className={`labelL2 ${classes.dimmedColors}`}>{description}</Text>
    </div>
  );
};

export default PageTitle;
