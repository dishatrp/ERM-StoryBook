import { useFetchTemplateDataQuery } from "@/store/api/ermNewApiSlice";
import {
  createStyles,
  Header,
  Group,
  rem,
  Image,
  Menu,
  Text,
  Avatar,
  useMantineTheme,
  UnstyledButton,
  Flex,
} from "@mantine/core";
import cx from "clsx";
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconLanguage,
  IconWindowMinimize,
  IconWindowMaximize,
} from "@tabler/icons-react";
import irmlogo from "/public/assets/logo/irmlogo.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/loginSlice";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/store";

/* CSS for TopNav. It uses createStyles from mantine and take theme as an argument. */

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    borderBottom: `0.5px solid ${theme.colors.gray[4]}`,
    width: "100%",
    backgroundColor: theme.colors.gray[0],
  },
  logoText: {
    ["@media (max-width:550px)"]: { display: "none" },
  },
  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? "#f8f9fa" : "#f8f9fa",
  },

  user: {
    color: theme.colors.dark[5],
    paddingRight: theme.spacing.md,
    borderRadius: theme.radius.md,
    transition: "backgroundColor 100ms ease",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.colors.blue[5] : theme.colors.blue[6],
    },
  },
}));

export default function TopNav({
  setShow,
  show,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem("userName")) {
        const polices = JSON.parse(localStorage.getItem("userName") || "");
        setUserName(polices);
      }
    } catch (error) {
      console.log("JSON>OOOOO", error);
    }
  }, []);

  const user = {
    name: userName,
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    try {
      localStorage.clear();
      localStorage.removeItem("authToken")
    } catch (error) {
      console.log(error);
    }
    router.push("/login");
  };

  return (
    <>
      <Header height={60} className={classes.header} zIndex={99}>
        <Flex
          pl={"s12"}
          pr={"s12"}
          pt={0}
          pb={0}
          justify={"space-between"}
          align={"center"}
          h={60}
          // bg={"red"}
          gap={"s24"}
          w={"253px"}
          sx={(theme) => {
            return {
              borderBottom: `0.5px solid ${theme.colors.gray[4]}`,
              borderRight: `0.5px solid ${theme.colors.gray[4]}`,
            };
          }}
        >
          <Flex justify={"space-between"} align={"center"} p={0} gap={10}>
            <Image
              style={{
                width: "60px",
                height: "60px",
              }}
              src={irmlogo.src}
              alt='Random image'
            />
            <Text className='headingH2' pt={"s8"} color={theme.colors.black[7]}>
              ERM
            </Text>
          </Flex>

          {show ? (
            <IconWindowMinimize
              onClick={() => setShow(false)}
              color={theme.colors.gray[4]}
              style={{
                height: "24px",
                width: "24px",
                cursor: "pointer",
              }}
            />
          ) : (
            <IconWindowMaximize
              onClick={() => setShow(true)}
              color={theme.colors.black[2]}
              style={{
                height: "24px",
                width: "24px",
                cursor: "pointer",
              }}
            />
          )}
        </Flex>

        <Menu
          withArrow
          arrowPosition='center'
          zIndex={1000000}
          width={260}
          position='bottom-end'
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group>
                <Avatar
                  // src={user.image}
                  // alt={user.name}
                  radius='xl'
                  size={30}
                />
                <Text fw={500} size='sm' lh={1}>
                  {user.name}
                </Text>
                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconLanguage style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} stroke={2} />}
            >
              <Text fw={500} size='sm'>
                Change Language
              </Text>
            </Menu.Item>
            <Menu.Item
              icon={
                <IconSettings style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[6]} stroke={2} />
              }
            >
              <Text fw={500} size='sm'>
                Change Client
              </Text>
            </Menu.Item>
            <Menu.Item
              icon={<IconLogout style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} stroke={2} />}
              onClick={handleLogout}
            >
              <Text fw={500} size='sm'>
                Logout
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Header>
    </>
  );
}
