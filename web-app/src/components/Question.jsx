import { Box, Button, Group, Image, Paper, Stack, Text } from "@mantine/core";
import React from "react";
import ZeniarkLogo from "../images/logo.png";
import { decodeEntities } from "../utils/scripts";
import { IconCheck, IconX } from "@tabler/icons";

function Question(props) {
  const {
    question,
    numberOfQuestions,
    isRequesting,
    questionIndex,
    answerQuestion,
  } = props;
  return (
    <Paper p="xl" className="content-paper" radius="md">
      <Box>
        <Stack spacing="sm">
          <Group position="apart">
            <Group>
              <Image src={ZeniarkLogo} width={60} />
              <Text
                size={22}
                weight={700}
              >{`Category: ${question.category}`}</Text>
            </Group>
            <Text size="lg" weight={600}>{`${
              questionIndex + 1
            }/${numberOfQuestions}`}</Text>
          </Group>
          <Box px="sm">
            <Box className="paper-main">
              <Text ta="center" size={36} weight={500}>
                <>{decodeEntities(question.question)}</>
              </Text>
            </Box>
          </Box>
          <Box py="md">
            {question.type === "boolean" && (
              <Group position="center">
                <Button
                  size="xl"
                  py="sm"
                  leftIcon={<IconCheck />}
                  color="green"
                  disabled={isRequesting}
                  onClick={() => {answerQuestion(question.id, "True")}}
                >
                  True
                </Button>
                <Button
                  size="xl"
                  py="sm"
                  leftIcon={<IconX />}
                  color="red"
                  disabled={isRequesting}
                  onClick={() => answerQuestion(question.id, "False")}
                >
                  False
                </Button>
              </Group>
            )}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Question;
