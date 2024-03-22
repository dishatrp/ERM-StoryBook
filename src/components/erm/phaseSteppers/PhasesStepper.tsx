import { Flex, Group, Paper, Stepper, createStyles } from "@mantine/core";
import PageTitle from "../genericComponents/PageTitle";
import { useCallback, useEffect, useState } from "react";
import Assess from "./assess/Assess";
import Implement from "./implement/Implement";
import Monitor from "./monitor/Monitor";
import Report from "./report/Report";
import Review from "./review/Review";
import { Phase } from "@/store/interface/ErmNewInterface";
import Identify from "./identify/Identify";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/store";
import Loader from "@/components/Loader";
import { useFetchTemplateDataQuery, useFetchUserSelectedPhasesMutation } from "@/store/api/ermNewApiSlice";
import MantineBtn from "../genericComponents/mantineBtn/MantineBtn";
import { IconChevronLeft } from "@tabler/icons-react";
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

export const sortedPhases = ["Identify", "Assess", "Implement", "Monitor", "Report", "Review"];

const RenderPhaseChild = ({ item }: { item: Phase }) => {
  const idx = sortedPhases.indexOf(item.NAME);
  const data = item?.children || [];

  const arr = [
    <Identify key={idx} data={data} />,
    <Assess key={idx} />,
    <Implement key={idx} />,
    <Monitor key={idx} />,
    <Report key={idx} />,
    <Review key={idx} />,
  ];
  return <>{arr[idx]}</>;
};

const PhasesStepper = () => {
  const router = useRouter();
  const { data: fetchedTemplatedata } = useFetchTemplateDataQuery();
  const [fetchUserSelectedPhases, { isLoading }] = useFetchUserSelectedPhasesMutation();
  const [fetchedPhaseData, setFetchedPhaseData] = useState<Phase[]>([]);
  const [formArr, setformArr] = useState<Phase[]>([]);
  const [active, setActive] = useState(0);
  const templateID = useAppSelector((state) => state.templateId.templateId);
  // console.log("templateID", templateID)

  const nextStep = () => {
    setActive((current) => (current < formArr.length ? current + 1 : current));
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const arr = ["Implement", "Monitor"];

  const fetchPhases = useCallback(async () => {
    try {
      if (fetchedTemplatedata) {
        const response = await fetchUserSelectedPhases({
          templateId: +fetchedTemplatedata?.data?.data?.[0]?.ID,
        }).unwrap();
        console.log("TTTT", response);
        setFetchedPhaseData(response);
        setformArr(response);
        // console.log("response", response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [fetchUserSelectedPhases, fetchedTemplatedata]);

  useEffect(() => {
    fetchPhases();
  }, [fetchPhases, fetchUserSelectedPhases, fetchedTemplatedata]);

  useEffect(() => {
    console.log("parent");
  }, []);

  const { classes } = createStyles((theme) => {
    return {
      stepContainer: {
        border:
          formArr?.[active]?.NAME === sortedPhases[0] || formArr?.[active]?.NAME === sortedPhases[1]
            ? `1px dashed ${theme.colors.gray[4]}`
            : "",
        padding: theme.other.spacing.s8,
        borderRadius: theme.other.spacing.s16,
        minHeight: "500px",
        background: arr.includes(formArr?.[active]?.NAME) ? theme.colors.gray[1] : "none",
        // background: "red",
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

  return (
    <>
      <Loader visible={isLoading} />
      <Paper pt={0} pr={"s40"} pl={"s40"} pb={"s20"} bg={"none"}>
        <Flex pt={"s40"} pb={"s20"} gap={"s10"} justify={"space-between"} align={"center"}>
          <Paper bg={"none"}>
            <PageTitle title='Audit Workflow' description='All templates and setups can be done in this page' />
          </Paper>
          <Flex align={"center"} justify={"flex-end"} gap={"s10"}>
            <MantineBtn variant='secondary' size='md' onlyIcon={true} onClick={prevStep}>
              <IconChevronLeft />
            </MantineBtn>
            <MantineBtn variant='primary' size='md' onClick={nextStep}>
              Next
            </MantineBtn>
          </Flex>
        </Flex>
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
          {formArr?.map((el, i) => {
            return (
              <Stepper.Step label={el.NAME} description={el.PLACE_HOLDER} key={i}>
                <Paper className={classes.stepContainer}>
                  <RenderPhaseChild item={el} />
                </Paper>
              </Stepper.Step>
            );
          })}
          {/* <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed> */}
        </Stepper>

        {/* <Group position='center' mt='xl'>
          <MantineBtn variant='secondary' onClick={prevStep}>
            Back
          </MantineBtn>
          {formArr?.length === active + 1 ? (
            <MantineBtn type='submit' isLoading={false}>
              Submit
            </MantineBtn>
          ) : (
            <MantineBtn onClick={nextStep}>Next step</MantineBtn>
          )}
        </Group> */}
      </Paper>
    </>
  );
};

export default PhasesStepper;
