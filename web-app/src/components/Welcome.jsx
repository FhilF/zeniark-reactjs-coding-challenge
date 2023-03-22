import { Box, Image, Paper, Stack, Text } from "@mantine/core";
import React from "react";
import ZeniarkLogo from "../images/zeniark-logo.png";

function Welcome(props) {
  const { numberOfQuestions, getQuestion } = props;
  return (
    <Paper p="xl" className="content-paper" radius="md">
      <Box py={50}>
        <Stack spacing={36} align="center">
          <Box>
            <Image
              src={ZeniarkLogo}
              mt="xl"
              sx={{
                ".mantine-Image-image": {
                  height: "80px !important",
                  width: "auto !important",
                },
              }}
            />
          </Box>
          <Stack spacing="xs">
            <Text ta="center" size={35} weight={700}>
              Welcome to the Trivia Challenge!
            </Text>
            <Text ta="center" size={22} weight={500}>
              {`You will be presented with ${numberOfQuestions} True or False questions.`}
            </Text>
          </Stack>
          <Paper
            sx={(theme) => ({
              background: theme.colors.primary,
              color: "white",
            })}
            py={6}
            px={50}
            radius="lg"
          >
            <Text ta="center" size={35} weight={600}>
              {`Can you score ${numberOfQuestions}/${numberOfQuestions}?`}
            </Text>
          </Paper>
          <Box sx={{ cursor: "pointer" }} onClick={()=>{getQuestion()}}>
            <Text size={35} weight={700} color="primary.0">
              LET’S START!
            </Text>
            <Box
              sx={(theme) => ({
                background: theme.colors.primary[0],
                height: "4px",
              })}
            ></Box>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Welcome;
