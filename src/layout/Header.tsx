import { Box, Burger, Button, Group, Header, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import useStyles from "./headerStyle";
import irmlogo from "/public/assets/logo/irmlogo.png";

export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Box pb={120}>
      <Header height={60} px='md'>
        <Group position='apart' sx={{ height: "100%" }}>
          <Image src={irmlogo.src} alt='Random image' width={60} />
          <Group className={classes.hiddenMobile}>
            <Button variant='default' onClick={() => router.push("/login")}>
              Log in
            </Button>
            <Button>Sign up</Button>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>
    </Box>
  );
}
