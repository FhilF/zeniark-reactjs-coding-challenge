import { Box, Flex, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import React from "react";
import ZeniarkLogo from "../images/logo.png";
import { decodeEntities } from "../utils/scripts";

function Results(props) {
  const { results, reset, isRequesting } = props;
  return (
    <Paper p="xl" className="content-paper" radius="md">
      <Box>
        <Stack spacing="sm">
          <Box sx={{ position: "relative", height: "70px" }}>
            <Box sx={{ position: "absolute" }}>
              <Image src={ZeniarkLogo} width={60} />
            </Box>
            <Flex sx={{ height: "100%" }} justify="center" align="center">
              <Text size={30} weight={600} ta="center">
                Final Results
              </Text>
            </Flex>
          </Box>
          <Box px="sm">
            <Box className="paper-main">
              <Box>
                <Flex
                  py="xl"
                  justify="center"
                  align="center"
                  sx={{
                    flexDirection: "column",
                    borderBottom: "1px solid #e5e5e5",
                  }}
                >
                  {results && (
                    <Text
                      size={50}
                      weight={700}
                    >{`${results.points}/${results.numberOfQuestions}`}</Text>
                  )}
                  <Text size={20} weight={600}>
                    Your Score
                  </Text>
                </Flex>
                <Stack my="xl">
                  {results &&
                    results.questions.map((v, i) => {
                      return (
                        <Box key={v.id}>
                          <Flex>
                            <Text color="gray.6" weight={600}>
                              {i + 1}.
                            </Text>
                            <Stack ml="lg" spacing={4} sx={{ flex: 1 }}>
                              <Text weight={600} color="dark.4">
                                {decodeEntities(v.question)}
                              </Text>
                              <Group>
                                <Group spacing={4}>
                                  <Text size="sm" color="gray.6">
                                    The correct answer is
                                  </Text>
                                  <Group spacing={0}>
                                    <Text
                                      size="sm"
                                      color={
                                        v.correct_answer === "True"
                                          ? "green.9"
                                          : "red.5"
                                      }
                                      weight={700}
                                    >
                                      {v.correct_answer}
                                    </Text>
                                    <Text size="sm" color="gray.6">
                                      .
                                    </Text>
                                  </Group>
                                </Group>
                                <Group spacing={4}>
                                  <Text size="sm" color="gray.6">
                                    You answered
                                  </Text>
                                  <Group spacing={0}>
                                    <Text
                                      size="sm"
                                      color={
                                        v.user_answer === "True"
                                          ? "green.9"
                                          : "red.5"
                                      }
                                      weight={500}
                                    >
                                      {v.user_answer}
                                    </Text>
                                    <Text size="sm" color="gray.6">
                                      .
                                    </Text>
                                  </Group>
                                </Group>
                              </Group>
                            </Stack>
                            <Box>
                              <Flex
                                sx={(theme) => ({
                                  height: "100%",
                                  width: "40px",
                                  ".icon-check": {
                                    width: "32px",
                                    height: "36px",
                                    color: theme.colors.green[9],
                                  },
                                  ".icon-x": {
                                    width: "32px",
                                    height: "36px",
                                    color: theme.colors.red[5],
                                  },
                                })}
                                justify="center"
                                align="center"
                              >
                                {v.correct_answer === v.user_answer ? (
                                  <IconCheck className="icon-check" />
                                ) : (
                                  <IconX className="icon-x" />
                                )}
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      );
                    })}
                </Stack>
              </Box>
            </Box>
            <Flex py={40} align="center" justify="center">
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  !isRequesting && reset();
                }}
              >
                <Text size={32} weight={700} color="primary.0">
                  Play Again
                </Text>
                <Box
                  sx={(theme) => ({
                    background: theme.colors.primary[0],
                    height: "4px",
                  })}
                ></Box>
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Results;
