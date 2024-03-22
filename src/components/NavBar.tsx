import { theme } from "@/styles/globals";
import { Collapse, Container, Image, Text, createStyles, useMantineTheme } from "@mantine/core";
import { Flex, Paper } from "@mantine/core";
import React, { Fragment, useEffect, useState } from "react";
import irmlogo from "/public/assets/logo/irmlogo.png";
import {
  IconArrowNarrowLeft,
  IconCalendarEvent,
  IconChevronDown,
  IconCircleFilled,
  IconWindowMinimize,
} from "@tabler/icons-react";
import MantineTransition from "./transition/MantineTransition";
import { useRouter } from "next/router";
import { Page } from "@/store/interface/LoginInterface";

interface BackBtn {
  reset: () => void;
}
interface NavBalls {
  opened: boolean;
  setNavs: (param: boolean) => void;
}
interface ChildNav {
  item: any[];
  setCatName: (param: string) => any;
  catName: string;
  setSubNavs: (param: any) => void;
  subNavs: any;
}
const INITIAL = {
  opened: false,
  navs: undefined,
  subNavs: undefined,
  catName: "",
};

const NavBalls = ({ setNavs, opened }: NavBalls) => {
  const theme = useMantineTheme();
  return (
    <Flex justify={"center"} align={"center"} gap={"s6"} mb={"s24"}>
      <IconCircleFilled
        // onClick={() => {
        //   setNavs(false);
        // }}
        size={!opened ? 11 : 10}
        style={{
          transition: "all 0.3s",
          color: !opened ? theme.colors.waterfall[7] : theme.colors.gray[5],
          cursor: "pointer",
        }}
      />
      <IconCircleFilled
        // onClick={() => {
        //   setNavs(true);
        // }}
        size={opened ? 11 : 10}
        style={{
          transition: "all 0.3s",
          color: opened ? theme.colors.waterfall[7] : theme.colors.gray[5],
          cursor: "pointer",
        }}
      />
    </Flex>
  );
};

const BackBtn = ({ reset }: BackBtn) => {
  const theme = useMantineTheme();
  const useStyles = createStyles((theme) => {
    return {
      backBtnHover: {
        transition: "all 0.3s",
        ":hover": {
          color: theme.colors.black[3],
        },
      },
    };
  });

  const { classes } = useStyles();

  return (
    <Flex
      align={"center"}
      gap={"s6"}
      onClick={reset}
      sx={(theme) => {
        return {
          cursor: "pointer",
          borderRadius: theme.spacing["s6"],
        };
      }}
    >
      <IconArrowNarrowLeft color={theme.colors.black[2]} size={20} className={classes.backBtnHover} />
      <Text
        className={`labelL1 ${classes.backBtnHover}`}
        sx={(theme) => {
          return {
            color: theme.colors.black[2],
          };
        }}
      >
        Back
      </Text>
    </Flex>
  );
};

const ChildNav = ({ item, setCatName, catName, subNavs, setSubNavs }: ChildNav) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <>
      {item?.map((childNav: any, idx) => {
        return (
          <Fragment key={idx}>
            <Flex
              onClick={() => {
                if (!childNav.children) return router.push("/" + childNav.pageMst_SLUG);
                setCatName(childNav?.pageMst_ITEM);
                setSubNavs(childNav?.children);
              }}
              justify={"space-between"}
              align={"center"}
              pl={"s16"}
              pr={"s8"}
              pt={"s6"}
              pb={"s6"}
              sx={(theme) => {
                return {
                  cursor: "pointer",
                  transition: "all 0.3s",
                  backgroundColor: childNav?.pageMst_ITEM === catName ? theme.colors.waterfall[1] : "",
                  borderRadius: theme.spacing["s6"],
                  ":hover": {
                    backgroundColor: childNav?.pageMst_ITEM !== catName ? theme.colors.waterfall[0] : "",
                  },
                };
              }}
            >
              <Text
                className='labelL1'
                sx={(theme) => {
                  return {
                    color: theme.colors.black[4],
                  };
                }}
              >
                {childNav?.pageMst_ITEM}
              </Text>
              {childNav.children && (
                <IconChevronDown
                  size={18}
                  style={{
                    transform: childNav?.pageMst_ITEM !== catName ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "all 0.3s ease-out",
                    stroke: theme.colors.black[1],
                  }}
                />
              )}
            </Flex>
            <Collapse transitionDuration={500} in={childNav?.pageMst_ITEM === catName}>
              {subNavs?.map((childNav: any, idx: number) => {
                return (
                  <Fragment key={idx}>
                    <Flex
                      onClick={() => {
                        router.push("/" + childNav.pageMst_SLUG);
                      }}
                      justify={"space-between"}
                      align={"center"}
                      pl={"s48"}
                      pr={"s48"}
                      pt={"s6"}
                      pb={"s6"}
                      sx={(theme) => {
                        return {
                          cursor: "pointer",
                          transition: "all 0.3s",
                          borderRadius: theme.spacing["s6"],
                          ":hover": {
                            backgroundColor: theme.colors.waterfall[0],
                          },
                        };
                      }}
                    >
                      <Text
                        className='labelL1'
                        sx={(theme) => {
                          return {
                            color: theme.colors.black[2],
                          };
                        }}
                      >
                        {childNav?.pageMst_ITEM}
                      </Text>
                    </Flex>
                  </Fragment>
                );
              })}
            </Collapse>
          </Fragment>
        );
      })}
    </>
  );
};

const NavBar = ({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [polices, setPolices] = useState<any>([]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem("polices")) {
        const parsedpolicy = JSON.parse(localStorage.getItem("polices") || "");
        console.log(parsedpolicy, "plocies");
        const modifiedPolicies = parsedpolicy?.map((item: { pageMst_ITEM: string; children: any }, idx: any) => {
          if (item.pageMst_ITEM === "ERM") {
            const extractAuditWorkflow: Page[] = item.children.filter(
              (el: any) => el.pageMst_ITEM === "Audit Workflow"
            );
            const restPages: Page[] = item.children.filter((el: any) => el.pageMst_ITEM !== "Audit Workflow");

            return {
              ...item,
              children: [
                {
                  pageMst_ITEM: "Audit Dashboard",
                  pageMst_SLUG: "/irm-erm-audit-dashboard",
                },
                {
                  // pageMst_ITEM: "Audit Workflow",
                  // pageMst_SLUG: "/not-set",
                  ...extractAuditWorkflow[0],
                },
                {
                  pageMst_ITEM: "Configurations",
                  // children: item?.children ? [...item.children] : [],
                  children: item?.children ? [...restPages] : [],
                },
              ],
            };
          }

          return {
            ...item,
            children: [
              {
                pageMst_ITEM: `Default Category ${idx}`,
                children: item?.children ? [...item.children] : [],
              },
            ],
          };
        });

        setPolices(modifiedPolicies);
      }
    } catch (error) {
      console.log("JSON>OOOOO", error);
    }
  }, []);

  const theme = useMantineTheme();
  const [navs, setNavs] = useState<{
    opened: boolean;
    navs: any;
    subNavs: any;
    catName: string;
  }>(JSON.parse(JSON.stringify(INITIAL)));

  useEffect(() => {
    document.addEventListener("keydown", (e: any) => {
      if (e.key === "Backspace") {
        setNavs((prev) => {
          let update = JSON.parse(JSON.stringify(prev));
          update.opened = false;
          return update;
        });
      }
    });
  }, []);

  return (
    <Flex
      pt={"60px"}
      direction={"column"}
      h={"100vh"}
      w={"253px"}
      bg={theme.colors.gray[0]}
      pos={"sticky"}
      sx={(theme) => {
        return {
          borderRight: `0.5px solid ${theme.colors.gray[4]}`,
          top: 0,
        };
      }}
    >
      <Flex
        p={"s10"}
        sx={(theme) => {
          return {
            height: "100%",
          };
        }}
      >
        {/* <MantineTransition condition={!navs?.opened} userStyles={{ width: "100%" }}> */}
        {!navs?.opened && (
          <Flex pt={"s32"} pb={"s24"} pl={0} pr={0} h={"100%"} w={"100%"} direction={"column"}>
            {polices?.map((item: any, idx: number) => {
              return (
                <Fragment key={idx}>
                  <Flex
                    align={"center"}
                    pt={"s6"}
                    pb={"s6"}
                    pr={"s8"}
                    pl={"s16"}
                    gap={"s6"}
                    w={"100%"}
                    onClick={() => {
                      setNavs((prev) => {
                        let update = JSON.parse(JSON.stringify(prev));
                        update.opened = !update.opened;
                        update.navs = item?.children;
                        return update;
                      });
                    }}
                    sx={(theme) => {
                      return {
                        cursor: "pointer",
                        borderRadius: theme.spacing["s6"],
                        ":hover": {
                          backgroundColor: theme.colors.waterfall[0],
                        },
                      };
                    }}
                  >
                    <IconCalendarEvent color={theme.colors.black[4]} size={20} />
                    <Text
                      className='labelL1'
                      sx={(theme) => {
                        return {
                          color: theme.colors.black[4],
                        };
                      }}
                    >
                      {item.pageMst_ITEM}
                    </Text>
                  </Flex>
                </Fragment>
              );
            })}
          </Flex>
        )}
        {/* </MantineTransition> */}
        {/* <MantineTransition condition={navs?.opened} userStyles={{ width: "100%" }}> */}
        {navs?.opened && (
          <Flex pt={"s24"} pb={"s24"} pl={0} pr={0} h={"90%"} w={"100%"} direction={"column"} gap={"s24"}>
            <BackBtn
              reset={() => {
                setNavs((prev) => {
                  let update = JSON.parse(JSON.stringify(prev));
                  update.opened = false;
                  return update;
                });
                // setTimeout(() => {
                //   setNavs((prev) => {
                //     let update = JSON.parse(JSON.stringify(prev));
                //     update.catName = "";
                //     return update;
                //   });
                // }, 600);
              }}
            />
            <Flex direction={"column"}>
              <ChildNav
                item={navs?.navs}
                catName={navs?.catName}
                setCatName={(param: string) => {
                  setNavs((prev) => {
                    let update = JSON.parse(JSON.stringify(prev));
                    if (update.catName) update.catName = "";
                    else update.catName = param;
                    return update;
                  });
                }}
                subNavs={navs?.subNavs}
                setSubNavs={(param: any) => {
                  setNavs((prev: any) => {
                    let update = JSON.parse(JSON.stringify(prev));
                    update.subNavs = param;
                    return update;
                  });
                }}
              />
            </Flex>
          </Flex>
        )}
        {/* </MantineTransition> */}
      </Flex>
      <NavBalls
        setNavs={(param: boolean) => {
          setNavs((prev) => {
            let update = JSON.parse(JSON.stringify(prev));
            update.opened = param;
            return update;
          });
        }}
        opened={navs.opened}
      />
    </Flex>
  );
};

export default NavBar;
