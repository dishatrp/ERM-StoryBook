import {
  useCreateTemplateMutation,
  useFetchPhasesQuery,
  useFetchTemplateDataQuery,
  useFetchUserSelectedPhasesMutation,
} from "@/store/api/ermNewApiSlice";
import { useCallback, useEffect, useState } from "react";
import PageTitle from "../genericComponents/PageTitle";
import { Collapse, Container, Flex, Paper, ScrollArea, SimpleGrid, createStyles, useMantineTheme } from "@mantine/core";
import {
  FormattedPhase,
  Phase,
  Template,
  TemplateCreationResponse,
  TemplateDataItem,
} from "@/store/interface/ErmNewInterface";
import TemplateTab from "../genericComponents/templateTabs/TemplateTab";
import MantineAccordian from "../genericComponents/MantineAccordian";
import MantineCheckbox from "../inputFields/MantineCheckbox";
import { IconUser } from "@tabler/icons-react";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";

const useStyles = createStyles((theme) => {
  return {
    tabContainer: { borderRadius: theme.other.spacing.s16, minWidth: "16.67vw" },
    accordianContainer: {
      border: `1px dashed ${theme.colors.gray[4]}`,
      borderRadius: theme.other.spacing.s16,
      width: "100%",
    },
    container: {
      backgroundColor: theme.colors.gray["2"],
      padding: theme.other.spacing.s20,
      borderRadius: theme.other.spacing.s16,
    },
  };
});

const extractIds = (org: Phase[]) => {
  const result: string[] = [];

  function flatten(org: Phase[]) {
    org.forEach((item) => {
      result.push(item.ID);
      if (item.children) {
        flatten(item.children);
        // if (item.children) {
        //   delete item.children;
        // }
      }
    });
  }

  flatten(org);
  return result;
};

const addCheckedProperty = (items: any, sampleArr: string[]) => {
  const newArr = items?.map((item: any) => {
    const children = item.children ? addCheckedProperty(item.children, sampleArr) : undefined;

    return {
      ...item,
      checked: sampleArr.includes(item.ID),
      ...(children && { children: children }),
    };
  });
  console.log("nnn", newArr);

  return newArr;
};

const findCheckedEntites = (arr: any) => {
  const phaseIds: TemplateDataItem[] = [];

  const fn = (arr: any) => {
    arr.forEach((item: any) => {
      if (item.checked) {
        phaseIds.push({
          phaseId: item.ID,
        });
        item.children && fn(item.children);
      }
    });

    return phaseIds;
  };
  return fn(arr);
};

const ERMTemplate = () => {
  const { data: TEMPLATE_DATA, isFetching } = useFetchPhasesQuery();
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();
  const [fetchUserSelectedPhases, { isLoading: fetchLoading }] = useFetchUserSelectedPhasesMutation();
  const [fetchedPhaseData, setFetchedPhaseData] = useState<Phase[]>([]);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [formattedTemplateData, setFormattedTemplateData] = useState<FormattedPhase[] | any>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const { data: fetchedTemplatedata, refetch } = useFetchTemplateDataQuery();

  const fetchPhases = useCallback(async () => {
    try {
      if (fetchedTemplatedata) {
        const response = await fetchUserSelectedPhases({
          templateId: +fetchedTemplatedata?.data?.data?.[0]?.ID,
        }).unwrap();
        setFetchedPhaseData(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [fetchUserSelectedPhases, fetchedTemplatedata]);

  const saveHandler = async () => {
    if (isLoading) return;

    const SENT_DATA: Template = {
      templateData: findCheckedEntites(formattedTemplateData),
    };
    if (fetchedTemplatedata?.data?.data?.[0]?.ID) {
      SENT_DATA.templateId = +fetchedTemplatedata?.data?.data?.[0]?.ID;
    }

    console.log("SendData", SENT_DATA, fetchedTemplatedata);
    if (SENT_DATA.templateData.length === 0) {
      toast.error("Please select atleast 3 phases");
      return;
    }

    try {
      const response: TemplateCreationResponse = await createTemplate(SENT_DATA).unwrap();
      console.log("response", response);
      if (response && response?.status) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (fetchedTemplatedata?.data?.data?.[0]?.ID) fetchPhases();
  }, [fetchPhases, fetchedTemplatedata?.data?.data]);

  useEffect(() => {
    setFormattedTemplateData(
      addCheckedProperty(JSON.parse(JSON.stringify(TEMPLATE_DATA || [])), extractIds(fetchedPhaseData))
    );
  }, [TEMPLATE_DATA, fetchPhases, fetchedPhaseData]);

  return (
    <>
      <Loader visible={isFetching || isLoading} />
      <Container fluid>
        <Flex justify={"space-between"} align={"center"}>
          <PageTitle title='Stepper Configuration' description='All templates and setups can be done in this page' />
          <Flex justify={"space-between"} align={"center"} gap={"s12"}>
            <MantineBtn variant='secondary' size='md'>
              Reset
            </MantineBtn>
            <MantineBtn leftIcon={<IconUser />} onClick={saveHandler} isLoading={isLoading} size='md'>
              Save
            </MantineBtn>
          </Flex>
        </Flex>

        <Flex gap={"s20"} w={"100%"} pt={"s20"} pb={"s20"} justify={"center"}>
          <Flex direction={"column"} gap={"s10"} bg={theme.colors.gray[0]} p={"s16"} className={classes.tabContainer}>
            {formattedTemplateData?.map((item: any, idx: number) => {
              return (
                <TemplateTab
                  key={idx}
                  checked={formattedTemplateData[idx].checked}
                  checkboxName={item.NAME}
                  isTabSelcted={selectedTab === idx}
                  tabHandler={(e) => {
                    const target = e.target as HTMLElement;
                    if (target?.classList?.toString()?.toLowerCase()?.includes("checkbox")) return;
                    setValue("");
                    setSelectedTab(idx);
                  }}
                  checkboxHandler={(event) => {
                    setFormattedTemplateData((prev: any) => {
                      let update = JSON.parse(JSON.stringify(prev));
                      update[idx].checked = event.target.checked;
                      return update;
                    });
                  }}
                  tabTitle={item.NAME}
                  tabDescription={"This is a description"}
                />
              );
            })}
          </Flex>

          <Flex
            className={classes.accordianContainer}
            direction={"column"}
            w={"100%"}
            pt={"s20"}
            pb={"s20"}
            pl={"18px"}
            pr={"18px"}
          >
            <ScrollArea h={640} offsetScrollbars scrollbarSize={8} className={classes.container}>
              {formattedTemplateData?.[selectedTab]?.children?.[0]?.TYPE === "TAB" && (
                <Collapse in={formattedTemplateData?.[selectedTab]?.children} animateOpacity h={"100%"}>
                  {formattedTemplateData?.[selectedTab]?.children?.map((item: any, idx: number) => {
                    return (
                      <MantineAccordian onChange={(id: string) => setValue(id)} value={value} key={idx}>
                        <MantineAccordian.Item itemId={String(idx)}>
                          <MantineAccordian.Control>
                            <MantineCheckbox
                              onChange={(e) => {
                                setFormattedTemplateData((prev: any) => {
                                  let update = JSON.parse(JSON.stringify(prev));
                                  update[selectedTab].children[idx].checked = e.target.checked;
                                  update?.[selectedTab]?.children?.[idx]?.children?.forEach((item: any) => {
                                    item.checked = e.target.checked;
                                  });
                                  return update;
                                });
                              }}
                              checked={formattedTemplateData?.[selectedTab]?.children?.[idx]?.checked}
                              label={formattedTemplateData?.[selectedTab]?.children?.[idx]?.NAME}
                              labelFont='bodyB3'
                            />
                          </MantineAccordian.Control>
                          <MantineAccordian.Panel>
                            <>
                              <SimpleGrid cols={2} h={"100%"} mih={215} spacing={"s20"}>
                                {item?.children?.map((item: any, i: number) => {
                                  return (
                                    <MantineCheckbox
                                      key={i}
                                      name={"Checkbox"}
                                      onChange={(e) => {
                                        setFormattedTemplateData((prev: any) => {
                                          let update = JSON.parse(JSON.stringify(prev));
                                          update[selectedTab].children[idx].children[i].checked = e.target.checked;
                                          update[selectedTab].children[idx].checked = update?.[selectedTab]?.children?.[
                                            idx
                                          ]?.children?.some((item: any) => item.checked);
                                          return update;
                                        });
                                      }}
                                      checked={
                                        formattedTemplateData?.[selectedTab]?.children?.[idx]?.children?.[i].checked
                                      }
                                      label={item.NAME}
                                      labelFont='bodyB4'
                                      description={item.PLACE_HOLDER}
                                    />
                                  );
                                })}
                              </SimpleGrid>
                            </>
                          </MantineAccordian.Panel>
                        </MantineAccordian.Item>
                      </MantineAccordian>
                    );
                  })}
                </Collapse>
              )}

              {formattedTemplateData?.[selectedTab]?.children?.[0]?.TYPE === "INPUT" && (
                <Paper
                  sx={(theme) => {
                    return {
                      backgroundColor: theme.colors.gray[0],
                      borderRadius: theme.other.spacing.s16,
                      border: `1px dashed ${theme.colors.gray[4]}`,
                      padding: theme.other.spacing.s20,
                      marginBottom: theme.other.spacing.s20,
                    };
                  }}
                >
                  <SimpleGrid cols={2} h={"100%"} mih={215} spacing={"s20"}>
                    <>
                      {formattedTemplateData?.[selectedTab]?.children?.map((item: any, idx: number) => {
                        return (
                          <MantineCheckbox
                            key={idx}
                            name={"Checkbox"}
                            onChange={(e) => {
                              setFormattedTemplateData((prev: any) => {
                                let update = JSON.parse(JSON.stringify(prev));
                                update[selectedTab].children[idx].checked = e.target.checked;
                                return update;
                              });
                            }}
                            checked={formattedTemplateData?.[selectedTab]?.children?.[idx]?.checked}
                            label={item.NAME}
                            labelFont='bodyB4'
                            description={item.PLACE_HOLDER}
                          />
                        );
                      })}
                    </>
                  </SimpleGrid>
                </Paper>
              )}
            </ScrollArea>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default ERMTemplate;
