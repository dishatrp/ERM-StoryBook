import { Flex, Paper, Textarea, createStyles, rem, useMantineTheme } from "@mantine/core";
import { Text } from "@mantine/core";
import SelectInput from "../../inputFields/SelectInput";
import HeatMap from "../../heatmap/HeatMap";
import { SimpleGrid } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import MantineBtn from "../../genericComponents/mantineBtn/MantineBtn";

const ReportTitle = () => {
  const theme = useMantineTheme();
  return (
    <>
      <Flex direction={"column"} gap={"s2"}>
        <Text className='bodyB1' color={theme.colors.black[7]}>
          Impact Vs Likelihood Heat Map
        </Text>
        <Text className='labelL2' color={theme.colors.black[4]}>
          View the dynamic relationship between Impact and Likelihood, Risk and Impact Details
        </Text>
      </Flex>
    </>
  );
};
const InherentLegends = ({ color }: { color: string }) => {
  const { classes } = createStyles((theme) => {
    return {
      box: {
        backgroundColor: color,
      },
    };
  })();
  const theme = useMantineTheme();
  return (
    <Flex>
      <Flex pl={"s16"} pr={"s16"} justify={"center"} align={"center"}>
        <Paper
          className={classes.box}
          sx={(theme) => {
            return {
              borderRadius: theme.other.spacing.s10,
            };
          }}
          h={rem(45)}
          w={rem(45)}
        ></Paper>
      </Flex>
      <Paper p={"s10"} bg={"none"}>
        <Text>1. Financial Impact : SAR 1M </Text>
        <Text>2. Operational Impact : 50-70% Impact</Text>
        <Text>3. Strategic Growth : No or Negative Growth</Text>
        <Text>4. Reputation Impact : Adverse global media, potential long-term brand erosion</Text>
        <Text>5. Staff : 50% Staff affected .</Text>
      </Paper>
    </Flex>
  );
};

const Report = () => {
  const theme = useMantineTheme();
  const { classes } = createStyles((theme) => {
    return {
      review_container: {
        borderRadius: theme.other.spacing.s16,
        border: `1px solid ${theme.colors.gray[4]}`,
        backgroundColor: theme.colors.gray[1],
      },
      heatMap_section: {
        borderRadius: theme.other.spacing.s16,
        border: `1px dashed ${theme.colors.gray[4]}`,
        backgroundColor: theme.colors.gray[0],
      },
      inherent_container: {
        padding: `${theme.other.spacing.s8} ${theme.other.spacing.s16}`,
        borderRadius: theme.other.spacing.s12,
        border: `1px solid ${theme.colors.gray[4]}`,
      },
      inherent_legends: {
        padding: theme.other.spacing.s10,
      },
    };
  })();

  return (
    <>
      <Flex p={"s8"} direction={"column"} gap={"s8"} className={classes.review_container}>
        <Flex direction={"column"} gap={"s20"} p={"s20"} className={classes.heatMap_section}>
          <ReportTitle />
          <Flex gap={"s16"} justify={"space-between"} align={"center"}>
            <Flex gap={"s20"} w={"100%"}>
              <Paper bg={"none"} w={"100%"}>
                <SelectInput
                  controller={false}
                  name='Risk Category'
                  label='Risk Category'
                  tooltip='Select risk category'
                  data={["Test1", "Test2", "Test3"]}
                  placeholder='Select an input field'
                />
              </Paper>
              <Paper bg={"none"} w={"100%"}>
                <SelectInput
                  controller={false}
                  name='Select Process'
                  label='Select Process'
                  tooltip='Select process'
                  data={["Test1", "Test2", "Test3"]}
                  placeholder='Select an input field'
                />
              </Paper>
            </Flex>
            <MantineBtn>Calculate</MantineBtn>
          </Flex>
          <Flex className={classes.inherent_container} justify={"space-between"} align={"center"}>
            <HeatMap title='Inherent Heat Map' desc='Heat Map before control' />
            <SimpleGrid cols={2} h={"100%"} mih={215} pt={"s32"}>
              <InherentLegends color={theme.colors.red[9]} />
              <InherentLegends color={theme.colors.red[7]} />
              <InherentLegends color={theme.colors.sun[9]} />
              <InherentLegends color={theme.colors.spring[8]} />
            </SimpleGrid>
          </Flex>
          <Flex className={classes.inherent_container} justify={"space-between"} align={"center"}>
            <HeatMap title='Residual Heat Map' desc='Heat Map after control' />
            <SimpleGrid cols={2} h={"100%"} mih={215} pt={"s32"}>
              <InherentLegends color={theme.colors.red[9]} />
              <InherentLegends color={theme.colors.red[7]} />
              <InherentLegends color={theme.colors.sun[9]} />
              <InherentLegends color={theme.colors.spring[8]} />
            </SimpleGrid>
          </Flex>
          <Flex direction={"column"} gap={"s8"} pr={"s20"} pl={"s20"} pt={0} pb={0}>
            <Flex direction={"column"} gap={"s2"} pt={"s32"} pr={"s8"} pl={"s20"} pb={"s16"}>
              <Text className='bodyB1' color={theme.colors.black[7]}>
                Impact Vs Likelihood Heat Map
              </Text>
              <Text className='labelL2' color={theme.colors.black[4]}>
                View the dynamic relationship between Impact and Likelihood, Risk and Impact Details
              </Text>
            </Flex>
            <Flex justify={"flex-end"} align={"center"}>
              <MantineBtn leftIcon={<IconEye />}>View Reporting Details</MantineBtn>
            </Flex>
            <SimpleGrid cols={2} h={"100%"} mih={215} pt={"s32"}>
              <Textarea placeholder='placeholder' label='Draft Report' />
              <Textarea placeholder='placeholder' label='Recommendations' />
              <Textarea placeholder='placeholder' label='Management Response' />
              <Textarea placeholder='placeholder' label='Reviewer Notes' />
              <Textarea placeholder='placeholder' label='Root Cause' />
              <Textarea placeholder='placeholder' label='Impact In Reporting' />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Report;
