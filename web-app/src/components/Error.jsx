import { Box, Flex, Paper, Text } from "@mantine/core";
import React from "react";

function Error() {
  return (
    <Paper p="xl" className="content-paper" radius="md">
      <Box py={50}>
        <Flex>
          <Text ta="center" size={30} weight={700}>
            There's an error with the server please try again later.
          </Text>
        </Flex>
      </Box>
    </Paper>
  );
}

export default Error;
