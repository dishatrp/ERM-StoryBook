import { Flex, Group, Paper, Stepper, Transition, createStyles } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import AuditMasterData from "./auditMasterData/AuditMasterData";
import { useFetchTemplateDataQuery, useFetchUserSelectedPhasesMutation } from "@/store/api/ermNewApiSlice";
import { Phase } from "@/store/interface/ErmNewInterface";
import Planning from "./planning/Planning";
import ResourceManagement from "./resourceManagement/ResourceManagement";
import Preparation from "./preparation/Preparation";
import Reporting from "./reporting/Reporting";
import Execution from "./execution/Execution";
import FollowUp from "./followUp/FollowUp";
import PageTitle from "../genericComponents/PageTitle";
import Loader from "@/components/Loader";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { readFileAsDataURL } from "@/utils/RegisterNewClient/helper";
import { useSaveStepperdataMutation } from "@/store/api/ermPhases";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/store";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";

export const sortedPhases = [
  "Master Data",
  "Planning",
  "Resource Management",
  "Preparation",
  "Execution",
  "Reporting",
  "Follow Up",
];

const RenderPhaseChild = ({ item }: { item: Phase }) => {
  const idx = sortedPhases.indexOf(item.NAME);
  const data = item?.children || [];

  const arr = [
    <AuditMasterData data={data} key={idx} />,
    <Planning data={data} key={idx} />,
    <ResourceManagement data={data} key={idx} />,
    <Preparation data={data} key={idx} />,
    <Execution data={data} key={idx} />,
    <Reporting data={data} key={idx} />,
    <FollowUp data={data} key={idx} />,
  ];
  return <>{arr[idx]}</>;
};

const Phases = () => {
  const { data: fetchedTemplatedata } = useFetchTemplateDataQuery();
  const [saveStepperdata, { isLoading: saveStepperLoading }] = useSaveStepperdataMutation();

  const router = useRouter();
  const [fetchUserSelectedPhases, { isLoading }] = useFetchUserSelectedPhasesMutation();
  const [fetchedPhaseData, setFetchedPhaseData] = useState<Phase[]>([]);
  const [transitionIn, setTransitionIn] = useState(true);
  const [active, setActive] = useState(0);

  const templateID = useAppSelector((state) => state.templateId.templateId);

  const nextStep = () => {
    setActive((current) => (current < fetchedPhaseData.length ? current + 1 : current));
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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

  const { classes } = createStyles((theme) => {
    return {
      stepContainer: {
        border: `1px dashed ${theme.colors.gray[4]}`,
        padding: theme.other.spacing.s20,
        borderRadius: theme.other.spacing.s16,
        minHeight: "500px",
      },
      step: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },
      stepWrapper: {
        width: theme.other.spacing.s48,
        height: theme.other.spacing.s48,
      },
      stepIcon: {
        padding: theme.other.spacing.s12,
      },

      separator: {
        width: "168.5px",
        height: "4px",
        backgroundColor: theme.colors.sea[6],
      },

      stepLabel: {
        ...theme.other.typographyScales.bodyB3,
        color: theme.colors.black["8"],
      },
      stepDescription: {
        ...theme.other.typographyScales.labelL3,
        color: theme.colors.black["3"],
      },
      steps: {
        paddingLeft: theme.other.spacing.s40,
        paddingRight: theme.other.spacing.s40,
        paddingTop: theme.other.spacing.s20,
        paddingBottom: theme.other.spacing.s20,
      },
    };
  })();

  useEffect(() => {
    fetchPhases();
  }, [fetchPhases]);

  useEffect(() => {
    setTransitionIn(false);
    const timeoutId = setTimeout(() => {
      setTransitionIn(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [active]);

  interface FormValue {
    createAuditItem: {
      SCOPE: string;
      AUDIT_TITLE: string;
      AUDIT_TYPE: string;
      AUDITORS: string;
      AUDIT_OWNER: string;
      DEPARTMENT: string;
      RISK_ASSESSMENT: string;
      PLANNING_START_DATE: string;
      PLANNING_END_DATE: string;
      TEMPLATE_ID: number;
    };
    createAuditPlans: {
      TITLE: string;
      PLANNED_EFFORT: number;
      DESCRIPTION: string;
      TIME_PERIOD: Date;
      FINANCIAL_BUDGET: number;
      STATUS: string;
      TEMPLATE_ID: number;
    };
    createAudit: {
      TITLE: string;
      AUDIT_SCOPE: string;
      TIME_PERIOD: string;
      TYPE: string;
      GROUP: string;
      COUNTRY: string;
      OPERATING_UNITS: string;
      ESTIMATED_EFFORTS: number;
      ESTIMATED_COST: number;
      TAGS: string;
      TEMPLATE_ID: number;
    };
    backgroundInformation: {
      BACKGROUND_INFORMATION: string;
      ROOT_CAUSE_ANALYSIS: string;
      IMPACT_DESCRIPTION: string;
      TARGET_DATE: Date;
      AUDIT_PROGRAM: string;
      PROCESS_OWNER: string;
      AUDIT_STATUS: string;
      TEMPLATE_ID: number;
    };
    auditExecutionDetails: {
      PROCEDURE_CHECKLIST: string;
      FINDINGS: string;
      INTERVIEW_SUMMARIES: string;
      PROGRESS_NOTE: string;
      EXECUTION_TITLE: string;
      EVIDENCE_ATTACHMENT: File;
      INTERVIEWS: string;
      TEMPLATE_ID: number;
    };
    auditReportingDetails: {
      DATA_REPORT: string;
      RECOMMENDATION: string;
      MANAGEMENT_RESPONSE: string;
      REVIEWER_NOTE: string;
      ROOT_CAUSE: string;
      IMPACT_IN_REPORTING: string;
      ATTACH_FINAL_REPORT: File;
      TEMPLATE_ID: number;
    };
    auditReport: {
      DETAIL_OBSERVATION: string;
      ROOT_CAUSE: string;
      TEMPLATE_ID: number;
    };
  }

  const methods = useForm<FormValue>({
    mode: "all",
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (formData: FormValue) => {
    for (let key in formData) {
      // formData[key]["TEMPLATE_ID"] = templateID;
    }

    console.log("formData", formData);

    try {
      const outputData: any = {
        ...formData,
      };

      if (formData?.auditExecutionDetails?.EVIDENCE_ATTACHMENT) {
        outputData.auditExecutionDetails = {
          ...formData?.auditReportingDetails,
          image64: await readFileAsDataURL(formData?.auditExecutionDetails?.EVIDENCE_ATTACHMENT),
          EVIDENCE_ATTACHMENT: formData.auditExecutionDetails.EVIDENCE_ATTACHMENT.name,
        };
      }
      if (formData?.auditReportingDetails?.ATTACH_FINAL_REPORT) {
        outputData.auditReportingDetails = {
          ...formData?.auditReportingDetails,
          image64: await readFileAsDataURL(formData?.auditReportingDetails?.ATTACH_FINAL_REPORT),
          ATTACH_FINAL_REPORT: formData?.auditReportingDetails?.ATTACH_FINAL_REPORT?.name,
        };
      }

      const response = { items: outputData };

      const res = await saveStepperdata(response).unwrap();

      toast.success(res.message, {
        autoClose: 1000,
      });

      console.log("output", response);
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 1000,
      });
      console.log(error.message);
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      {fetchedTemplatedata?.data?.data?.[0]?.ID ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Paper pt={0} pr={"s40"} pl={"s40"} pb={"s20"}>
              <Paper pt={"s40"} pb={"s20"}>
                <PageTitle title='Audit Workflow' description='All templates and setups can be done in this page' />
              </Paper>
              <Stepper
                active={active}
                size='lg'
                color='sea.9'
                onStepClick={setActive}
                breakpoint='sm'
                classNames={{
                  steps: classes.steps,
                  stepLabel: classes.stepLabel,
                  stepDescription: classes.stepDescription,
                }}
              >
                {fetchedPhaseData.map((el, i) => {
                  return (
                    <Stepper.Step label={el.NAME} description={el.PLACE_HOLDER} key={i}>
                      <Transition mounted={transitionIn} transition='fade' duration={300} timingFunction='ease-in-out'>
                        {(styles) => (
                          <Paper className={classes.stepContainer} style={styles}>
                            <RenderPhaseChild item={el} />
                          </Paper>
                        )}
                      </Transition>
                    </Stepper.Step>
                  );
                })}
                {/* <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed> */}
              </Stepper>

              <Group position='center' mt='xl'>
                <MantineBtn  onClick={prevStep}>
                  Back
                </MantineBtn>
                {fetchedPhaseData.length === active + 1 ? (
                  <MantineBtn type='submit' isLoading={saveStepperLoading}>
                    Submit
                  </MantineBtn>
                ) : (
                  <MantineBtn onClick={nextStep}>Next step</MantineBtn>
                )}
              </Group>
            </Paper>
          </form>
        </FormProvider>
      ) : (
        <Flex justify={"center"} align={"center"} gap={"lg"} direction={"column"}>
          <Text fw={500} fz={"lg"}>
            No template created yet
          </Text>
          <MantineBtn
            onClick={() => {
              router.push("/irm-erm-template");
            }}
          >
            Create Template
          </MantineBtn>
        </Flex>
      )}
    </>
  );
};

export default Phases;
